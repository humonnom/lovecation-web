import { BouncingSpeechBubble, type BouncingSpeechBubbleProps } from './BouncingSpeechBubble';
import { useHint } from '@/hooks/useHint';

interface HintBubbleProps extends BouncingSpeechBubbleProps{
  condition: boolean;
  dismissCondition?: boolean;
  delay?: number;
}

export function HintBubble({
  condition,
  dismissCondition,
  delay = 1000,
  text,
  position,
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
