import { useState, useEffect } from 'react';
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
  const [visibleItems, setVisibleItems] = useState<number>(0);

  // Show accordion items one by one with delay
  useEffect(() => {
    const delays = [1000, 3000, 5000, 7000]; // Simulating voiceover completion times
    
    delays.forEach((delay, index) => {
      setTimeout(() => {
        setVisibleItems(prev => prev + 1);
      }, delay);
    });
  }, []);

  const handleUnderstood = () => {
    navigate('/personal-details');
  };

  const items = [
    {
      id: "item-1",
      title: "Death Benefit",
      content: "In case of death during the policy term, the nominee will receive the Sum Assured along with accrued bonuses."
    },
    {
      id: "item-2",
      title: "Maturity Benefit",
      content: "On survival till the end of the policy term, you will receive the Sum Assured along with accumulated bonuses and loyalty additions, if any."
    },
    {
      id: "item-3",
      title: "Income Benefit",
      content: "Regular income payouts starting from a specified year as per your policy terms, providing financial stability during the income phase."
    },
    {
      id: "item-4",
      title: "Tax Benefits",
      content: "Premiums paid are eligible for tax deductions under Section 80C, and maturity proceeds are tax-free under Section 10(10D) of the Income Tax Act, subject to conditions."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 px-6 pt-4 pb-32 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <LiveCamera />

          <div className="bg-accent/10 rounded-lg p-4 mb-4 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Plan Name</p>
            <p className="text-base font-semibold text-foreground">Bandhan Life Income Wealth</p>
          </div>

          <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems} className="space-y-3 mb-6">
            {items.slice(0, visibleItems).map((item, index) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className="bg-accent/10 border border-border rounded-lg px-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-3">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground pb-3">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
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

      <div className="fixed bottom-0 left-0 right-0 px-6 py-4 z-20 bg-background border-t border-border">
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
