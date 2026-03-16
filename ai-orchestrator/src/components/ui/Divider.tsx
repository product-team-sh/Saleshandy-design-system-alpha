'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'bg-sand-200',
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full',
        className
      )}
    />
  );
}
