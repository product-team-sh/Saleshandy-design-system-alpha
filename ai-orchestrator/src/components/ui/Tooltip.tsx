'use client';

import React, { useCallback, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

export interface TooltipProps {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  theme?: 'dark' | 'white';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const positionClasses: Record<NonNullable<TooltipProps['position']>, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
};

const themeClasses: Record<NonNullable<TooltipProps['theme']>, string> = {
  dark: 'bg-ocean-800 text-white rounded-sm',
  white: 'bg-white text-sand-800 rounded-md shadow-lg border border-sand-200',
};

const sizeClasses: Record<NonNullable<TooltipProps['size']>, string> = {
  sm: 'p-1 px-2 text-sm max-w-[200px]',
  md: 'p-2 px-3 text-sm max-w-[320px]',
};

export function Tooltip({
  content,
  position = 'top',
  theme = 'dark',
  size = 'sm',
  children,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    clearTimers();
    showTimerRef.current = setTimeout(() => {
      setVisible(true);
    }, 200);
  }, [clearTimers]);

  const handleMouseLeave = useCallback(() => {
    clearTimers();
    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, 100);
  }, [clearTimers]);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 whitespace-normal pointer-events-none',
            positionClasses[position],
            themeClasses[theme],
            sizeClasses[size]
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
