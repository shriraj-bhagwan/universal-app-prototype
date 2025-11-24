import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AvatarCharacter from '@/components/AvatarCharacter';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const ThankYouScreen = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-start px-6 pt-8">
        <h1 className="text-xl font-bold text-foreground mb-4">
          Pre-Issuance Verification Submitted!
        </h1>

        <div className="relative mb-8 max-w-sm">
          <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 text-sm text-foreground">
            Thank you for your time and trust in Bandhan Life.
          </div>
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-accent/10"></div>
        </div>

        <AvatarCharacter />

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-6">
          Thank You
        </h2>

        <div className="w-full max-w-sm bg-accent/5 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-destructive">Explore iAssist</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Your Customer Service Portal
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <p className="text-sm text-foreground">Check your policy status</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <p className="text-sm text-foreground">Update your contact details</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <p className="text-sm text-foreground">Download policy documents</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-3 h-3 text-primary" />
              </div>
              <p className="text-sm text-foreground">Access all policy-related information</p>
            </div>
          </div>

          <Button className="w-full" size="lg">
            Visit iAssist
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYouScreen;
