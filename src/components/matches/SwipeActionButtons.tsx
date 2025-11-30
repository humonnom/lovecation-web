import { Heart, X } from 'lucide-react';

interface SwipeActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  disabled?: boolean;
}

export function SwipeActionButtons({ onPass, onLike, disabled }: SwipeActionButtonsProps) {
  return (
    <div className="pointer-events-none">
      <div className="max-w-md mx-auto flex items-center justify-center gap-4 pointer-events-auto">
        {/* Pass Button */}
        <button
          onClick={onPass}
          className="w-14 h-14 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-3xl transition-all active:scale-95"
          disabled={disabled}
        >
          <X className="w-8 h-8 text-gray-500" />
        </button>

        {/* Like Button */}
        <button
          onClick={onLike}
          className="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-3xl transition-all active:scale-95"
          disabled={disabled}
        >
          <Heart className="w-8 h-8 text-white fill-white" />
        </button>
      </div>
    </div>
  );
}
