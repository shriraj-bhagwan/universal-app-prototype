import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const WhatsAppScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#ece5dd] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-background rounded-lg shadow-xl p-6 space-y-6">
        {/* WhatsApp-style header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-foreground">BandhanLife</h2>
            <p className="text-sm text-muted-foreground">Insurance Services</p>
          </div>
        </div>

        {/* Message content */}
        <div className="space-y-4">
          <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
            <p className="text-foreground mb-2">
              Welcome to BandhanLife! 👋
            </p>
            <p className="text-sm text-muted-foreground">
              This quick step helps you know your policy better. Its benefits, terms, and what's important. It'll only take two minutes.
            </p>
          </div>

          <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
            <p className="text-foreground mb-4">
              To continue with the verification process, please tap below:
            </p>
            <Button 
              onClick={() => navigate('/language-selection')}
              className="w-full"
              size="lg"
            >
              Proceed to Consent
            </Button>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-xs text-center text-muted-foreground pt-4">
          By proceeding, you agree to our terms and conditions
        </p>
      </div>
    </div>
  );
};

export default WhatsAppScreen;
