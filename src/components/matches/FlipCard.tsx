import { AnimatePresence, motion } from 'motion/react';
import { ReactNode, useState } from 'react';
import { clsx } from 'clsx';

type Props = { front: ReactNode; back: ReactNode };

export default function FlipCard({ front, back }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div className={'perspective-distant w-full h-full relative'}>
      <motion.div
        animate={isFlipped ? { rotateY: 180 } : { rotateY: 0 }}
        style={{
          willChange: 'transform',
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className={'absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden transform-3d'}
        onClick={() => setIsFlipped((v) => !v)}
      >
        <div
          className={clsx(
            'absolute inset-0 transform-gpu',
            isFlipped ? 'pointer-events-none' : 'pointer-events-auto'
          )}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {front}
        </div>
        <div
          className={clsx(
            'absolute inset-0 transform-gpu',
            'rotate-y-180',
            isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
          )}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {back}
        </div>
      </motion.div>
    </motion.div>
  );
}
