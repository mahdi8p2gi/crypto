import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  startIcon,
  endIcon,
  className,
  type = 'text',
  id,
  containerClassName,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-1"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {startIcon && (
          <div className="absolute right-3.5 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center justify-center">
            {startIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            'w-full px-4 py-3 bg-white dark:bg-card-dark border rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 select-all outline-none text-right',
            startIcon ? 'pr-11' : 'pr-4',
            endIcon ? 'pl-11' : 'pl-4',
            error
              ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
              : 'border-slate-200 dark:border-border-dark focus:border-primary focus:ring-primary/20 hover:border-slate-300 dark:hover:border-slate-700',
            className
          )}
          {...props}
        />

        {endIcon && (
          <div className="absolute left-3.5 text-slate-400 dark:text-slate-500 flex items-center justify-center">
            {endIcon}
          </div>
        )}
      </div>

      {error ? (
        <span className="text-xs text-red-500 mr-1 mt-0.5">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-slate-500 dark:text-slate-400 mr-1 mt-0.5">{helperText}</span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
