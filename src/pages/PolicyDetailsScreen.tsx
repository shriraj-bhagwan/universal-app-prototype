import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import AudioPlayer from '@/components/AudioPlayer';
import LiveCamera from '@/components/LiveCamera';
import SwipeCardStack from '@/components/SwipeCardStack';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import { LanguageCode, copy } from '@/config/copy';
import {
  BadgeIndianRupee,
  Download,
  HandCoins,
  ShieldCheck,
  Wallet,
  ChevronRight,
  NotebookText,
  LucideIcon,
  ArrowRight,
  CalendarClock,
  RefreshCcw,
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
  description?: string;
}

const getDefaultCards = (language: LanguageCode): PolicyCard[] => [
  {
    id: 'plan-name',
    title: copy.policyDetails.cards.planName.title[language],
    subtitle: '',
    highlight: copy.policyDetails.cards.planName.highlight[language],
    highlightLabel: '',
    bonus: null,
    note: '',
    bgColor: 'bg-gradient-to-br from-[#a9d2fc] to-[#D9EAFB]',
    icon: NotebookText,
    description: copy.policyDetails.cards.planName.description[language],
    voiceoverText: 'This is the Bandhan Life Income Wealth plan. It is a savings plan that is simple, secure, and not linked to stock market fluctuations.',
  },
  {
    id: 'policy-term',
    title: copy.policyDetails.cards.policyTerm.title[language],
    subtitle: copy.policyDetails.cards.policyTerm.subtitle[language],
    highlight: copy.policyDetails.cards.policyTerm.highlight[language],
    highlightLabel: copy.policyDetails.cards.policyTerm.highlightLabel[language],
    bonus: null,
    note: '',
    bgColor: 'bg-gradient-to-br from-[#EAF4FF] to-[#CDDAE2] backdrop-blur-sm',
    icon: CalendarClock,
    voiceoverText: 'The policy term is 43 years, from 2025 to 2068, till you reach the age of 85.',
  },
  {
    id: 'income',
    title: copy.policyDetails.cards.income.title[language],
    subtitle: copy.policyDetails.cards.income.subtitle[language],
    highlight: '₹1,403',
    highlightLabel: copy.policyDetails.cards.income.highlightLabel[language],
    bonus: null, // copy.policyDetails.cards.income.bonus[language], // Commented out cash bonus
    note: '', // copy.policyDetails.cards.income.note[language], // Commented out note
    bgColor: 'bg-gradient-to-br from-[#EDF6FF] to-[#D9EAFB]',
    icon: Wallet,
    voiceoverText: 'You will receive a guaranteed income of 1403 rupees per month from 2025 to 2068, till your age of 84.',
  },
  {
    id: 'maturity',
    title: copy.policyDetails.cards.maturity.title[language],
    subtitle: copy.policyDetails.cards.maturity.subtitle[language],
    highlight: '₹18,25,497',
    highlightLabel: copy.policyDetails.cards.maturity.highlightLabel[language],
    bonus: null,
    note: copy.policyDetails.cards.maturity.note[language],
    bgColor: 'bg-gradient-to-br from-[#FFF7E4] to-[#F3F3F3]',
    icon: BadgeIndianRupee,
    voiceoverText: 'At maturity in 2083, you will receive a tax-free lumpsum of 66 lakh 54 thousand 336 rupees.',
  },
  {
    id: 'life-cover',
    title: copy.policyDetails.cards.lifeCover.title[language],
    subtitle: copy.policyDetails.cards.lifeCover.subtitle[language],
    highlight: '₹11,00,000',
    highlightLabel: copy.policyDetails.cards.lifeCover.highlightLabel[language],
    bonus: null,
    note: copy.policyDetails.cards.lifeCover.note[language],
    bgColor: 'bg-gradient-to-br from-[#FDEDEC] to-[#F3F3F3]',
    icon: ShieldCheck,
    voiceoverText: 'Your nominee will receive 11 lakh rupees in case of an unfortunate event, providing financial security till 2083.',
  },
  {
    id: 'premium',
    title: copy.policyDetails.cards.premium.title[language],
    subtitle: copy.policyDetails.cards.premium.subtitle[language],
    highlight: '₹1,00,000',
    highlightLabel: copy.policyDetails.cards.premium.highlightLabel[language],
    bonus: null,
    note: copy.policyDetails.cards.premium.note[language],
    bgColor: 'bg-gradient-to-br from-[#F3F3F3] to-[#EAEAEA]',
    icon: HandCoins,
    voiceoverText: 'You need to pay a premium of 1 lakh rupees per year for 10 years till 2034 to enjoy all these benefits.',
  },
  {
    id: 'play-again',
    title: copy.policyDetails.playAgain[language],
    subtitle: '',
    highlight: '',
    highlightLabel: '',
    bonus: null,
    note: '',
    bgColor: 'bg-gradient-to-br from-[#F4FAFF] to-[#EAF4FF]',
    icon: RefreshCcw,
    voiceoverText: '',
  },
];

