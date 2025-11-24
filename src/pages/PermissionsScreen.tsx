import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AvatarCharacter from '@/components/AvatarCharacter';
import { Button } from '@/components/ui/button';
import { Mic, Camera, MapPin } from 'lucide-react';

const PermissionsScreen = () => {
  const navigate = useNavigate();

  const handleAllowAccess = async () => {
    try {
      // Request camera and microphone permissions together in one prompt
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: true 
      });
      console.log('Camera and microphone access granted');
      stream.getTracks().forEach(track => track.stop());

      // Request location permission
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('Location access granted:', position.coords);
            // Navigate to policy intro screen after all permissions granted
            navigate('/policy-intro');
          },
          (error) => {
            console.error('Location access denied:', error);
            // Still navigate even if location is denied (optional)
            navigate('/policy-intro');
          }
        );
      } else {
        console.log('Geolocation not supported');
        navigate('/policy-intro');
      }
    } catch (error) {
      console.error('Permission error:', error);
      // Handle error - maybe show a toast notification
      alert('Please allow access to camera, microphone, and location to continue.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <AvatarCharacter />
        
        <div className="relative mb-8 max-w-sm">
          <div className="bg-secondary/10 border border-border rounded-2xl p-4 text-sm text-foreground">
            We'll need your camera, microphone and location to begin. We'll show your face on screen during the process. This helps us confirm that you're personally reviewing your policy.
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-secondary/10"></div>
        </div>

        <h1 className="text-2xl font-semibold text-foreground mb-2">
          Pre-Issuance Verification
        </h1>
        
        <p className="text-sm text-muted-foreground mb-8 text-center">
          Allow access to Camera, Microphone and Location
        </p>

        <div className="flex gap-6 mb-8">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Mic className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Camera className="w-6 h-6 text-muted-foreground" />
          </div>
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <MapPin className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>

        <Button
          onClick={handleAllowAccess}
          className="w-full max-w-xs mb-4"
          size="lg"
        >
          Allow Access
        </Button>

        <button className="text-sm text-muted-foreground">
          Having Trouble? <span className="text-primary">Click here</span>
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default PermissionsScreen;
