import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AvatarCharacter from '@/components/AvatarCharacter';
import AudioPlayer from '@/components/AudioPlayer';
import TypewriterText from '@/components/TypewriterText';
import { useUser } from '@/contexts/UserContext';
import { copy, LanguageCode } from '@/config/copy';

const PolicyIntroScreen = () => {
  const navigate = useNavigate();
  const { userName, selectedLanguage } = useUser();
  const [startTyping, setStartTyping] = useState(false);
  const language = useMemo<LanguageCode>(() => (selectedLanguage as LanguageCode) ?? 'english', [selectedLanguage]);
  const introText = useMemo(() => copy.audio.scripts('policy-intro', language, userName), [language, userName]);

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-start px-6 pt-16">
        <div className="relative mb-8 max-w-sm">
          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 text-sm text-foreground">
            {startTyping ? (
              <TypewriterText text={introText} speed={18} />
            ) : (
              <span>{introText}</span>
            )}
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-accent/10"></div>
        </div>

        <AvatarCharacter />
      </main>

      <Footer />
      
      <AudioPlayer
        audioKey="policy-intro"
        autoPlay
        onPlay={() => setStartTyping(true)}
        onEnded={() => navigate('/policy-details')}
      />
    </div>
  );
};

export default PolicyIntroScreen;
