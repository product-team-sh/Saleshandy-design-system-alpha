'use client';

import React from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { AttentionItem } from '@/mock/dashboard';

interface AttentionRequiredProps {
  items: AttentionItem[];
}

const severityDotColors: Record<string, string> = {
  urgent: 'bg-red-500',
  warning: 'bg-yellow-500',
  info: 'bg-primary-500',
  neutral: 'bg-sand-400',
};

export function AttentionRequired({ items }: AttentionRequiredProps) {
  if (items.length === 0) return null;

  return (
    <div className="bg-white border border-sand-200 rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
          <h3 className="text-lg font-semibold text-sand-800">Needs Your Attention</h3>
        </div>
      </div>
      <div className="space-y-0">
        {items.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              'flex items-center justify-between py-3',
              i < items.length - 1 && 'border-b border-sand-100'
            )}
          >
            <div className="flex items-center gap-3">
              <span className={cn('w-2 h-2 rounded-full shrink-0', severityDotColors[item.severity])} />
              <span className="text-base text-sand-800">{item.message}</span>
            </div>
            <Link
              href={item.actionHref}
              className="text-base font-medium text-primary-700 hover:text-primary-800 shrink-0"
            >
              {item.actionLabel}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
