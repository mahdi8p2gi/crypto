import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'glass' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'left',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
  const variants = {
    primary: 'bg-primary text-slate-950 hover:bg-primary-hover font-semibold shadow-lg shadow-primary/15 hover:shadow-primary/25',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-850 dark:hover:bg-slate-800 border border-slate-700/50 dark:border-slate-700',
    outline: 'border border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900',
    glass: 'glass-panel text-slate-800 dark:text-white hover:bg-white/90 dark:hover:bg-card-dark/95 border border-white/20 dark:border-white/5 shadow-sm',
    danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/10'
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base'
  };

  return (
    <motion.button
      whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
      whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : null}
      
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="mr-2 inline-flex">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {!isLoading && icon && iconPosition === 'left' && (
        <span className="ml-2 inline-flex">{icon}</span>
      )}
    </motion.button>
  );
};
