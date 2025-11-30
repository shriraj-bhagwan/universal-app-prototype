import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { copy, LanguageCode } from '@/config/copy';

// Cache audio URLs per key to avoid repeated network calls
const audioCache: Record<string, string> = {};

interface AudioPlayerProps {
  audioKey: string;
  autoPlay?: boolean;
  onPlay?: () => void;
  onEnded?: () => void;
}

const AudioPlayer = ({ audioKey, autoPlay = false, onPlay, onEnded }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { userName, selectedLanguage, audioPermissionGranted } = useUser();
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [needsInteraction, setNeedsInteraction] = useState(false);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const language = (selectedLanguage as LanguageCode) ?? 'english';
        const text = copy.audio.scripts(audioKey as any, language, userName);
        if (!text) {
          console.warn(`No script configured for audioKey "${audioKey}"`);
          return;
        }

        if (audioCache[audioKey]) {
          setAudioUrl(audioCache[audioKey]);
          return;
        }

        const preRecorded = (copy.audio.preRecorded as any)?.[audioKey]?.[language];
        if (preRecorded) {
          const bytes = Uint8Array.from(atob(preRecorded), (c) => c.charCodeAt(0));
          const url = URL.createObjectURL(new Blob([bytes], { type: 'audio/wav' }));
          audioCache[audioKey] = url;
          setAudioUrl(url);
          return;
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
          console.error('Error fetching audio:', error);
          return;
        }

        if (data?.audioContent) {
          // Convert base64 audio to blob URL and cache it
          const audioBlob = new Blob([Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))], { type: 'audio/mp3' });
          const url = URL.createObjectURL(audioBlob);
          audioCache[audioKey] = url;
          setAudioUrl(url);
        }
      } catch (err) {
        console.error('Error in fetchAudio:', err);
      }
    };

    if (audioKey && selectedLanguage && userName) {
      fetchAudio();
    }
  }, [audioKey, selectedLanguage, userName, autoPlay]);

  // Attempt to play whenever we have a URL and either autoplay is on with permission or user interaction is required
  useEffect(() => {
    const tryPlay = () => {
      if (!audioRef.current || !audioUrl) return;
      audioRef.current.play().then(() => setNeedsInteraction(false)).catch((err) => {
        console.error('Audio playback failed:', err);
        setNeedsInteraction(true);
      });
    };

    if (autoPlay && audioUrl) {
      // Only attempt autoplay if the user explicitly granted permission via the WhatsApp button
      if (audioPermissionGranted) {
        tryPlay();
      } else {
        setNeedsInteraction(true);
      }
    }
  }, [audioUrl, autoPlay, audioPermissionGranted]);

  useEffect(() => {
    if (!needsInteraction) return;

    const handleUserGesture = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setNeedsInteraction(false))
          .catch((err) => console.error('Audio playback still blocked:', err));
      }
    };

    document.addEventListener('pointerdown', handleUserGesture, { once: true });
    document.addEventListener('keydown', handleUserGesture, { once: true });

    return () => {
      document.removeEventListener('pointerdown', handleUserGesture);
      document.removeEventListener('keydown', handleUserGesture);
    };
  }, [needsInteraction]);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const handlePlayEvent = () => onPlay?.();
    const handleEndedEvent = () => onEnded?.();

    audioEl.addEventListener('play', handlePlayEvent);
    audioEl.addEventListener('ended', handleEndedEvent);

    return () => {
      audioEl.removeEventListener('play', handlePlayEvent);
      audioEl.removeEventListener('ended', handleEndedEvent);
    };
  }, [onPlay, onEnded, audioUrl]);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        className="hidden"
        controls={false}
      />
      {needsInteraction && (
        <button
          type="button"
          onClick={() => audioRef.current?.play().then(() => setNeedsInteraction(false)).catch((err) => console.error('Audio playback failed on click:', err))}
          className="fixed bottom-4 right-4 z-50 rounded-full bg-primary text-primary-foreground px-4 py-2 shadow-lg"
        >
          Tap to play audio
        </button>
      )}
    </>
  );
};

export default AudioPlayer;
