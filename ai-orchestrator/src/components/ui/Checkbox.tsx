'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, onChange, disabled = false, error = false, label, className }, ref) => {
    return (
      <label
        className={cn(
          'inline-flex items-center cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="sr-only peer"
          />
          <div
            className={cn(
              'w-4 h-4 rounded-sm border flex items-center justify-center transition-colors',
              'peer-focus-visible:shadow-focused',
              checked
                ? 'bg-primary-700 border-primary-700'
                : error
                  ? 'border-red-700'
                  : 'border-sand-200'
            )}
          >
            {checked && (
              <svg
                className="w-3 h-3 text-white"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        {label && (
          <span className="text-base text-sand-800 ml-2">{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
