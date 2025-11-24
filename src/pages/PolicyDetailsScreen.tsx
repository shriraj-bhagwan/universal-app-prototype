import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AudioPlayer from '@/components/AudioPlayer';
import LiveCamera from '@/components/LiveCamera';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const PolicyDetailsScreen = () => {
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleUnderstood = () => {
    navigate('/personal-details');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 px-6 pt-4 pb-32 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <LiveCamera />

          <div className="bg-accent/5 rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground mb-1">Plan Name</p>
            <p className="text-sm font-semibold text-foreground">Bandhan Life Income Wealth</p>
          </div>

          <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems} className="mb-6">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm font-medium text-foreground">
                Death Benefit
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                In case of death during the policy term, the nominee will receive the Sum Assured along with accrued bonuses.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm font-medium text-foreground">
                Maturity Benefit
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                On survival till the end of the policy term, you will receive the Sum Assured along with accumulated bonuses and loyalty additions, if any.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm font-medium text-foreground">
                Income Benefit
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Regular income payouts starting from a specified year as per your policy terms, providing financial stability during the income phase.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sm font-medium text-foreground">
                Tax Benefits
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                Premiums paid are eligible for tax deductions under Section 80C, and maturity proceeds are tax-free under Section 10(10D) of the Income Tax Act, subject to conditions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p className="text-xs text-center text-muted-foreground mb-3">
            To view more details, please download the below file
          </p>

          <button className="w-full bg-background border border-border rounded-lg px-4 py-3 flex items-center justify-between mb-6 hover:bg-accent/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📄</div>
              <span className="text-sm font-medium text-foreground">Benefit Illustration</span>
            </div>
            <Download className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border px-6 py-4 z-10">
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
            onClick={handleUnderstood}
          >
            Understood
          </Button>
        </div>
      </div>

      <Footer />
      <AudioPlayer audioKey="policy-details" autoPlay />
    </div>
  );
};

export default PolicyDetailsScreen;
