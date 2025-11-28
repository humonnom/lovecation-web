import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { BouncingSpeechBubble } from '@/components/common/BouncingSpeechBubble';
import type { SuggestedMessage } from '@/types/chat';
import { Z_INDEX } from '@/constants/zIndex';

interface AISuggestionOverlayProps {
  suggestions: SuggestedMessage[];
  selectedSuggestion: string | null;
  onSuggestionClick: (suggestion: SuggestedMessage) => void;
}

export function AISuggestionOverlay({
  suggestions,
  selectedSuggestion,
  onSuggestionClick,
}: AISuggestionOverlayProps) {
  return (
    <div
      className={`absolute inset-0 ${Z_INDEX.OVERLAY} bg-background/95 backdrop-blur-sm flex items-center justify-center p-6`}
    >
      <div className="w-full max-w-md">
        {/* 헤더 */}
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Sparkles size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">AI가 추천하는 첫 메시지</h2>
          <p className="text-base text-text-secondary">사쿠라님과의 대화를 시작해보세요!</p>
        </motion.div>

        {/* 추천 문구 카드들 */}
        <div className="space-y-3 relative">
          {/* 데모 안내 말풍선 */}
          <BouncingSpeechBubble
            text="메세지를 선택해보세요!"
            position="left"
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10"
          />

          {suggestions.map((suggestion) => (
            <motion.button
              key={suggestion.id}
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSuggestionClick(suggestion)}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                selectedSuggestion === suggestion.text
                  ? 'border-primary bg-primary/5 shadow-lg'
                  : 'border-border bg-background hover:border-primary/50 hover:shadow-md'
              }`}
            >
              <p className="text-[15px] font-medium text-foreground mb-1">{suggestion.text}</p>
              <p className="text-sm text-text-secondary">{suggestion.translation}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
