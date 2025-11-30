import { useState, useCallback } from 'react';

export type SwipeDirection = 'left' | 'right';

interface UseSwipeCardOptions {
  disabled?: boolean;
  onSwipe: (direction: SwipeDirection) => void;
}

export function useSwipeCard({ disabled = false, onSwipe }: UseSwipeCardOptions) {
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [disabled]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (disabled || !dragStart) return;
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setDragOffset({ x: deltaX, y: deltaY });
    },
    [disabled, dragStart]
  );

  const onPointerUp = useCallback(() => {
    if (!dragStart) return;

    const SWIPE_THRESHOLD = 100;
    if (Math.abs(dragOffset.x) > SWIPE_THRESHOLD) {
      const direction: SwipeDirection = dragOffset.x > 0 ? 'right' : 'left';
      onSwipe(direction);
    }

    setDragStart(null);
    setDragOffset({ x: 0, y: 0 });
  }, [dragStart, dragOffset, onSwipe]);

  return {
    dragStart,
    dragOffset,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
