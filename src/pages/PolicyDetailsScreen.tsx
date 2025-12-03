import { useNavigate } from 'react-router-dom';
import AudioPlayer from '@/components/AudioPlayer';
import LiveCamera from '@/components/LiveCamera';
import SwipeCardStack from '@/components/SwipeCardStack';
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
  ChevronRight,
  LucideIcon,
} from 'lucide-react';

export interface PolicyCard {
  id: string;
  title: string;
  subtitle: string;
  highlight: string;
  highlightLabel: string;
  bonus: string | null;
  note: string;
  bgColor: string;
  icon: LucideIcon;
  voiceoverText?: string;
}

const defaultCards: PolicyCard[] = [
  {
    id: 'income',
    title: 'Monthly Income',
    subtitle: '2025 to 2083',
    highlight: '₹1,216',
    highlightLabel: 'per month guaranteed',
    bonus: '+ ₹1,824 bonus/month',
    note: 'If declared, assuming 8% p.a.',
    bgColor: 'bg-gradient-to-br from-amber-400 to-orange-500',
    icon: Wallet,
    voiceoverText: 'You will receive a monthly income of 1216 rupees per month, guaranteed from 2025 to 2083, plus a bonus of 1824 rupees per month if declared.',
  },
  {
    id: 'maturity',
    title: 'Maturity Benefit',
    subtitle: 'Year 2083',
    highlight: '₹66,54,336',
    highlightLabel: 'tax-free lumpsum',
    bonus: null,
    note: '8% p.a. assumed rate of return',
    bgColor: 'bg-gradient-to-br from-rose-400 to-pink-500',
    icon: BadgeIndianRupee,
    voiceoverText: 'At maturity in 2083, you will receive a tax-free lumpsum of 66 lakh 54 thousand 336 rupees.',
  },
  {
    id: 'life-cover',
    title: 'Life Cover',
    subtitle: 'Till 2083',
    highlight: '₹11,00,000',
    highlightLabel: 'nominee receives',
    bonus: null,
    note: 'In case of unfortunate event',
    bgColor: 'bg-gradient-to-br from-sky-400 to-blue-500',
    icon: ShieldCheck,
    voiceoverText: 'Your nominee will receive 11 lakh rupees in case of an unfortunate event, providing financial security till 2083.',
  },
  {
    id: 'premium',
    title: 'Premium Payment',
    subtitle: 'Till 2034',
    highlight: '₹1,00,000',
    highlightLabel: 'per year for 10 years',
    bonus: null,
    note: 'To enjoy all benefits',
    bgColor: 'bg-gradient-to-br from-violet-400 to-purple-500',
    icon: HandCoins,
    voiceoverText: 'You need to pay a premium of 1 lakh rupees per year for 10 years till 2034 to enjoy all these benefits.',
  },
];

interface PolicyDetailsScreenProps {
  cards?: PolicyCard[];
  enableVoiceover?: boolean;
}

const PolicyDetailsScreen = ({ cards = defaultCards, enableVoiceover = true }: PolicyDetailsScreenProps) => {
  const navigate = useNavigate();

  const handleUnderstood = () => {
    navigate('/personal-details');
  };

  const policyNumber = 'ALI000000921212';

  const renderCard = (card: PolicyCard) => {
    const IconComponent = card.icon;
    return (
      <div className={`${card.bgColor} p-4 text-white`}>
        {/* Card Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold">{card.title}</h3>
            <p className="text-[10px] text-white/80">{card.subtitle}</p>
          </div>
        </div>

        {/* Highlight Value */}
        <div className="text-center py-2">
          <p className="text-2xl font-bold tracking-tight">{card.highlight}</p>
          <p className="text-xs text-white/90">{card.highlightLabel}</p>
          {card.bonus && (
            <p className="text-xs font-semibold mt-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
              {card.bonus}
            </p>
          )}
        </div>

        {/* Note */}
        <p className="text-[10px] text-white/70 text-center">{card.note}</p>

        {/* Swipe hint */}
        <p className="text-[9px] text-white/50 text-center mt-2 tracking-wide uppercase">
          TAP HERE →
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
      {/* Header */}
      <header className="pt-3 pb-2">
        <div className="w-full bg-white border-b border-slate-200 shadow-sm px-4 py-2.5">
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

      {/* Live Camera - between progress bar and main content */}
      <div className="px-4 mb-3">
        <div className="max-w-[480px] mx-auto flex justify-center">
          <div className="relative">
            <LiveCamera variant="circle" className="w-[140px] h-[140px] border-2 border-[#1b75bb]" />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-40 overflow-hidden">
        <div className="max-w-[420px] mx-auto space-y-3 overflow-hidden">
          {/* Plan Name */}
          <div className="bg-white rounded-xl px-4 py-2.5 border border-dashed border-slate-300">
            <span className="text-sm text-slate-500">Plan: </span>
            <span className="text-sm font-semibold text-slate-800">Bandhan Life Income Wealth</span>
          </div>

          {/* Policy Benefits Section */}
          <div className="overflow-hidden">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-2 px-1">
              Policy Benefits
            </p>

            {/* Swipe Card Stack */}
            <SwipeCardStack
              cards={cards.map(c => ({ id: c.id, data: c }))}
              renderCard={(card) => renderCard(card.data)}
              cardHeight={215}
            />
          </div>

          {/* Benefit Illustration */}
          <button className="w-full bg-white rounded-xl px-4 py-2.5 border border-slate-200 shadow-sm flex items-center justify-between hover:bg-slate-50 transition-colors">
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
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-slate-100 via-slate-100 to-transparent pt-6 pb-4">
        <div className="w-full">
          <div className="bg-white border-t border-slate-200 shadow-lg p-3">
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
