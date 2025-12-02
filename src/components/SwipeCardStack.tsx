import { useState, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, AnimatePresence } from 'framer-motion';

interface Card<T = any> {
  id: string;
  data: T;
}

interface SwipeCardStackProps<T> {
  cards: Card<T>[];
  onSwipe?: (direction: 'left' | 'right', card: Card<T>) => void;
  renderCard: (card: Card<T>, index: number) => ReactNode;
}

const SwipeCardStack = <T,>({ cards, onSwipe, renderCard }: SwipeCardStackProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const visibleCards = cards.slice(currentIndex, currentIndex + 3);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= cards.length) return;
    
    setExitDirection(direction);
    onSwipe?.(direction, cards[currentIndex]);
    
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
      setExitDirection(null);
    }, 200);
  };

  return (
    <div className="relative w-full h-[280px] flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        {visibleCards.map((card, index) => (
          <SwipeCard
            key={card.id}
            card={card}
            index={index}
            totalVisible={visibleCards.length}
            onSwipe={handleSwipe}
            isTop={index === 0}
            exitDirection={index === 0 ? exitDirection : null}
          >
            {renderCard(card, currentIndex + index)}
          </SwipeCard>
        ))}
      </AnimatePresence>
      
      {/* Navigation dots */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {cards.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex % cards.length
                ? 'bg-slate-700 w-4'
                : 'bg-slate-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

interface SwipeCardProps {
  card: Card;
  index: number;
  totalVisible: number;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
  exitDirection: 'left' | 'right' | null;
  children: ReactNode;
}

const SwipeCard = ({ card, index, onSwipe, isTop, exitDirection, children }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  
  const scale = 1 - index * 0.05;
  const yOffset = index * 12;
  const zIndex = 10 - index;
  const baseRotation = index * 2;

  const handleDragEnd = (_: any, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  const exitX = exitDirection === 'left' ? -300 : exitDirection === 'right' ? 300 : 0;
  const exitRotate = exitDirection === 'left' ? -30 : exitDirection === 'right' ? 30 : 0;

  return (
    <motion.div
      className="absolute w-full max-w-[340px] cursor-grab active:cursor-grabbing"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : baseRotation,
        scale,
        y: yOffset,
        zIndex,
        opacity: isTop ? opacity : 1 - index * 0.15,
      }}
      initial={{ scale: 0.9, y: 50, opacity: 0 }}
      animate={{
        scale,
        y: yOffset,
        opacity: 1 - index * 0.15,
        rotate: baseRotation,
      }}
      exit={{
        x: exitX,
        rotate: exitRotate,
        opacity: 0,
        transition: { duration: 0.2 }
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div 
        className="rounded-2xl overflow-hidden shadow-xl"
        style={{
          boxShadow: `0 ${10 + index * 5}px ${30 + index * 10}px -10px rgba(0,0,0,${0.15 - index * 0.03})`,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default SwipeCardStack;
