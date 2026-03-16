'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: IconComponent,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center text-center p-12', className)}>
      {IconComponent && (
        <IconComponent className="w-12 h-12 text-sand-300 mx-auto" />
      )}
      <h3 className="text-lg font-semibold text-sand-800 mt-4">{title}</h3>
      {description && (
        <p className="text-base text-sand-500 mt-2 max-w-sm mx-auto">{description}</p>
      )}
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button variant="primary" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
