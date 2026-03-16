'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

export interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  fieldColor?: 'white' | 'grey';
  size?: 'sm' | 'md' | 'lg';
  maxLength?: number;
  autoResize?: boolean;
}

const sizeClasses: Record<NonNullable<TextAreaProps['size']>, string> = {
  sm: 'p-2 text-sm min-h-[64px]',
  md: 'p-3 text-base min-h-[80px]',
  lg: 'p-4 text-base min-h-[120px]',
};

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error,
      success,
      fieldColor = 'white',
      size = 'md',
      maxLength,
      autoResize = false,
      disabled,
      className,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const setRefs = useCallback(
      (node: HTMLTextAreaElement | null) => {
        internalRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
        }
      },
      [ref]
    );

    const adjustHeight = useCallback(() => {
      if (autoResize && internalRef.current) {
        internalRef.current.style.height = 'auto';
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    }, [autoResize]);

    useEffect(() => {
      adjustHeight();
    }, [value, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e);
      adjustHeight();
    };

    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('flex flex-col gap-2', className)}>
        {label && (
          <label htmlFor={inputId} className="text-base font-medium text-sand-800">
            {label}
          </label>
        )}
        <textarea
          ref={setRefs}
          id={inputId}
          disabled={disabled}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          aria-invalid={!!error || undefined}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className={cn(
            'w-full rounded-sm border font-normal text-sand-800 placeholder:text-sand-400 transition-colors duration-150 resize-vertical',
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
            autoResize && 'resize-none overflow-hidden'
          )}
          {...props}
        />
        <div className="flex justify-between gap-2">
          <div>
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
          {maxLength !== undefined && (
            <span className="text-sm text-sand-400 shrink-0">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
