'use client';

import React from 'react';
import { cn } from '@/lib/cn';

interface CardBaseProps {
  selected?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: 'sm' | 'lg';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const sizeClasses: Record<NonNullable<CardBaseProps['size']>, string> = {
  sm: 'p-3 px-4',
  lg: 'p-4 px-6',
};

function CardBase({
  selected = false,
  disabled = false,
  error = false,
  size = 'lg',
  title,
  description,
  icon,
  children,
  onClick,
  className,
  indicator,
}: CardBaseProps & { indicator?: React.ReactNode }) {
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        'rounded-sm border bg-white cursor-pointer transition-all duration-150',
        'focus-visible:outline-none focus-visible:shadow-focused',
        error
          ? 'border-red-700'
          : selected
            ? 'border-primary-700'
            : 'border-sand-200 hover:border-sand-300',
        disabled && 'bg-sand-50 text-sand-400 opacity-50 cursor-not-allowed',
        sizeClasses[size],
        className
      )}
    >
      <div className="flex items-start gap-3">
        {indicator && <div className="shrink-0 mt-0.5">{indicator}</div>}
        {icon && <div className="shrink-0">{icon}</div>}
        <div className="flex-1 min-w-0">
          {title && <div className="text-base font-medium text-sand-800">{title}</div>}
          {description && <div className="text-sm text-sand-500 mt-1">{description}</div>}
          {children}
        </div>
      </div>
    </div>
  );
}

export interface RadioCardProps extends CardBaseProps {}

export function RadioCard(props: RadioCardProps) {
  return (
    <CardBase
      {...props}
      indicator={
        <div
          className={cn(
            'w-4 h-4 rounded-full border-2 flex items-center justify-center',
            props.selected ? 'border-primary-700' : 'border-sand-300'
          )}
        >
          {props.selected && (
            <div className="w-2 h-2 rounded-full bg-primary-700" />
          )}
        </div>
      }
    />
  );
}

export interface CheckCardProps extends CardBaseProps {}

export function CheckCard(props: CheckCardProps) {
  return (
    <CardBase
      {...props}
      indicator={
        <div
          className={cn(
            'w-4 h-4 rounded-sm border flex items-center justify-center',
            props.selected
              ? 'bg-primary-700 border-primary-700'
              : 'border-sand-200'
          )}
        >
          {props.selected && (
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      }
    />
  );
}
