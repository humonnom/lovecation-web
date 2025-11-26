import { motion } from 'motion/react';
import * as React from 'react';

type Props = {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  className?: string;
};

const AnimatedText = ({ children, as = 'p', ...rest }: Props) => {
  const TextComponent = motion[as];
  return (
    <TextComponent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      {...rest}
    >
      {children}
    </TextComponent>
  );
};

export default AnimatedText;
