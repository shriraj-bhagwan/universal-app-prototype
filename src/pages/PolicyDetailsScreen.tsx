import { useMemo, useState } from 'react';
import type React from 'react';
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
} from 'lucide-react';

const PolicyDetailsScreen = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragState, setDragState] = useState({
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    isDragging: false,
  });
  const [isLeaving, setIsLeaving] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const handleUnderstood = () => {
    navigate('/personal-details');
  };

  const cards = useMemo(
    () => [
      {
        id: 'income',
        title: 'Income from 2025 to 2083',
        content: [
          "Once your policy starts, you'll receive a guaranteed income of",
          '₹1,216 every month till age 99.',
          "You'll also receive cash bonus benefits of ₹1,824 every month.",
          'If declared, assuming 8% per annum.',
        ],
        bg: 'bg-[#f7e46a]',
        icon: <Wallet className="w-8 h-8 text-[#e6b100]" />,
      },
      {
        id: 'maturity',
        title: 'Maturity Benefit in 2083',
        content: [
          'Receive one time tax free lumpsum amount of',
          '₹66,54,336',
          '(8% p.a. assumed rate of return)',
        ],
        bg: 'bg-[#f8bbb7]',
        icon: <BadgeIndianRupee className="w-8 h-8 text-[#d64545]" />,
      },
      {
        id: 'life-cover',
        title: 'Life cover till 2083',
        content: [
          'In case of any unfortunate event,',
          'your nominee will receive sum of',
          '₹11,00,000.',
        ],
        bg: 'bg-[#e7ebed]',
        icon: <ShieldCheck className="w-8 h-8 text-[#4c718d]" />,
      },
      {
        id: 'premium',
        title: 'Pay Premium till 2034',
        content: [
          'To enjoy all these benefits, you just',
          'have to pay premium of ₹ 1,00,000',
          'per year for 10 yrs till 2034.',
        ],
        bg: 'bg-[#a8b8f2]',
        icon: <HandCoins className="w-8 h-8 text-[#4c398d]" />,
      },
    ],
    []
  );

  const orderedCards = useMemo(
    () => cards.map((_, idx) => cards[(activeIndex + idx) % cards.length]),
    [activeIndex, cards]
  );

  const policyNumber = 'ALI000000921212';

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isLeaving) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragState({
      startX: event.clientX,
      startY: event.clientY,
      x: 0,
      y: 0,
      isDragging: true,
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.isDragging || isLeaving) return;
    setDragState((prev) => ({
      ...prev,
      x: event.clientX - prev.startX,
      y: event.clientY - prev.startY,
    }));
  };

  const resetCardPosition = () => {
    setDragState((prev) => ({
      ...prev,
      x: 0,
      y: 0,
      isDragging: false,
    }));
    setSwipeDirection(null);
  };

  const finishSwipe = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
    setIsLeaving(false);
    setSwipeDirection(null);
    setDragState({
      startX: 0,
      startY: 0,
      x: 0,
      y: 0,
      isDragging: false,
    });
  };

  const handlePointerUp = () => {
    if (!dragState.isDragging || isLeaving) return;
    const threshold = 110;

    if (dragState.x > threshold) {
      setSwipeDirection('right');
      setIsLeaving(true);
      setDragState((prev) => ({
        ...prev,
        x: window.innerWidth * 0.8,
        y: prev.y + 30,
        isDragging: false,
      }));
      return;
    }

    if (dragState.x < -threshold) {
      setSwipeDirection('left');
      setIsLeaving(true);
      setDragState((prev) => ({
        ...prev,
        x: -window.innerWidth * 0.8,
        y: prev.y + 30,
        isDragging: false,
      }));
      return;
    }

    resetCardPosition();
  };

  const handleTransitionEnd = () => {
    if (!isLeaving) return;
    finishSwipe();
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#f1f4f8]">
      <header className="px-4 pt-3">
        <div className="max-w-[480px] mx-auto w-full bg-white rounded-[28px] border border-[#dbe6f3] shadow-[0_10px_26px_rgba(12,35,72,0.08)] px-5 py-3">
          <div className="flex items-center justify-between text-[#3c5675] text-[11px] mb-2">
            <SignalHigh className="w-4 h-4" strokeWidth={1.5} />
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4" strokeWidth={1.5} />
              <BatteryFull className="w-4 h-4" strokeWidth={1.5} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={headerLogo}
                alt="Bandhan Life"
                className="h-10 w-auto object-contain min-w-[140px]"
              />
            </div>
            <div className="bg-white border border-[#d7e3f7] rounded-2xl px-3 py-2 text-right shadow-[0_8px_18px_rgba(14,51,102,0.09)] min-w-[168px] flex-shrink-0">
              <p className="text-[11px] text-[#456089] font-medium leading-tight">Proposal Number</p>
              <p className="text-sm font-semibold text-[#0b2645] leading-tight tracking-tight whitespace-nowrap">
                {policyNumber}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 mt-3">
        <div className="max-w-[480px] mx-auto w-full h-[12px] bg-white rounded-full border border-[#dbe6f3] shadow-sm overflow-hidden">
          <div className="flex h-full w-full">
            <div className="bg-[#1b75bb]" style={{ width: '68%' }} />
            <div className="bg-[#e44a4a]" style={{ width: '32%' }} />
          </div>
        </div>
      </div>

      <main className="flex-1 min-h-0 px-5 pt-4 pb-48 overflow-y-auto">
        <div className="max-w-[420px] mx-auto space-y-4">
          <div className="flex justify-center">
            <LiveCamera
              variant="circle"
              className="mb-2 max-w-[220px] sm:max-w-[240px] drop-shadow-[0_12px_24px_rgba(16,62,112,0.18)]"
            />
          </div>

          <div className="bg-white rounded-full px-4 py-3 border border-dashed border-slate-300 shadow-sm text-sm font-semibold text-slate-800">
            <span className="text-slate-600">Plan Name</span>{' '}
            <span className="font-bold">Bandhan Life income Wealth</span>
          </div>

          <div className="relative">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                  Policy Benefits
                </p>
              </div>
            </div>

            <div className="relative h-[440px] sm:h-[500px] overflow-y-auto">
              <div className="absolute inset-x-4 bottom-8 top-6 rounded-[28px] bg-gradient-to-b from-white/80 via-white/60 to-[#cfdfff]/70 blur-2xl" />

              {orderedCards.slice(0, 3).map((card, idx) => {
                const isTopCard = idx === 0;
                const offset = idx * 16;
                const scale = 1 - idx * 0.04;
                const transform = isTopCard
                  ? `translate(${dragState.x}px, ${dragState.y}px) rotate(${dragState.x / 16}deg)`
                  : `translateY(${offset}px) scale(${scale})`;
                const transition =
                  isTopCard && dragState.isDragging
                    ? 'none'
                    : 'transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)';
                const borderTone =
                  isTopCard && swipeDirection === 'right'
                    ? 'border-green-500/60 shadow-green-200/80'
                    : isTopCard && swipeDirection === 'left'
                      ? 'border-rose-500/60 shadow-rose-200/80'
                      : 'border-slate-200/60 shadow-slate-200/60';

                return (
                  <div
                    key={card.id}
                    className={`${card.bg} absolute inset-0 mx-2 rounded-3xl p-5 flex flex-col justify-between border ${borderTone} shadow-xl backdrop-blur-sm`}
                    style={{
                      zIndex: orderedCards.length - idx,
                      transform,
                      transition,
                      pointerEvents: isTopCard ? 'auto' : 'none',
                    }}
                    onPointerDown={isTopCard ? handlePointerDown : undefined}
                    onPointerMove={isTopCard ? handlePointerMove : undefined}
                    onPointerUp={isTopCard ? handlePointerUp : undefined}
                    onPointerCancel={isTopCard ? handlePointerUp : undefined}
                    onTransitionEnd={isTopCard ? handleTransitionEnd : undefined}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                          {card.icon}
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-[11px] uppercase tracking-[0.12em] text-slate-600">
                            Benefit Card
                          </p>
                          <h3 className="text-xl font-semibold text-slate-900 leading-tight">
                            {card.title}
                          </h3>
                        </div>
                      </div>
                      <div className="text-[11px] px-3 py-1 rounded-full bg-white/80 text-slate-700 border border-white/60 shadow-sm">
                        {(activeIndex + idx) % cards.length + 1} / {cards.length}
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 text-sm text-slate-800">
                      {card.content.map((line, contentIdx) => (
                        <p key={contentIdx} className={contentIdx === 1 ? 'font-bold text-base' : ''}>
                          {line}
                        </p>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between text-xs text-slate-600">
                      <span>Swipe left to skip</span>
                      <span className="font-semibold text-slate-800">Swipe right to keep</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-full px-4 py-3 border border-slate-300 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Download className="w-5 h-5 text-slate-700" />
              </div>
              <span className="text-sm font-medium text-slate-900">Benefit Illustration</span>
            </div>
            <span className="text-xl text-slate-500">⌵</span>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-4 left-4 right-4 z-30 pointer-events-none">
        <div className="max-w-[440px] mx-auto w-full">
          <div className="bg-white rounded-[22px] border border-[#dbe6f3] shadow-[0_-8px_26px_rgba(13,31,67,0.14)] px-4 py-4 pointer-events-auto">
            <div className="flex gap-3 items-center">
              <Button
                variant="outline"
                className="flex-1 h-14 rounded-full border-[1.4px] border-[#d6deea] text-[#0b2645] bg-white font-semibold text-[15px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] hover:bg-white flex items-center justify-center"
                onClick={() => window.history.back()}
              >
                Need Help
              </Button>
              <Button
                className="flex-1 h-14 rounded-full bg-[#0b2645] text-white hover:bg-[#0b2645]/90 font-semibold text-[15px] flex items-center justify-center"
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
