import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { copy, LanguageCode } from '@/config/copy';

// Cache audio buffers per key to avoid repeated network calls
const audioBufferCache: Record<string, AudioBuffer> = {};

interface AudioPlayerProps {
  audioKey: string;
  autoPlay?: boolean;
  onPlay?: () => void;
  onEnded?: () => void;
  onAudioElementReady?: (audioElement: HTMLAudioElement) => void;
}

const AudioPlayer = ({ audioKey, autoPlay = false, onPlay, onEnded, onAudioElementReady }: AudioPlayerProps) => {
  const { userName, selectedLanguage, audioContextUnlocked, globalAudioContext } = useUser();
  const [needsInteraction, setNeedsInteraction] = useState(false);
  const audioSourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const fallbackAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchAndPlayAudio = async () => {
      console.log(`🎵 [AudioPlayer:${audioKey}] fetchAndPlayAudio called`, {
        audioKey,
        autoPlay,
        globalAudioContext: !!globalAudioContext,
        audioContextUnlocked,
        selectedLanguage,
        userName,
      });

      try {
        const language = (selectedLanguage as LanguageCode) ?? 'english';

        // If we have an unlocked AudioContext, use Web Audio API
        if (globalAudioContext && audioContextUnlocked && autoPlay) {
          console.log(`✅ [AudioPlayer:${audioKey}] Using Web Audio API (unlocked context exists)`);
          await playViaWebAudioAPI(language);
        } else if (autoPlay) {
          // Fallback to HTML audio element (will need user interaction)
          console.log(`⚠️ [AudioPlayer:${audioKey}] Falling back to HTML audio`, {
            reason: !globalAudioContext ? 'No globalAudioContext' : !audioContextUnlocked ? 'Context not unlocked' : 'Other',
          });
          await playViaHTMLAudio(language);
        } else {
          console.log(`⏸️ [AudioPlayer:${audioKey}] AutoPlay is false, not playing`);
        }
      } catch (err) {
        console.error(`❌ [AudioPlayer:${audioKey}] Error in fetchAndPlayAudio:`, err);
      }
    };

    if (audioKey && selectedLanguage && userName) {
      fetchAndPlayAudio();
    } else {
      console.log(`⏭️ [AudioPlayer:${audioKey}] Skipping - missing required data`, {
        hasAudioKey: !!audioKey,
        hasLanguage: !!selectedLanguage,
        hasUserName: !!userName,
      });
    }

    return () => {
      // Cleanup: stop any playing audio source
      if (audioSourceNodeRef.current) {
        try {
          audioSourceNodeRef.current.stop();
        } catch (e) {
          // Already stopped
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioKey, selectedLanguage, userName, autoPlay, globalAudioContext, audioContextUnlocked]);

  const playViaWebAudioAPI = async (language: LanguageCode) => {
    if (!globalAudioContext) return;

    try {
      // Check cache first
      let audioBuffer = audioBufferCache[audioKey];

      if (!audioBuffer) {
        // Fetch audio data
        const audioData = await fetchAudioData(language);
        if (!audioData) return;

        // Decode audio data into AudioBuffer
        audioBuffer = await globalAudioContext.decodeAudioData(audioData);
        audioBufferCache[audioKey] = audioBuffer;
      }

      // Create a buffer source
      const source = globalAudioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(globalAudioContext.destination);

      // Handle ended event
      source.onended = () => {
        console.log('Audio ended via Web Audio API');
        onEnded?.();
        audioSourceNodeRef.current = null;
      };

      // Start playing
      source.start(0);
      audioSourceNodeRef.current = source;
      onPlay?.();
      console.log('Audio playing via Web Audio API');
    } catch (error) {
      console.error('Error playing via Web Audio API:', error);
      // Fallback to HTML audio
      await playViaHTMLAudio(language);
    }
  };

  const playViaHTMLAudio = async (language: LanguageCode) => {
    try {
      const audioUrl = await fetchAudioURL(language);
      if (!audioUrl || !fallbackAudioRef.current) return;

      fallbackAudioRef.current.src = audioUrl;

      // Notify parent that audio element is ready
      onAudioElementReady?.(fallbackAudioRef.current);

      await fallbackAudioRef.current.play();
      setNeedsInteraction(false);
      console.log('Audio playing via HTML audio element');
    } catch (err) {
      console.error('HTML audio playback failed:', err);
      setNeedsInteraction(true);
    }
  };

  const fetchAudioData = async (language: LanguageCode): Promise<ArrayBuffer | null> => {
    try {
      // Check for local MP3 files in public folder first
      const languageCode = language === 'english' ? 'en' : language === 'hindi' ? 'hn' : language === 'malayalam' ? 'ml' : 'ta';
      const languageSpecificPath = `/${audioKey}_${languageCode}.mp3`;
      const fallbackPath = `/${audioKey}.mp3`;

      try {
        // First try language-specific file
        const langResponse = await fetch(languageSpecificPath);
        if (langResponse.ok) {
          return await langResponse.arrayBuffer();
        }

        // Then try fallback (English) file
        const fallbackResponse = await fetch(fallbackPath);
        if (fallbackResponse.ok) {
          return await fallbackResponse.arrayBuffer();
        }
      } catch (err) {
        // Local file doesn't exist, continue to other methods
      }

      const text = copy.audio.scripts(audioKey as any, language, userName);
      if (!text) {
        console.warn(`No script configured for audioKey "${audioKey}"`);
        return null;
      }

      const preRecorded = (copy.audio.preRecorded as any)?.[audioKey]?.[language];
      if (preRecorded) {
        const bytes = Uint8Array.from(atob(preRecorded), (c) => c.charCodeAt(0));
        return bytes.buffer;
      }

      const voiceByLanguage: Record<string, string> = {
        // Studio-quality English (USA) voice; fallback for all
        english: 'en-US-Studio-O',
      };

      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: {
          text,
          voice: voiceByLanguage[selectedLanguage] ?? voiceByLanguage.english,
        },
      });

      if (error) {
        console.error('Error fetching audio from TTS:', error);
        return null;
      }

      if (data?.audioContent) {
        const bytes = Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0));
        return bytes.buffer;
      }

      return null;
    } catch (err) {
      console.error('Error in fetchAudioData:', err);
      return null;
    }
  };

  const fetchAudioURL = async (language: LanguageCode): Promise<string | null> => {
    const arrayBuffer = await fetchAudioData(language);
    if (!arrayBuffer) return null;

    const blob = new Blob([arrayBuffer], { type: 'audio/mp3' });
    return URL.createObjectURL(blob);
  };

  useEffect(() => {
    if (!needsInteraction) return;

    const handleUserGesture = () => {
      if (fallbackAudioRef.current) {
        fallbackAudioRef.current
          .play()
          .then(() => setNeedsInteraction(false))
          .catch((err) => console.error('Audio playback still blocked:', err));
      }
    };

    // Listen for any user interaction to start audio
    document.addEventListener('pointerdown', handleUserGesture, { once: true });
    document.addEventListener('touchstart', handleUserGesture, { once: true });
    document.addEventListener('keydown', handleUserGesture, { once: true });
    document.addEventListener('click', handleUserGesture, { once: true });

    return () => {
      document.removeEventListener('pointerdown', handleUserGesture);
      document.removeEventListener('touchstart', handleUserGesture);
      document.removeEventListener('keydown', handleUserGesture);
      document.removeEventListener('click', handleUserGesture);
    };
  }, [needsInteraction]);

  // Handle play and ended events for fallback HTML audio
  useEffect(() => {
    const audioEl = fallbackAudioRef.current;
    if (!audioEl) return;

    const handlePlayEvent = () => onPlay?.();
    const handleEndedEvent = () => onEnded?.();

    audioEl.addEventListener('play', handlePlayEvent);
    audioEl.addEventListener('ended', handleEndedEvent);

    return () => {
      audioEl.removeEventListener('play', handlePlayEvent);
      audioEl.removeEventListener('ended', handleEndedEvent);
    };
  }, [onPlay, onEnded]);

  return (
    <audio
      ref={fallbackAudioRef}
      className="hidden"
      controls={false}
    />
  );
};

export default AudioPlayer;
