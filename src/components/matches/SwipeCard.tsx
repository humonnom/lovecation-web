import React from 'react';
import { motion } from 'motion/react';
import { SwipeDirection, useSwipeCard } from '@/hooks/useSwipeCard';
import { useIsMobile } from '@/hooks/useIsMobile';

interface SwipeCardProps {
  isCurrent: boolean;
  isBackground: boolean;
  direction: SwipeDirection | null;
  flipped: boolean;
  onToggleFlip: () => void;
  onSwipe: (direction: SwipeDirection) => void;
  front: React.ReactNode;
  back: React.ReactNode;
}

export function SwipeCard({
  isCurrent,
  isBackground,
  direction,
  flipped,
  onToggleFlip,
  onSwipe,
  front,
  back,
}: SwipeCardProps) {
  const isMobile = useIsMobile();
  const { dragStart, dragOffset, onPointerDown, onPointerMove, onPointerUp } = useSwipeCard({
    disabled: flipped || !isMobile,
    onSwipe,
  });

  const containerStyle = () => {
    let containerTransform: string | undefined = undefined;
    if (isCurrent && dragStart) {
      containerTransform = `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`;
    } else if (isBackground) {
      if (direction !== null) {
        containerTransform = 'scale(1)';
      } else {
        containerTransform = 'scale(0.92)';
      }
    }
    let containerFilter = 'blur(0px)';
    let containerOpacity: number | undefined = 1;
    if (isBackground && direction === null) {
      containerFilter = 'blur(4px)';
      containerOpacity = 0.6;
    }
    return { transform: containerTransform, filter: containerFilter, opacity: containerOpacity };
  };

  const getDirectionClass = () => {
    if (isCurrent) {
      switch (direction) {
        case 'left':
          return '-translate-x-full opacity-0 rotate-[-30deg]';
        case 'right':
          return 'translate-x-full opacity-0 rotate-[30deg]';
        default:
          return '';
      }
    }
  };

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${isCurrent ? 'z-10' : 'z-0'} ${getDirectionClass()}`}
      style={{
        perspective: '1000px',
        ...containerStyle(),
      }}
      onPointerDown={isCurrent ? onPointerDown : undefined}
      onPointerMove={isCurrent ? onPointerMove : undefined}
      onPointerUp={isCurrent ? onPointerUp : undefined}
      onPointerCancel={isCurrent ? onPointerUp : undefined}
    >
      {/* Card Container with 3D flip (animated via motion) */}
      <motion.div
        className={`relative h-full max-h-full aspect-[2/3] w-auto max-w-[92vw] ${isCurrent ? 'cursor-pointer touch-none' : 'pointer-events-none'}`}
        style={{
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
        transition={{ duration: 0.7 }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        onClick={
          isCurrent
            ? () => {
                if (Math.abs(dragOffset.x) < 5 && Math.abs(dragOffset.y) < 5) {
                  onToggleFlip();
                }
              }
            : undefined
        }
      >
        {/* Front face */}
        <div
          className="absolute inset-0"
          style={{
            pointerEvents: flipped ? 'none' : 'auto',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
        >
          {front}
        </div>
        {/* Back face */}
        <div
          className="absolute inset-0"
          style={{
            pointerEvents: flipped ? 'auto' : 'none',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(0)',
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}
