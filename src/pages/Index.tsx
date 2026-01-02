import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AvatarCharacter from '@/components/AvatarCharacter';
import AudioPlayer from '@/components/AudioPlayer';
import TypewriterText from '@/components/TypewriterText';
import { Button } from '@/components/ui/button';
import { copy, LanguageCode } from '@/config/copy';
import { cn } from '@/lib/utils';
import { CircleAlert } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userName, setUserName, selectedLanguage, setSelectedLanguage, setAudioPermissionGranted, unlockAudioContext } = useUser();
  const [hasStarted, setHasStarted] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);
  const [selected, setSelected] = useState(selectedLanguage || 'english');
  const [showBandwidthWarning, setShowBandwidthWarning] = useState(false);
  const [isCheckingBandwidth, setIsCheckingBandwidth] = useState(false);

  const resolvedLanguage = useMemo<LanguageCode>(() => {
    const fromList = copy.languageSelection.languages.find((lang) => lang.code === selected)?.code;
    return (fromList ?? 'english') as LanguageCode;
  }, [selected]);

  const greetingText = useMemo(
    () => copy.languageSelection.greetingText(resolvedLanguage, userName),
    [resolvedLanguage, userName]
  );

  useEffect(() => {
    // Initialize with default user name from config
    setUserName(copy.whatsapp.defaultContext.customerName);
    setAudioPermissionGranted(true);

    // Clear language selection from localStorage on Index page load
    // Only run once on mount
    if (typeof window !== 'undefined') {
      localStorage.removeItem('selectedLanguage');
    }
    setSelectedLanguage('english');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run on mount

  // Bandwidth probe function
  const checkBandwidth = async (): Promise<boolean> => {
    try {
      console.log('📊 [Bandwidth] Starting bandwidth check');

      // Check for query parameter to simulate low bandwidth
      const bandwidthParam = searchParams.get('bandwidth');
      if (bandwidthParam === 'slow' || bandwidthParam === 'low') {
        console.log('⚠️ [Bandwidth] Simulating low bandwidth via query parameter');
        return false; // Simulate low bandwidth
      }

      const fileUrl = '/bandwidth_probe.mp3';
      const fileSizeBytes = 220 * 1024; // ~220KB

      const startTime = performance.now();
      const response = await fetch(fileUrl);

      if (!response.ok) {
        console.warn('⚠️ [Bandwidth] Failed to fetch probe file, assuming good bandwidth');
        return true; // If we can't check, assume it's okay
      }

      await response.arrayBuffer(); // Fully download the file
      const endTime = performance.now();

      const downloadTimeSeconds = (endTime - startTime) / 1000;
      const speedMbps = (fileSizeBytes * 8) / (downloadTimeSeconds * 1000000);

      console.log('📊 [Bandwidth] Results:', {
        downloadTime: `${downloadTimeSeconds.toFixed(2)}s`,
        speed: `${speedMbps.toFixed(2)} Mbps`,
        threshold: '1.5 Mbps',
        isGood: speedMbps >= 1.5
      });

      return speedMbps >= 1.5; // Return true if bandwidth is good (>= 1.5 Mbps)
    } catch (error) {
      console.error('❌ [Bandwidth] Error checking bandwidth:', error);
      return true; // On error, assume bandwidth is okay
    }
  };

  // Handle start button click
  const handleStart = async () => {
    setIsCheckingBandwidth(true);

    // Unlock audio context on first user interaction
    await unlockAudioContext();

    // Check bandwidth
    const hasGoodBandwidth = await checkBandwidth();
    setIsCheckingBandwidth(false);

    if (!hasGoodBandwidth) {
      // Show bandwidth warning
      setShowBandwidthWarning(true);
      return;
    }

    // Proceed with normal flow
    proceedAfterBandwidthCheck();
  };

  const proceedAfterBandwidthCheck = () => {
    setHasStarted(true);

    // Show speech bubble after a short delay
    setTimeout(() => {
      setShowSpeechBubble(true);
      // Start typing animation slightly after bubble appears
      setTimeout(() => setStartTyping(true), 100);
    }, 300);
  };

  const handleContinueAnyway = () => {
    setShowBandwidthWarning(false);
    proceedAfterBandwidthCheck();
  };

  const handleNeedAssistance = () => {
    // Navigate to offline verification screen
    navigate('/offline-verification');
  };

  const handleAudioEnded = () => {
    // Show language selection when audio finishes
    setShowLanguageSelection(true);
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelected(languageCode);
    setSelectedLanguage(languageCode);
    navigate('/permissions');
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Header />

      <main className="flex-1 w-full max-w-md mx-auto px-6 flex flex-col items-center justify-center pb-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            /* Welcome Screen */
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full text-center space-y-6"
            >
              {/* Waving Animation */}
              <div className="flex justify-center -mt-4">
                <AvatarCharacter size={180} />
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">
                  Greetings!
                </h1>
                <p className="text-lg text-foreground">
                  Welcome to
                </p>
                <h2 className="text-xl font-bold text-primary">
                  Pre-Issuance Verification Process
                </h2>
              </div>

              <Button
                size="lg"
                onClick={handleStart}
                disabled={isCheckingBandwidth}
                className="w-full max-w-xs mx-auto h-14 text-lg bg-[#004880] hover:bg-[#003366] text-white"
              >
                {isCheckingBandwidth ? 'Checking connection...' : 'Start'}
              </Button>
            </motion.div>
          ) : (
            /* Main Content - Avatar, Speech Bubble, Language Selection */
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full space-y-4 pt-4"
            >
              {/* Title */}
              <div className="text-center">
                <h1 className="text-lg font-bold text-foreground">
                  {copy.languageSelection.title(copy.whatsapp.brandName).replace(copy.whatsapp.brandName, '')}
                  <span className="text-primary">{copy.whatsapp.brandName}</span>
                </h1>
              </div>

              {/* Speech Bubble - appears after short delay */}
              <AnimatePresence>
                {showSpeechBubble && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-card border border-border rounded-2xl p-3 shadow-sm min-h-[70px] flex items-center"
                  >
                    <p className="text-sm text-foreground leading-relaxed">
                      {startTyping ? (
                        <TypewriterText text={greetingText} speed={18} />
                      ) : (
                        <span>{greetingText}</span>
                      )}
                    </p>
                    {/* Speech bubble pointer */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-card" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Avatar Character */}
              <div className="flex justify-center -my-2">
                <AvatarCharacter size={180} />
              </div>

              {/* Language Selection Block - appears after audio ends */}
              <AnimatePresence>
                {showLanguageSelection && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="space-y-3"
                  >
                    <div className="text-center space-y-1">
                      <h2 className="text-lg font-bold text-foreground">
                        {copy.languageSelection.subtitle}
                      </h2>
                      <p className="text-xs text-secondary">
                        {copy.languageSelection.description}
                      </p>
                    </div>

                    {/* Language Grid */}
                    <div className="grid grid-cols-2 gap-2.5">
                      {copy.languageSelection.languages.map((language) => (
                        <Button
                          key={language.code}
                          variant={selected === language.code ? "default" : "outline"}
                          onClick={() => handleLanguageSelect(language.code)}
                          className={cn(
                            "h-12 text-base font-medium transition-all",
                            selected === language.code
                              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                              : "hover:border-secondary"
                          )}
                        >
                          {language.label}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Bandwidth Warning Dialog */}
      <AnimatePresence>
        {showBandwidthWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-6 max-w-sm w-full shadow-xl"
            >
              {/* Icon and Title */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <CircleAlert className="w-10 h-10 text-yellow-600" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-yellow-900">
                    Low Bandwidth Detected
                  </h2>
                  <p className="text-sm text-yellow-800 leading-relaxed">
                    Your internet connection appears to be slow. This may affect video verification and cause interruptions.
                    <br />
                    <br />
                    You can continue or choose offline verification for a smoother experience.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <Button
                  onClick={handleContinueAnyway}
                  className="w-full h-12 text-base bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Continue Anyway
                </Button>
                <Button
                  onClick={handleNeedAssistance}
                  variant="outline"
                  className="w-full h-12 text-base border-yellow-600 text-yellow-900 hover:bg-yellow-100"
                >
                  Offline Verification
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Player for welcome message - only plays after user starts */}
      {hasStarted && (
        <AudioPlayer
          audioKey="welcome"
          autoPlay
          onEnded={handleAudioEnded}
        />
      )}
    </motion.div>
  );
};

export default Index;
