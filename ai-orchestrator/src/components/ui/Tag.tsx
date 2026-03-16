'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface TagProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'ai';
  onRemove?: () => void;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<NonNullable<TagProps['variant']>, string> = {
  default: 'bg-sand-100 text-sand-700 border-sand-200',
  primary: 'bg-primary-100 text-primary-700 border-primary-200',
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  error: 'bg-red-100 text-red-700 border-red-200',
  ai: 'bg-purple-100 text-purple-700 border-purple-200',
};

export function Tag({
  variant = 'default',
  onRemove,
  children,
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-sm border text-sm px-2 py-0.5',
        variantClasses[variant],
        className
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center justify-center shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Remove"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
