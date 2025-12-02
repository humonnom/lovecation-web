import { AnimatePresence, motion } from 'motion/react';
import { ReactNode, useState } from 'react';

type Props = { front: ReactNode; back: ReactNode };

const cardStyle = 'absolute inset-0 bg-white rounded-3xl shadow-2xl overflow-hidden';
export default function FlipCard({ front, back }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <AnimatePresence>
      {!isFlipped && (
        <motion.div
          onClick={() => setIsFlipped(true)}
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 1,
            rotateY: 180,
          }}
          exit={{
            opacity: 0,
          }}
          className={cardStyle}
        >
          {front}
        </motion.div>
      )}
      {/*<div className={cardStyle}>{back}</div>*/}
    </AnimatePresence>
  );
}
