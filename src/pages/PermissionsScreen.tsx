import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AvatarCharacter from '@/components/AvatarCharacter';
import AudioPlayer from '@/components/AudioPlayer';
import TypewriterText from '@/components/TypewriterText';
import { Button } from '@/components/ui/button';
import { Mic, Camera, MapPin } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { copy, LanguageCode } from '@/config/copy';

const PermissionsScreen = () => {
  const navigate = useNavigate();
  const { selectedLanguage, setAudioPermissionGranted } = useUser();
  const language = (selectedLanguage as LanguageCode) || 'english';
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState({
    microphone: false,
    camera: false,
    location: false,
  });

  useEffect(() => {
    setAudioPermissionGranted(true);

    // Show speech bubble after a short delay
    const timer = setTimeout(() => {
      setShowSpeechBubble(true);
      // Start typing animation slightly after bubble appears
      setTimeout(() => setStartTyping(true), 100);
    }, 500);

    return () => clearTimeout(timer);
  }, [setAudioPermissionGranted]);

  const requestLocation = () =>
    new Promise<GeolocationPosition>((resolve, reject) => {
      if (!('geolocation' in navigator)) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    });

  const handleAllowAccess = async () => {
    try {
      // Kick off camera/mic and location prompts together from a single user gesture
      const [stream, position] = await Promise.all([
        navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        }),
        requestLocation(),
      ]);

      console.log('Camera/mic granted');

      // Update permissions UI with visual feedback
      // Show microphone granted first
      setPermissionsGranted(prev => ({ ...prev, microphone: true }));
      await new Promise(resolve => setTimeout(resolve, 200));

      // Then camera
      setPermissionsGranted(prev => ({ ...prev, camera: true }));
      await new Promise(resolve => setTimeout(resolve, 200));

      // Then location
      console.log('Location granted:', position.coords);
      setPermissionsGranted(prev => ({ ...prev, location: true }));

      // Stop camera/mic streams
      stream.getTracks().forEach((track) => track.stop());

      // Wait a moment for user to see all permissions granted, then navigate
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/policy-intro');
    } catch (error) {
      console.error('Permission error:', error);
      alert('Please allow access to camera, microphone, and location to continue.');
    }
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
              {copy.permissions.title[language]}
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
                    <TypewriterText text={copy.audio.scripts('permissions', language, '')} speed={18} />
                  ) : (
                    <span>{copy.audio.scripts('permissions', language, '')}</span>
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

          {/* Subtitle */}
          <p className="text-sm text-muted-foreground text-center">
            {copy.permissions.subtitle[language]}
          </p>

          {/* Permission Icons */}
          <div className="flex gap-6 justify-center py-4">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                permissionsGranted.microphone ? 'bg-blue-500' : 'bg-muted'
              }`}
            >
              <Mic className={`w-6 h-6 transition-colors duration-300 ${
                permissionsGranted.microphone ? 'text-white' : 'text-muted-foreground'
              }`} />
            </div>
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                permissionsGranted.camera ? 'bg-blue-500' : 'bg-muted'
              }`}
            >
              <Camera className={`w-6 h-6 transition-colors duration-300 ${
                permissionsGranted.camera ? 'text-white' : 'text-muted-foreground'
              }`} />
            </div>
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                permissionsGranted.location ? 'bg-blue-500' : 'bg-muted'
              }`}
            >
              <MapPin className={`w-6 h-6 transition-colors duration-300 ${
                permissionsGranted.location ? 'text-white' : 'text-muted-foreground'
              }`} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <Button
              onClick={handleAllowAccess}
              className="w-full"
              size="lg"
            >
              {copy.permissions.button[language]}
            </Button>

            <button className="w-full text-sm text-muted-foreground">
              {copy.permissions.trouble[language]} <span className="text-primary">{copy.permissions.clickHere[language]}</span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
      <AudioPlayer audioKey="permissions" autoPlay />
    </motion.div>
  );
};

export default PermissionsScreen;
