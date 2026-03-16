'use client';

import React from 'react';
import { cn } from '@/lib/cn';

const SUGGESTIONS_BY_STATUS: Record<string, string[]> = {
  active: [
    'Review 3 pending prospects',
    'Open rate dropped — adjust subject lines?',
    'Replicate this campaign for EMEA',
    'Show me top-performing emails',
  ],
  planning: [
    'Suggest target audience',
    'Show me similar campaigns',
    'Help me define my ICP',
  ],
  review: [
    'Approve the plan',
    'Adjust messaging tone',
    'Change channel strategy',
  ],
  default: [
    'Help me get started',
    'What can you do?',
    'Show campaign templates',
  ],
};

interface AiSuggestionChipsProps {
  campaignStatus?: string;
  onSelect: (suggestion: string) => void;
}

export function AiSuggestionChips({ campaignStatus, onSelect }: AiSuggestionChipsProps) {
  const suggestions = SUGGESTIONS_BY_STATUS[campaignStatus ?? ''] ?? SUGGESTIONS_BY_STATUS.default;

  return (
    <div className="flex gap-1.5 overflow-x-auto px-3 py-2 scrollbar-none">
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className={cn(
            'flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors',
            'border-primary-200 text-primary-700 bg-primary-50',
            'hover:bg-primary-100 hover:border-primary-300'
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
