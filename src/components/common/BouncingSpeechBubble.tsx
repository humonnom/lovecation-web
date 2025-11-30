import { motion } from 'motion/react';

type BubblePosition = 'left' | 'right' | 'top' | 'bottom' | 'bottom-right';

export interface BouncingSpeechBubbleProps {
  text: string;
  position?: BubblePosition;
  className?: string;
}

export function BouncingSpeechBubble({
  text,
  position = 'left',
  className = '',
}: BouncingSpeechBubbleProps) {
  // 말풍선 꼬리 방향에 따른 위치 설정
  const tailPositions = {
    left: 'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2',
    right: 'absolute right-0 top-1/2 -translate-y-1/2 translate-x-2',
    top: 'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2',
    bottom: 'absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2',
    'bottom-right': 'absolute bottom-0 right-0 -translate-x-1/2 translate-y-2',
  };

  // 말풍선 꼬리 border 스타일
  const tailStyles = {
    left: 'border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[12px] border-r-primary',
    right:
      'border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[12px] border-l-primary',
    top: 'border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-primary',
    bottom:
      'border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-primary',
    'bottom-right':
      'border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-primary',
  };

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: [0, 3, 0],
        y: [0, -3, 0],
        opacity: 1,
      }}
      transition={{
        x: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        },
        y: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        },
      }}
      className={className}
    >
      <div className="relative">
        {/* 말풍선 본체 */}
        <div className="bg-primary text-white px-3 py-2 rounded-xl shadow-lg whitespace-nowrap">
          <p className="text-xs font-medium">{text}</p>
        </div>
        {/* 말풍선 꼬리 */}
        <div className={tailPositions[position]}>
          <div className={`w-0 h-0 ${tailStyles[position]}`} />
        </div>
      </div>
    </motion.div>
  );
}
