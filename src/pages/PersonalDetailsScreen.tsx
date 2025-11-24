import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LiveCamera from '@/components/LiveCamera';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const PersonalDetailsScreen = () => {
  const navigate = useNavigate();

  const handleItsRight = () => {
    navigate('/confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 px-6 pt-4 pb-32 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <LiveCamera />

          <h2 className="text-lg font-semibold text-center text-foreground mb-6">
            Personal Details
          </h2>

          <div className="space-y-4 mb-6">
            <div className="bg-accent/5 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Life Assured Name</p>
              <p className="text-sm font-semibold text-foreground">Ashok Kumar</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-accent/5 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Date of Birth</p>
                <p className="text-sm font-semibold text-foreground">01-Apr-1984</p>
              </div>
              <div className="bg-accent/5 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Gender</p>
                <p className="text-sm font-semibold text-foreground">Male</p>
              </div>
            </div>

            <div className="bg-accent/5 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">PAN Number</p>
              <p className="text-sm font-semibold text-foreground">DYIPB1234E</p>
            </div>

            <div className="bg-accent/5 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Address</p>
              <p className="text-sm font-semibold text-foreground">
                41 0 26/1B, plot D, canal bank road, Kasthuribai nagar, Adyar, Chennai, Tamilnadu.
              </p>
            </div>

            <div className="bg-accent/5 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Nominee</p>
              <p className="text-sm font-semibold text-foreground">Rohini Kumar</p>
            </div>
          </div>

          <p className="text-xs text-center text-muted-foreground mb-3">
            To view more details, please download the below file
          </p>

          <button className="w-full bg-background border border-border rounded-lg px-4 py-3 flex items-center justify-between mb-6 hover:bg-accent/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📄</div>
              <span className="text-sm font-medium text-foreground">Proposal Form</span>
            </div>
            <Download className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border px-6 py-4 z-10 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.history.back()}
          >
            Need Help
          </Button>
          <Button
            className="flex-1"
            onClick={handleItsRight}
          >
            It's Right
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PersonalDetailsScreen;
