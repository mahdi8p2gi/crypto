import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.5,
  className = ''
}) => {
  const getDirections = () => {
    switch (direction) {
      case 'up':
        return { y: 25, x: 0 };
      case 'down':
        return { y: -25, x: 0 };
      case 'left':
        return { y: 0, x: 25 };
      case 'right':
        return { y: 0, x: -25 };
      default:
        return { y: 0, x: 0 };
    }
  };

  const { x, y } = getDirections();

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
