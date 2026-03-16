'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: 'sm' | 'md' | 'full';
}

const roundedClasses: Record<NonNullable<SkeletonProps['rounded']>, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  full: 'rounded-full',
};

export function Skeleton({
  width,
  height,
  className,
  rounded = 'sm',
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-shimmer',
        roundedClasses[rounded],
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      aria-hidden="true"
    />
  );
}
