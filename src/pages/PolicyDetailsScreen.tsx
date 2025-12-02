import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AudioPlayer from '@/components/AudioPlayer';
import LiveCamera from '@/components/LiveCamera';
import headerLogo from '@/assets/header-logo.png';
import { Button } from '@/components/ui/button';
import {
  BadgeIndianRupee,
  BatteryFull,
  Download,
  HandCoins,
  ShieldCheck,
  SignalHigh,
  Wallet,
  Wifi,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const PolicyDetailsScreen = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleUnderstood = () => {
    navigate('/personal-details');
  };

  const cards = useMemo(
    () => [
      {
        id: 'income',
        title: 'Monthly Income',
        subtitle: '2025 to 2083',
        highlight: '₹1,216',
        highlightLabel: 'per month guaranteed',
        bonus: '+ ₹1,824 bonus/month',
        note: 'If declared, assuming 8% p.a.',
        color: 'bg-amber-500',
        lightBg: 'bg-amber-50',
        icon: <Wallet className="w-5 h-5 text-amber-600" />,
      },
      {
        id: 'maturity',
        title: 'Maturity Benefit',
        subtitle: 'Year 2083',
        highlight: '₹66,54,336',
        highlightLabel: 'tax-free lumpsum',
        bonus: null,
        note: '8% p.a. assumed rate of return',
        color: 'bg-rose-500',
        lightBg: 'bg-rose-50',
        icon: <BadgeIndianRupee className="w-5 h-5 text-rose-600" />,
      },
      {
        id: 'life-cover',
        title: 'Life Cover',
        subtitle: 'Till 2083',
        highlight: '₹11,00,000',
        highlightLabel: 'nominee receives',
        bonus: null,
        note: 'In case of unfortunate event',
        color: 'bg-sky-500',
        lightBg: 'bg-sky-50',
        icon: <ShieldCheck className="w-5 h-5 text-sky-600" />,
      },
      {
        id: 'premium',
        title: 'Premium Payment',
        subtitle: 'Till 2034',
        highlight: '₹1,00,000',
        highlightLabel: 'per year for 10 years',
        bonus: null,
        note: 'To enjoy all benefits',
        color: 'bg-violet-500',
        lightBg: 'bg-violet-50',
        icon: <HandCoins className="w-5 h-5 text-violet-600" />,
      },
    ],
    []
  );

  const currentCard = cards[activeIndex];
  const policyNumber = 'ALI000000921212';

  const goNext = () => setActiveIndex((prev) => (prev + 1) % cards.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="px-4 pt-3 pb-2">
        <div className="max-w-[480px] mx-auto w-full bg-white rounded-2xl border border-slate-200 shadow-sm px-4 py-2.5">
          <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1.5">
            <SignalHigh className="w-3.5 h-3.5" strokeWidth={1.5} />
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5" strokeWidth={1.5} />
              <BatteryFull className="w-3.5 h-3.5" strokeWidth={1.5} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <img src={headerLogo} alt="Bandhan Life" className="h-8 w-auto object-contain" />
            <div className="text-right">
              <p className="text-[10px] text-slate-500">Proposal Number</p>
              <p className="text-xs font-semibold text-slate-800">{policyNumber}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 mb-3">
        <div className="max-w-[480px] mx-auto w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="flex h-full">
            <div className="bg-[#1b75bb] transition-all" style={{ width: '68%' }} />
            <div className="bg-[#e44a4a]" style={{ width: '32%' }} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-32 overflow-y-auto">
        <div className="max-w-[420px] mx-auto space-y-4">
          {/* Camera */}
          <div className="flex justify-center">
            <LiveCamera variant="circle" className="w-[160px] h-[160px]" />
          </div>

          {/* Plan Name */}
          <div className="bg-white rounded-xl px-4 py-2.5 border border-dashed border-slate-300 text-center">
            <span className="text-sm text-slate-500">Plan: </span>
            <span className="text-sm font-semibold text-slate-800">Bandhan Life Income Wealth</span>
          </div>

          {/* Policy Benefits Section */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2 px-1">
              Policy Benefits
            </p>

            {/* Single Card Display */}
            <div className={`${currentCard.lightBg} rounded-2xl p-5 border border-white shadow-sm`}>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                    {currentCard.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800">{currentCard.title}</h3>
                    <p className="text-xs text-slate-500">{currentCard.subtitle}</p>
                  </div>
                </div>
                <div className={`w-7 h-7 rounded-full ${currentCard.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {activeIndex + 1}
                </div>
              </div>

              {/* Highlight Value */}
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-slate-900">{currentCard.highlight}</p>
                <p className="text-sm text-slate-600 mt-1">{currentCard.highlightLabel}</p>
                {currentCard.bonus && (
                  <p className="text-sm font-medium text-slate-700 mt-2 bg-white/60 rounded-full px-3 py-1 inline-block">
                    {currentCard.bonus}
                  </p>
                )}
              </div>

              {/* Note */}
              <p className="text-xs text-slate-500 text-center">{currentCard.note}</p>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/50">
                <button 
                  onClick={goPrev}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
                <div className="flex gap-1.5">
                  {cards.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === activeIndex ? 'bg-slate-700 w-4' : 'bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <button 
                  onClick={goNext}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Benefit Illustration */}
          <button className="w-full bg-white rounded-xl px-4 py-3 border border-slate-200 shadow-sm flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <Download className="w-4 h-4 text-slate-600" />
              </div>
              <span className="text-sm font-medium text-slate-700">Benefit Illustration</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-slate-100 via-slate-100 to-transparent pt-6 pb-4 px-4">
        <div className="max-w-[420px] mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-3">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl border-slate-300 text-slate-700 font-medium"
                onClick={() => window.history.back()}
              >
                Need Help
              </Button>
              <Button
                className="flex-1 h-12 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-medium"
                onClick={handleUnderstood}
              >
                Understood
              </Button>
            </div>
          </div>
        </div>
      </footer>

      <AudioPlayer audioKey="policy-details" autoPlay />
    </div>
  );
};

export default PolicyDetailsScreen;
