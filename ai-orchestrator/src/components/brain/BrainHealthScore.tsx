'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import type { KnowledgeCard } from '@/types/brain';

interface BrainHealthScoreProps {
  score: number;
  cards?: KnowledgeCard[];
}

export function BrainHealthScore({ score, cards }: BrainHealthScoreProps) {
  const color =
    score >= 80 ? 'text-green-600 bg-green-50 border-green-200' :
    score >= 50 ? 'text-yellow-700 bg-yellow-50 border-yellow-200' :
    'text-red-600 bg-red-50 border-red-200';

  const barColor =
    score >= 80 ? 'bg-green-500' :
    score >= 50 ? 'bg-yellow-400' :
    'bg-red-500';

  const message =
    score >= 80 ? 'Your AI is well-equipped to run outreach.' :
    score >= 50 ? 'Good foundation — add a few more knowledge areas to improve accuracy.' :
    'Your AI needs more information to perform well. Complete the sections below.';

  return (
    <div className={cn('border rounded-lg p-4', color)}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-base font-semibold">Brain Health Score: {score}%</span>
          <p className="text-base mt-0.5 opacity-90">{message}</p>
        </div>
        <div className="text-5xl font-bold shrink-0 ml-4">{score}%</div>
      </div>
      <div className="h-2 bg-white/60 rounded-full overflow-hidden mb-3">
        <div
          className={cn('h-full rounded-full transition-all duration-500', barColor)}
          style={{ width: `${score}%` }}
        />
      </div>
      {cards && cards.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 pt-2 border-t border-current/10">
          {cards.map((card) => (
            <div key={card.id} className="flex items-center gap-2">
              <div className="w-full max-w-[60px] h-1.5 bg-white/60 rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full',
                    card.completeness >= 80 ? 'bg-green-500' :
                    card.completeness >= 40 ? 'bg-yellow-400' :
                    card.completeness > 0 ? 'bg-red-400' : 'bg-sand-300'
                  )}
                  style={{ width: `${card.completeness}%` }}
                />
              </div>
              <span className="text-[11px] truncate opacity-80">{card.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
