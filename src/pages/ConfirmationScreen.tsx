import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AvatarCharacter from '@/components/AvatarCharacter';
import AudioPlayer from '@/components/AudioPlayer';

const ConfirmationScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-navigate after 8 seconds (simulating voiceover completion)
    const timer = setTimeout(() => {
      navigate('/consent');
    }, 8000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative mb-8 max-w-sm">
          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 text-sm text-foreground">
            Hope this helped you understand your policy better.
            Now one last step, we need a quick confirmation from you.
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-accent/10"></div>
        </div>

        <AvatarCharacter />
      </main>

      <Footer />
      <AudioPlayer audioKey="confirmation" autoPlay />
    </div>
  );
};

export default ConfirmationScreen;
