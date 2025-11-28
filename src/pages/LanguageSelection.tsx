import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AvatarCharacter from '@/components/AvatarCharacter';
import AudioPlayer from '@/components/AudioPlayer';
import TypewriterText from '@/components/TypewriterText';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'english', label: 'English' },
];

const LanguageSelection = () => {
  const { userName, selectedLanguage, setSelectedLanguage } = useUser();
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
                <TypewriterText
                  text={
                    selectedLanguage === 'hindi'
                      ? `नमस्ते ${userName}। यह छोटा सा चरण आपको अपनी पॉलिसी बेहतर तरीके से समझने में मदद करेगा—फायदे, शर्तें और जरूरी बातें। इसमें केवल दो मिनट लगेंगे।`
                      : selectedLanguage === 'malayalam'
                        ? `ഹായ് ${userName}. നിങ്ങളുടെ പോളിസിയെ കുറിച്ച് കൂടുതൽ അറിയാൻ ഈ ചുരുങ്ങിയ ഘട്ടം സഹായിക്കും. ആനുകൂല്യങ്ങളും നിബന്ധനകളും പ്രധാന കാര്യങ്ങളും നിങ്ങൾക്ക് വ്യക്തമായി മനസ്സിലാകും. രണ്ട് മിനിറ്റിൽ പൂർത്തിയാകും.`
                        : selectedLanguage === 'tamil'
                          ? `வணக்கம் ${userName}. உங்கள் பாலிசியைப் பற்றி தெளிவாக அறிய இந்தச் சிறிய கட்டம் உதவும். பலன்கள், நிபந்தனைகள் மற்றும் முக்கிய அம்சங்களை இரண்டு நிமிடத்தில் சொல்கிறோம்.`
                          : `Hi ${userName}. This quick step helps you know your policy better. Its benefits, terms, and what's important. It'll only take two minutes.`
                  }
                  speed={18}
                />
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
