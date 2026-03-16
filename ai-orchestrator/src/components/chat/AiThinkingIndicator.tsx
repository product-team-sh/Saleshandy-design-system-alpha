'use client';

import React from 'react';
import { cn } from '@/lib/cn';

export function AiThinkingIndicator() {
  return (
    <div className="flex gap-3 justify-start animate-fade-up">
      {/* AI avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base',
          'bg-ocean-500 border-2 border-sand-300 shadow-sm'
        )}
        aria-hidden
      >
        🐙
      </div>
      {/* Bouncing dots in a sticker card */}
      <div
        className={cn(
          'bg-white border-2 border-sand-300 rounded-2xl rounded-tl-sm px-5 py-3.5',
          'flex items-center gap-2 shadow-xs'
        )}
      >
        <div className="w-2 h-2 rounded-full bg-ocean-500 animate-typing-dot" />
        <div className="w-2 h-2 rounded-full bg-pink-500 animate-typing-dot-2" />
        <div className="w-2 h-2 rounded-full bg-amber animate-typing-dot-3" />
      </div>
    </div>
  );
}
