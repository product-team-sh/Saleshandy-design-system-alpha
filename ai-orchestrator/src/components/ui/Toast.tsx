'use client';

import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Spinner } from './Spinner';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastProps {
  type?: 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'loading';
  message: string;
  action?: ToastAction;
  onDismiss?: () => void;
}

const typeStyles: Record<NonNullable<ToastProps['type']>, string> = {
  success: 'bg-green-100 border-green-200',
  error: 'bg-red-100 border-red-200',
  warning: 'bg-yellow-100 border-yellow-200',
  info: 'bg-primary-100 border-primary-200',
  neutral: 'bg-sand-100 border-sand-200',
  loading: 'bg-sand-100 border-sand-200',
};

const iconMap: Record<string, React.ReactNode> = {
  success: <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />,
  error: <XCircle className="w-5 h-5 text-red-700 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-700 shrink-0" />,
  info: <Info className="w-5 h-5 text-primary-700 shrink-0" />,
};

export function Toast({
  type = 'neutral',
  message,
  action,
  onDismiss,
}: ToastProps) {
  const icon =
    type === 'loading' ? (
      <Spinner size="md" className="text-sand-500 shrink-0" />
    ) : (
      iconMap[type] || null
    );

  return (
    <div
      role="alert"
      className={cn(
        'inline-flex items-center gap-3 p-2 px-4 rounded-sm border text-base text-sand-800',
        typeStyles[type]
      )}
    >
      {icon}
      <span className="flex-1">{message}</span>
      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className="text-sm font-medium text-primary-700 hover:text-primary-800 shrink-0"
        >
          {action.label}
        </button>
      )}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-sand-400 hover:text-sand-600 shrink-0"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
