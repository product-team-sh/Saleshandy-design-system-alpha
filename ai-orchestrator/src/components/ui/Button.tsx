'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { Spinner } from './Spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'primary-outline'
    | 'secondary'
    | 'tertiary'
    | 'primary-text'
    | 'primary-link'
    | 'secondary-text'
    | 'secondary-link'
    | 'error'
    | 'ai';
  size?: 'sm' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary-700 text-white hover:bg-primary-800 active:bg-primary-900',
  'primary-outline':
    'bg-transparent text-primary-700 border border-primary-700 hover:bg-primary-100',
  secondary: 'bg-transparent text-sand-500 border border-sand-200 hover:bg-sand-100',
  tertiary: 'bg-transparent text-sand-500 hover:bg-sand-100',
  'primary-text': 'text-primary-700 hover:text-primary-800',
  'primary-link': 'text-primary-700 underline hover:text-primary-800',
  'secondary-text': 'text-sand-500 hover:text-sand-600',
  'secondary-link': 'text-sand-500 underline hover:text-sand-600',
  error: 'bg-red-700 text-white hover:bg-red-800',
  ai: 'bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-700 hover:to-purple-600',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  lg: 'px-5 py-2',
  sm: 'px-3 py-1.5',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'lg',
      loading = false,
      disabled = false,
      leftIcon,
      rightIcon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-sm text-base font-medium transition-colors duration-150',
          'focus-visible:outline-none focus-visible:shadow-focused',
          variantClasses[variant],
          sizeClasses[size],
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        {loading ? (
          <Spinner size="sm" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
