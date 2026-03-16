'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  fieldColor?: 'white' | 'grey';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const sizeClasses: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'h-8 px-2 text-sm',
  md: 'h-9 px-3 text-base',
  lg: 'h-10 px-4 text-base',
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      fieldColor = 'white',
      size = 'md',
      leftIcon,
      rightIcon,
      disabled,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();

    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {label && (
          <label htmlFor={inputId} className="text-base font-medium text-sand-800">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sand-400 pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error || undefined}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={cn(
              'w-full rounded-sm border font-normal text-sand-800 placeholder:text-sand-400 transition-colors duration-150',
              'focus:outline-none focus:border-primary-700 focus:shadow-focused',
              'hover:border-sand-300',
              sizeClasses[size],
              fieldColor === 'grey' ? 'bg-sand-50' : 'bg-white',
              error
                ? 'border-red-700'
                : success
                  ? 'border-green-700'
                  : 'border-sand-200',
              disabled && 'bg-sand-50 text-sand-400 cursor-not-allowed hover:border-sand-200',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9'
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-400 pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-700" role="alert">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-sm text-sand-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
