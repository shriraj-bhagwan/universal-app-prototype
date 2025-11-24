import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AvatarCharacter from '@/components/AvatarCharacter';
import AudioPlayer from '@/components/AudioPlayer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'english', label: 'English' },
  { code: 'hindi', label: 'हिंदी' },
  { code: 'malayalam', label: 'മലയാളം' },
  { code: 'tamil', label: 'தமிழ்' },
];

const LanguageSelection = () => {
  const { userName, setSelectedLanguage } = useUser();
  const [selected, setSelected] = useState('english');
  const navigate = useNavigate();

  const handleLanguageSelect = (languageCode: string) => {
    setSelected(languageCode);
    setSelectedLanguage(languageCode);
    // TODO: Trigger audio playback for selected language
    navigate('/permissions');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 pb-32">
        <div className="max-w-md w-full space-y-8">
          {/* Greeting Section */}
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-foreground">
              Greetings from <span className="text-primary">BandhanLife!</span>
            </h1>
            
            {/* Speech bubble */}
            <div className="relative bg-card border border-border rounded-2xl p-4 shadow-sm">
              <p className="text-sm text-foreground">
                Hi {userName}. This quick step helps you know your policy better. Its benefits, terms, and what's important. It'll only take two minutes.
              </p>
              {/* Speech bubble pointer */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-card" />
            </div>

            {/* Avatar Character */}
            <AvatarCharacter />
          </div>

          {/* Language Selection */}
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                Pre-Issuance Verification
              </h2>
              <p className="text-sm text-secondary">
                Select your preferred language to proceed.
              </p>
            </div>

            {/* Language Grid */}
            <div className="grid grid-cols-2 gap-3">
              {languages.map((language) => (
                <Button
                  key={language.code}
                  variant={selected === language.code ? "default" : "outline"}
                  size="lg"
                  onClick={() => handleLanguageSelect(language.code)}
                  className={cn(
                    "h-14 text-lg font-medium transition-all",
                    selected === language.code 
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary/90" 
                      : "hover:border-secondary"
                  )}
                >
                  {language.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      {/* Audio Player for greeting message */}
      <AudioPlayer audioKey="greeting" autoPlay />
    </div>
  );
};

export default LanguageSelection;
