'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export interface ProgressBarProps {
  value: number;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

const variantClasses: Record<NonNullable<ProgressBarProps['variant']>, string> = {
  primary: 'bg-primary-700',
  success: 'bg-green-700',
  warning: 'bg-yellow-500',
  error: 'bg-red-700',
};

const sizeClasses: Record<NonNullable<ProgressBarProps['size']>, string> = {
  sm: 'h-1.5',
  md: 'h-2',
};

export function ProgressBar({
  value,
  variant = 'primary',
  size = 'md',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="text-sm text-sand-500 mb-1">{clampedValue}%</div>
      )}
      <div className={cn('w-full bg-sand-100 rounded-full', sizeClasses[size])}>
        <div
          className={cn(
            'rounded-full transition-all duration-500',
            sizeClasses[size],
            variantClasses[variant]
          )}
          style={{ width: `${clampedValue}%` }}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
