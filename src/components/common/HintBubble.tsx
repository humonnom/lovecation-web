import { BouncingSpeechBubble } from './BouncingSpeechBubble';
import { useHint } from '@/hooks/useHint';

interface HintBubbleProps {
  condition: boolean;
  dismissCondition?: boolean;
  delay?: number;
  text: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
  className?: string; // wrapper class for positioning
}

export function HintBubble({
  condition,
  dismissCondition,
  delay = 1000,
  text,
  position = 'top',
  className = 'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-4 z-20',
}: HintBubbleProps) {
  const { showHint } = useHint({ condition, delay, dismissCondition });

  if (!showHint) return null;

  return (
    <div className={className}>
      <BouncingSpeechBubble text={text} position={position} />
    </div>
  );
}
