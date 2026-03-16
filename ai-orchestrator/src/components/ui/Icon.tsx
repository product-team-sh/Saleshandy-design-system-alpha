'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface IconProps {
  name: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const sizeClasses: Record<NonNullable<IconProps['size']>, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function Icon({ name: IconComponent, size = 'md', color, className }: IconProps) {
  return (
    <IconComponent
      className={cn(sizeClasses[size], className)}
      style={color ? { color } : undefined}
    />
  );
}
