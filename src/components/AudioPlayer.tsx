import { useEffect, useRef } from 'react';
import { useUser } from '@/contexts/UserContext';

interface AudioPlayerProps {
  audioKey: string;
  autoPlay?: boolean;
}

const AudioPlayer = ({ audioKey, autoPlay = false }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { userName, selectedLanguage } = useUser();

  // This would integrate with GCP audio files
  // For now, it's a structure ready for implementation
  const getAudioUrl = (key: string, language: string, name: string) => {
    // TODO: Implement GCP audio file retrieval logic
    // This should construct the URL based on:
    // - audioKey (which audio file to play)
    // - selectedLanguage
    // - userName (for dynamic personalization)
    console.log('Audio request:', { key, language, name });
    return '';
  };

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      const audioUrl = getAudioUrl(audioKey, selectedLanguage, userName);
      if (audioUrl) {
        audioRef.current.play().catch(err => {
          console.error('Audio playback failed:', err);
        });
      }
    }
  }, [audioKey, selectedLanguage, userName, autoPlay]);

  return (
    <audio
      ref={audioRef}
      className="hidden"
      controls={false}
    >
      {/* Audio source will be dynamically set based on GCP configuration */}
    </audio>
  );
};

export default AudioPlayer;
