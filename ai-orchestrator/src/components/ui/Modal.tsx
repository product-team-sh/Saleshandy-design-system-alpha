'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-[400px]',
  md: 'max-w-[600px]',
  lg: 'max-w-[800px]',
};

export function Modal({
  open,
  onClose,
  title,
  size = 'md',
  children,
  footer,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        className={cn(
          'relative w-full bg-white rounded-md shadow-xl p-6 mx-4',
          sizeClasses[size],
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between mb-4">
            <h2 id="modal-title" className="text-lg font-semibold text-sand-800">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-sand-400 hover:text-sand-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        {!title && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-sand-400 hover:text-sand-600 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        <div>{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 mt-6">{footer}</div>
        )}
      </div>
    </div>
  );
}
