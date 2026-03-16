'use client';

import React from 'react';
import { cn } from '@/lib/cn';

interface InlineWarningProps {
  content: string;
  level: 'soft' | 'hard';
}

export function InlineWarning({ content, level }: InlineWarningProps) {
  return (
    <div
      className={cn(
        'rounded-sm p-3',
        level === 'soft' && 'bg-yellow-50 border border-yellow-300',
        level === 'hard' &&
          'bg-ocean-900 border border-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]'
      )}
    >
      <div className="flex items-start gap-2">
        <svg
          className={cn(
            'w-4 h-4 mt-0.5 flex-shrink-0',
            level === 'soft' ? 'text-yellow-500' : 'text-red-400'
          )}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        <p
          className={cn(
            'text-sm',
            level === 'soft' ? 'text-sand-800' : 'text-white'
          )}
        >
          {content}
        </p>
      </div>
      {level === 'hard' && (
        <button className="mt-3 px-3 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-500 rounded-sm hover:from-purple-700 hover:to-purple-600 transition-all">
          Allow AI to Rewrite
        </button>
      )}
    </div>
  );
}
