'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { useChatStore } from '@/stores/useChatStore';
import { handleUserMessage } from '@/lib/mock-ai';

const CHIP_STYLES = [
  'border-ocean-300 bg-ocean-50 text-ocean-700 hover:bg-ocean-500 hover:text-white hover:border-ocean-500',
  'border-mint-dark bg-mint-soft text-mint-dark hover:bg-mint hover:text-white hover:border-mint-dark',
  'border-lavender bg-lavender-soft text-lavender-dark hover:bg-lavender hover:text-white hover:border-lavender-dark',
  'border-amber text-amber-dark bg-amber-soft hover:bg-amber hover:text-sand-900 hover:border-amber-dark',
];

interface FloatingChipsProps {
  options: string[];
  campaignId: string;
}

export function FloatingChips({ options, campaignId }: FloatingChipsProps) {
  const [mounted, setMounted] = useState(false);
  const addUserMessage = useChatStore((s) => s.addUserMessage);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleClick = (option: string) => {
    addUserMessage(campaignId, option);
    handleUserMessage(campaignId, option);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center px-4 pb-2 pt-1">
      {options.map((option, i) => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          className={cn(
            'text-xs font-semibold px-3.5 py-1.5 rounded-full border',
            'shadow-xs hover:shadow-sm',
            'active:scale-95',
            CHIP_STYLES[i % CHIP_STYLES.length]
          )}
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0px)' : 'translateY(14px)',
            transition: `opacity 300ms, transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)`,
            transitionDelay: `${i * 55}ms`,
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
