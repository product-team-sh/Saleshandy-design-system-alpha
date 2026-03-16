'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export interface AvatarProps {
  name?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0]?.[0] || '').toUpperCase();
}

export function Avatar({ name = '', src, size = 'md', className }: AvatarProps) {
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        'rounded-full bg-primary-100 text-primary-700 font-medium inline-flex items-center justify-center overflow-hidden shrink-0',
        sizeClasses[size],
        className
      )}
      aria-label={name || undefined}
    >
      {src ? (
        <img
          src={src}
          alt={name || 'Avatar'}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