interface PolicyDetailsScreenProps {
  cards?: PolicyCard[];
  enableVoiceover?: boolean;
}

const PolicyDetailsScreen = ({ cards: cardsProp, enableVoiceover = true }: PolicyDetailsScreenProps) => {
  const navigate = useNavigate();
  const { selectedLanguage } = useUser();
  const language = (selectedLanguage as LanguageCode) || 'english';
  const cards = cardsProp || getDefaultCards(language);
  const [cardsViewed, setCardsViewed] = useState(0);
  const [faceDetected, setFaceDetected] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<string>('plan-name');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const allCardsViewed = cardsViewed >= cards.length - 1;

  // Start audio playback when face is detected
  useEffect(() => {
    if (faceDetected && !audioPlaying && !audioEnded && enableVoiceover) {
      // Delay 1-2 seconds before starting audio
      const timer = setTimeout(() => {
        playCardAudio();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [faceDetected, audioPlaying, audioEnded, enableVoiceover, currentCardId]);

  const playCardAudio = async () => {
    const currentCard = cards.find(c => c.id === currentCardId);
    if (!currentCard) return;

    const languageCode = language === 'english' ? 'en' :
                         language === 'hindi' ? 'hn' :
                         language === 'malayalam' ? 'ml' : 'ta';

    try {
      setAudioPlaying(true);

      // For first card, play product_name then product_desc
      if (currentCard.id === 'plan-name') {
        // Play product_name audio
        const nameAudio = new Audio(`/product_name_${languageCode}.mp3`);
        audioRef.current = nameAudio;
        await nameAudio.play();

        await new Promise<void>((resolve) => {
          nameAudio.onended = () => resolve();
        });

        // Play product_desc audio
        const descAudio = new Audio(`/product_desc_${languageCode}.mp3`);
        audioRef.current = descAudio;
        await descAudio.play();

        await new Promise<void>((resolve) => {
          descAudio.onended = () => {
            setAudioPlaying(false);
            setAudioEnded(true);
            resolve();
          };
        });
      } else if (currentCard.id === 'policy-term') {
        // Play policy_term audio
        const termAudio = new Audio(`/policy_term_${languageCode}.mp3`);
        audioRef.current = termAudio;
        await termAudio.play();

        await new Promise<void>((resolve) => {
          termAudio.onended = () => {
            setAudioPlaying(false);
            setAudioEnded(true);
            resolve();
          };
        });
      } else if (currentCard.id === 'income') {
        // Play guaranteed_income audio
        const incomeAudio = new Audio(`/guaranteed_income_${languageCode}.mp3`);
        audioRef.current = incomeAudio;
        await incomeAudio.play();

        await new Promise<void>((resolve) => {
          incomeAudio.onended = () => {
            setAudioPlaying(false);
            setAudioEnded(true);
            resolve();
          };
        });
      } else if (currentCard.id === 'maturity') {
        // Play maturity_amount audio
        const maturityAudio = new Audio(`/maturity_amount_${languageCode}.mp3`);
        audioRef.current = maturityAudio;
        await maturityAudio.play();

        await new Promise<void>((resolve) => {
          maturityAudio.onended = () => {
            setAudioPlaying(false);
            setAudioEnded(true);
            resolve();
          };
        });
      } else if (currentCard.id === 'life-cover') {
        // Play life_cover audio
        const lifeCoverAudio = new Audio(`/life_cover_${languageCode}.mp3`);
        audioRef.current = lifeCoverAudio;
        await lifeCoverAudio.play();

        await new Promise<void>((resolve) => {
          lifeCoverAudio.onended = () => {
            setAudioPlaying(false);
            setAudioEnded(true);
            resolve();
          };
        });
      } else if (currentCard.id === 'premium') {
        // Play pay_premium audio
        const premiumAudio = new Audio(`/pay_premium_${languageCode}.mp3`);
        audioRef.current = premiumAudio;
        await premiumAudio.play();

        await new Promise<void>((resolve) => {
          premiumAudio.onended = () => {
            setAudioPlaying(false);
            setAudioEnded(true);
            resolve();
          };
        });
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      setAudioPlaying(false);
      setAudioEnded(true);
    }
  };

  const handleCardSwipe = () => {
    const nextIndex = Math.min(currentCardIndex + 1, cards.length - 1);
    setCardsViewed(prev => Math.min(prev + 1, cards.length - 1));
    setCurrentCardIndex(nextIndex);
    setCurrentCardId(cards[nextIndex].id);
    setAudioEnded(false);
    setAudioPlaying(false);
  };

  const handlePlayAgain = () => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    // Reset all states
    setAudioEnded(false);
    setAudioPlaying(false);
    setCardsViewed(0);
    setCurrentCardIndex(0);

    // Delay setting the card ID to trigger the useEffect
    setTimeout(() => {
      setCurrentCardId('plan-name');
    }, 100);
  };

  const handleUnderstood = () => {
    navigate('/personal-details');
  };

  const handleFaceDetectionChange = (detected: boolean) => {
    setFaceDetected(detected);
  };

  const policyNumber = 'ALI000000921212';

  const renderCard = (card: PolicyCard, index: number) => {
    const IconComponent = card.icon;
    const isCurrentCard = card.id === currentCardId;
    const showTapButton = isCurrentCard && audioEnded;

    // Special rendering for play again card
    if (card.id === 'play-again') {
      return (
        <div className={`${card.bgColor} p-4 text-white flex flex-col items-center justify-center h-full gap-4`}>
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/30 hover:bg-white/40 backdrop-blur-sm text-[#002B47] text-sm font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all"
            onClick={handlePlayAgain}
          >
            <RefreshCcw className="w-4 h-4" />
            {copy.policyDetails.playAgain[language]}
          </motion.button>

          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white/30 hover:bg-white/40 backdrop-blur-sm text-[#002B47] text-sm font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all"
          >
            <Download className="w-4 h-4" />
            {copy.policyDetails.downloadBenefits[language]}
          </motion.button>
        </div>
      );
    }

    // Determine text color based on card background
    const getHeaderTextColor = () => {
      // Cards with dark backgrounds use white text
      if (card.id === 'policy-term' || card.id === 'life-cover') {
        return 'text-[#002B47]';
      }
      // Light background cards use dark text
      return 'text-[#002B47]';
    };

    const getIconColor = () => {
      // Cards with dark backgrounds use white icons
      if (card.id === 'policy-term' || card.id === 'life-cover') {
        return 'text-[#002B47]';
      }
      // Light background cards use blue icons
      return 'text-[#094771]';
    };

    return (
      <div className={`border-2 rounded-2xl overflow-hidden ${
        card.id === 'plan-name' ? 'border-[#1b75bb]' :
        card.id === 'policy-term' ? 'border-[#3498db]' :
        card.id === 'income' ? 'border-[#5dade2]' :
        card.id === 'maturity' ? 'border-[#f39c12]' :
        card.id === 'life-cover' ? 'border-[#e74c3c]' :
        card.id === 'premium' ? 'border-[#95a5a6]' :
        'border-[#3498db]'
      }`}>
        {/* Card Header with colored background */}
        <div className={`${card.bgColor} p-3 flex items-center gap-2`}>
          <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <IconComponent className={`w-4.5 h-4.5 ${getIconColor()}`} />
          </div>
          <div>
            <h3 className={`text-sm font-bold ${getHeaderTextColor()}`}>{card.title}</h3>
            {card.subtitle && <p className={`text-xs ${getHeaderTextColor()} opacity-80`}>{card.subtitle}</p>}
          </div>
        </div>

        {/* Card Body with white background */}
        <div className="p-4 bg-white">
          {/* Highlight Value */}
          <div className="text-center py-2">
            <p className="text-2xl font-bold tracking-tight text-[#002B47]">{card.highlight}</p>
            {card.highlightLabel && <p className="text-sm text-[#094771]/90 mt-1">{card.highlightLabel}</p>}
            {card.bonus && (
              <p className="text-xs font-semibold mt-1.5 bg-[#094771]/10 rounded-full px-3 py-1 inline-block text-[#094771]">
                {card.bonus}
              </p>
            )}
          </div>

          {/* Description or Note */}
          {card.description ? (
            <p className="text-xs text-[#094771]/90 text-center leading-relaxed mt-1">{card.description}</p>
          ) : (
            card.note && <p className="text-[10px] text-[#094771]/70 text-center mt-1">{card.note}</p>
          )}

          {/* Tap Button */}
          <div className="flex justify-center mt-3">
            {showTapButton ? (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-[#004880] hover:bg-[#003366] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg transition-all"
                onClick={handleCardSwipe}
              >
                {copy.policyDetails.tapHere[language]}
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.button>
            ) : (
              <p className="text-[9px] text-[#094771]/50 text-center tracking-wide uppercase">
                {audioPlaying ? copy.policyDetails.listening[language] : `${copy.policyDetails.tapHere[language]} →`}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="min-h-[100dvh] flex flex-col from-slate-50 to-slate-100 overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <Header
        rightContent={
          <div className="text-right">
            <p className="text-[10px] text-muted-foreground">{copy.policyDetails.proposalNumber[language]}</p>
            <p className="text-xs font-semibold text-foreground">{policyNumber}</p>
          </div>
        }
      />

      {/* Progress Bar */}
      <div className="px-6 mb-2">
        <div className="max-w-[480px] mx-auto w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div className="flex h-full">
            <div className="bg-gradient-to-b from-[#1b75bb] to-[#3cacfc] transition-all" style={{ width: '68%' }} />
            <div className="bg-[#D0D0D0]" style={{ width: '32%' }} />
          </div>
        </div>
      </div>

      {/* Live Camera - between progress bar and main content */}
      <div className="px-4 mb-3">
        <div className="max-w-[480px] mx-auto flex justify-center">
          <div className="relative">
            <LiveCamera
              variant="circle"
              className="w-[140px] h-[140px]"
              enableFaceDetection={true}
              onFaceDetectionChange={handleFaceDetectionChange}
            />
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-24 overflow-y-auto">
        <div className="max-w-[420px] mx-auto space-y-3 pb-4">
          {/* Plan Name */}
          <div className="bg-white rounded-xl px-4 py-2.5 border border-dashed border-slate-300">
            <span className="text-sm text-slate-500">{copy.policyDetails.planLabel[language]}</span>
            <span className="text-sm font-semibold text-slate-800">{copy.policyDetails.cards.planName.highlight[language]}</span>
          </div>

          {/* Policy Benefits Section */}
          <div className="overflow-hidden">
            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2 px-1">
              {copy.policyDetails.policyBenefits[language]}
            </p>

            {/* Swipe Card Stack */}
            <SwipeCardStack
              cards={cards.map(c => ({ id: c.id, data: c }))}
              renderCard={(card, index) => renderCard(card.data, index)}
              cardHeight={240}
              onSwipe={handleCardSwipe}
            />
          </div>

          {/* Benefit Illustration */}
          <button className="w-full bg-white rounded-xl px-4 py-2 border border-slate-200 shadow-sm flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center">
                <Download className="w-3.5 h-3.5 text-slate-600" />
              </div>
              <span className="text-xs font-medium text-slate-700">{copy.policyDetails.benefitIllustration[language]}</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </main>

      {/* Footer - Fixed at bottom */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200 shadow-lg">
        <div className="w-full max-w-[480px] mx-auto p-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 h-11 rounded-xl border-2 border-[#004880] bg-white text-[#004880] font-medium hover:bg-slate-50"
              onClick={() => window.history.back()}
            >
              {copy.policyDetails.needHelp[language]}
            </Button>
            <Button
              className="flex-1 h-11 rounded-xl bg-[#004880] text-white hover:bg-[#003366] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleUnderstood}
              disabled={!allCardsViewed}
            >
              {copy.policyDetails.understood[language]}
            </Button>
          </div>
        </div>
      </footer>

      <AudioPlayer audioKey="policy-details" autoPlay />
    </motion.div>
  );
};

export default PolicyDetailsScreen;
