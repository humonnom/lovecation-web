import React from 'react';
import { useSwipeCard, SwipeDirection } from '@/hooks/useSwipeCard';

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
  const { dragStart, dragOffset, onPointerDown, onPointerMove, onPointerUp } = useSwipeCard({
    disabled: flipped,
    onSwipe,
  });

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
        isCurrent
          ? `z-10 ${
              direction === 'left'
                ? '-translate-x-full opacity-0 rotate-[-30deg]'
                : direction === 'right'
                  ? 'translate-x-full opacity-0 rotate-[30deg]'
                  : ''
            }`
          : 'z-0'
      }`}
      style={{
        perspective: '1000px',
        transform:
          isCurrent && dragStart
            ? `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`
            : isBackground
              ? direction !== null
                ? 'scale(1)'
                : 'scale(0.92)'
              : undefined,
        filter: isBackground && direction === null ? 'blur(4px)' : 'blur(0px)',
        opacity: isBackground && direction === null ? 0.6 : 1,
      }}
      onPointerDown={isCurrent ? onPointerDown : undefined}
      onPointerMove={isCurrent ? onPointerMove : undefined}
      onPointerUp={isCurrent ? onPointerUp : undefined}
      onPointerCancel={isCurrent ? onPointerUp : undefined}
   >
      {/* Card Container with 3D flip */}
      <div
        className={`relative h-full max-h-full aspect-[2/3] w-auto max-w-[92vw] transition-transform duration-700 ${
          isCurrent ? 'cursor-pointer touch-none' : 'pointer-events-none'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: isCurrent && flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
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
        <div
          onClick={() => {
            // prevent bubbling issues for nested buttons in front face
          }}
        >
          {front}
        </div>
        {back}
      </div>
    </div>
  );
}
