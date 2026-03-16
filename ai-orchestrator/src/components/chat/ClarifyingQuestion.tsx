'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { useChatStore } from '@/stores/useChatStore';
import { handleUserMessage } from '@/lib/mock-ai';

interface ClarifyingQuestionProps {
  options: string[];
  campaignId: string;
  messageId: string;
}

// Cycle through the accent colors for a confetti effect
const CHIP_STYLES = [
  'border-purple-400 bg-pg-accent-light text-purple-700 hover:bg-pg-accent hover:text-white hover:border-pg-border-dark',
  'border-pink-400 bg-pg-pink-light text-pink-700 hover:bg-pg-pink hover:text-white hover:border-pg-border-dark',
  'border-yellow-400 bg-pg-amber-light text-yellow-700 hover:bg-pg-amber hover:text-pg-fg hover:border-pg-border-dark',
  'border-emerald-400 bg-pg-emerald-light text-emerald-700 hover:bg-pg-emerald hover:text-white hover:border-pg-border-dark',
];

export function ClarifyingQuestion({ options, campaignId }: ClarifyingQuestionProps) {
  const addUserMessage = useChatStore((s) => s.addUserMessage);

  const handleClick = (option: string) => {
    addUserMessage(campaignId, option);
    handleUserMessage(campaignId, option);
  };

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {options.map((option, i) => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          className={cn(
            'text-xs font-bold px-3.5 py-1.5 rounded-full border-2',
            'shadow-pop-sm',
            'hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-pop',
            'active:translate-x-[1px] active:translate-y-[1px] active:shadow-none',
            'transition-all duration-200',
            CHIP_STYLES[i % CHIP_STYLES.length]
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
