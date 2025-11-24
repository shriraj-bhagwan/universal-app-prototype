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
        const { data, error } = await supabase.functions.invoke('gcp-audio', {
          body: {
            audioKey,
            language: selectedLanguage,
            userName,
          },
        });

        if (error) {
          console.error('Error fetching audio:', error);
          return;
        }

        if (data?.audioUrl) {
          setAudioUrl(data.audioUrl);
          
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

    if (audioKey && selectedLanguage) {
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
