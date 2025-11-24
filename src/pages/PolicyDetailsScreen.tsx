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
      
      <main className="flex-1 px-6 pt-4 pb-20 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <LiveCamera />

          <div className="bg-accent/5 rounded-lg p-3 mb-4">
            <p className="text-xs text-muted-foreground mb-1">Plan Name</p>
            <p className="text-sm font-semibold text-foreground">Bandhan Life Income Wealth</p>
          </div>

          <Accordion type="multiple" value={expandedItems} onValueChange={setExpandedItems}>
            <AccordionItem value="income" className="border-none mb-3">
              <AccordionTrigger className="bg-[#FEF9E7] hover:bg-[#FEF9E7]/80 rounded-2xl px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="text-3xl">💰</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Income from 2025 to 2083</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-[#FEF9E7]/50 rounded-b-2xl px-4 pb-3 pt-2 mt-1">
                <p className="text-sm text-foreground">
                  Once your policy starts, you'll receive a guaranteed income of <span className="font-semibold">₹1,216 every month</span> till age 99.
                </p>
                <p className="text-sm text-foreground mt-2">
                  You'll also receive cash bonus of <span className="font-semibold">₹1,824 every month</span>, if declared, assuming 6% per annum.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="maturity" className="border-none mb-3">
              <AccordionTrigger className="bg-[#FFE5E5] hover:bg-[#FFE5E5]/80 rounded-2xl px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="text-3xl">💵</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Maturity Benefit in 2083</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-[#FFE5E5]/50 rounded-b-2xl px-4 pb-3 pt-2 mt-1">
                <p className="text-sm text-foreground">
                  Receive one time tax free lumpsum amount of <span className="font-semibold">₹66,54,336</span> at age 100.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (@@% p.a. assumed rate of return)
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="life-cover" className="border-none mb-3">
              <AccordionTrigger className="bg-[#E8F4F8] hover:bg-[#E8F4F8]/80 rounded-2xl px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="text-3xl">✅</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Life cover till 2083</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-[#E8F4F8]/50 rounded-b-2xl px-4 pb-3 pt-2 mt-1">
                <p className="text-sm text-foreground">
                  In case of any unfortunate event, your nominee will receive sum of <span className="font-semibold">₹11,00,000</span> till age of 100.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="premium" className="border-none mb-3">
              <AccordionTrigger className="bg-[#E8E8FF] hover:bg-[#E8E8FF]/80 rounded-2xl px-4 py-3 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="text-3xl">💳</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">Pay Premium till 2034</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="bg-[#E8E8FF]/50 rounded-b-2xl px-4 pb-3 pt-2 mt-1">
                <p className="text-sm text-foreground">
                  To enjoy all these benefits, you just have to pay premium of <span className="font-semibold">₹1,00,000 per year</span> for 10 yrs till 2034.
                </p>
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

          <div className="flex gap-3">
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
      </main>

      <Footer />
      <AudioPlayer audioKey="policy-details" autoPlay />
    </div>
  );
};

export default PolicyDetailsScreen;
