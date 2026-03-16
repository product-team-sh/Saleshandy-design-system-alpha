'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function Toggle({
  checked = false,
  onChange,
  disabled = false,
  label,
  className,
}: ToggleProps) {
  return (
    <label
      className={cn(
        'inline-flex items-center cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={cn(
          'relative w-9 h-5 rounded-full transition-colors duration-150',
          'focus-visible:outline-none focus-visible:shadow-focused',
          checked ? 'bg-primary-700' : 'bg-sand-300'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-150',
            checked && 'translate-x-4'
          )}
        />
      </button>
      {label && (
        <span className="text-base text-sand-800 ml-2">{label}</span>
      )}
    </label>
  );
}
