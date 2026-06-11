import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'outline' | 'gradient';
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = false,
  padding = 'md',
  className,
  ...props
}) => {
  const baseStyles = 'rounded-2xl overflow-hidden transition-all duration-300';
  
  const variants = {
    default: 'bg-white dark:bg-card-dark border border-slate-100 dark:border-border-dark shadow-sm dark:shadow-none',
    glass: 'glass-panel shadow-sm dark:shadow-none',
    outline: 'border border-slate-200 dark:border-border-dark bg-transparent',
    gradient: 'bg-gradient-to-br from-white to-slate-50 dark:from-card-dark dark:to-bg-dark border border-slate-100 dark:border-border-dark shadow-md'
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, boxShadow: '0 12px 30px -10px rgba(0,0,0,0.1)' } : {}}
      className={cn(baseStyles, variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </motion.div>
  );
};
