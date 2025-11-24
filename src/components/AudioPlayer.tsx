import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { supabase } from '@/integrations/supabase/client';

interface AudioPlayerProps {
  audioKey: string;
  autoPlay?: boolean;
}

const AudioPlayer = ({ audioKey, autoPlay = false }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { userName, selectedLanguage } = useUser();
  const [audioUrl, setAudioUrl] = useState<string>('');

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        // Create greeting message based on audioKey
        let text = '';
        if (audioKey === 'greeting') {
          text = `Hi ${userName}. This quick step helps you know your policy better. Its benefits, terms, and what's important. It'll only take two minutes.`;
        }

        const { data, error } = await supabase.functions.invoke('gcp-audio', {
          body: {
            text,
            voice: selectedLanguage === 'english' ? 'en-IN-Neural2-A' : 
                   selectedLanguage === 'hindi' ? 'hi-IN-Neural2-A' :
                   selectedLanguage === 'malayalam' ? 'ml-IN-Standard-A' :
                   'ta-IN-Standard-A',
          },
        });

        if (error) {
          console.error('Error fetching audio:', error);
          return;
        }

        if (data?.audioContent) {
          // Convert base64 audio to blob URL
          const audioBlob = new Blob(
            [Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))],
            { type: 'audio/mp3' }
          );
          const url = URL.createObjectURL(audioBlob);
          setAudioUrl(url);
          
          if (autoPlay && audioRef.current) {
            audioRef.current.play().catch(err => {
              console.error('Audio playback failed:', err);
            });
          }
        }
      } catch (err) {
        console.error('Error in fetchAudio:', err);
      }
    };

    if (audioKey && selectedLanguage && userName) {
      fetchAudio();
    }
  }, [audioKey, selectedLanguage, userName, autoPlay]);

  return (
    <audio
      ref={audioRef}
      src={audioUrl}
      className="hidden"
      controls={false}
    />
  );
};

export default AudioPlayer;
