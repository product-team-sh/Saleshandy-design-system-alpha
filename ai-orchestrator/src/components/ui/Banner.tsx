'use client';

import React from 'react';
import { Info, AlertTriangle, XCircle, CheckCircle2, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface BannerProps {
  variant?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children?: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles: Record<NonNullable<BannerProps['variant']>, string> = {
  info: 'bg-primary-50 border-primary-200 text-primary-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
};

const iconMap: Record<NonNullable<BannerProps['variant']>, React.ReactNode> = {
  info: <Info className="w-5 h-5 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 shrink-0" />,
  error: <XCircle className="w-5 h-5 shrink-0" />,
  success: <CheckCircle2 className="w-5 h-5 shrink-0" />,
};

export function Banner({
  variant = 'info',
  title,
  children,
  onDismiss,
  className,
}: BannerProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 p-4 rounded-sm border',
        variantStyles[variant],
        className
      )}
    >
      {iconMap[variant]}
      <div className="flex-1 min-w-0">
        {title && <div className="font-medium">{title}</div>}
        {children && <div className={cn(title && 'mt-1', 'text-sm')}>{children}</div>}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
