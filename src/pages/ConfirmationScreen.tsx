import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AvatarCharacter from '@/components/AvatarCharacter';
import AudioPlayer from '@/components/AudioPlayer';
import TypewriterText from '@/components/TypewriterText';
import { useUser } from '@/contexts/UserContext';
import { copy, LanguageCode } from '@/config/copy';

const ConfirmationScreen = () => {
  const navigate = useNavigate();
  const { userName, selectedLanguage } = useUser();
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const language = useMemo<LanguageCode>(() => (selectedLanguage as LanguageCode) ?? 'english', [selectedLanguage]);
  const confirmationText = useMemo(() => copy.audio.scripts('confirmation', language, userName), [language, userName]);

  useEffect(() => {
    // Show speech bubble after a short delay
    const timer = setTimeout(() => {
      setShowSpeechBubble(true);
      // Start typing animation slightly after bubble appears
      setTimeout(() => setStartTyping(true), 100);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleAudioEnded = () => {
    // Wait 2 seconds after audio ends, then navigate
    setTimeout(() => {
      navigate('/consent');
    }, 2000);
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

      <main className="flex-1 w-full max-w-md mx-auto px-6 flex flex-col items-center pt-4 pb-6 overflow-hidden">
        <div className="w-full space-y-4">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-lg font-bold text-foreground">
              Confirmation
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
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {startTyping ? (
                    <TypewriterText text={confirmationText} speed={18} />
                  ) : (
                    <span>{confirmationText}</span>
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
        </div>
      </main>

      <Footer />

      <AudioPlayer
        audioKey="confirmation"
        autoPlay
        onEnded={handleAudioEnded}
      />
    </motion.div>
  );
};

export default ConfirmationScreen;
