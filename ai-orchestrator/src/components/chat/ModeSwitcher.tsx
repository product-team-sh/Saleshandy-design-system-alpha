'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { useUiStore, type ChatMode } from '@/stores/useUiStore';
import { MessageCircle, Map, Zap } from 'lucide-react';

const MODES: {
  key: ChatMode;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  description: string;
  color: string;
  activeColor: string;
  activeBg: string;
  dotColor: string;
}[] = [
  {
    key: 'ask',
    label: 'Ask Mode',
    shortLabel: 'Ask',
    icon: MessageCircle,
    description: 'Conversational — AI asks clarifying questions before acting',
    color: 'text-ocean-500',
    activeColor: 'text-ocean-600',
    activeBg: 'bg-ocean-50 border-ocean-300',
    dotColor: 'bg-ocean-400',
  },
  {
    key: 'plan',
    label: 'Plan Mode',
    shortLabel: 'Plan',
    icon: Map,
    description: 'Strategic — AI builds a step-by-step plan for your approval',
    color: 'text-amber-600',
    activeColor: 'text-amber-700',
    activeBg: 'bg-amber-50 border-amber-300',
    dotColor: 'bg-amber-400',
  },
  {
    key: 'execute',
    label: 'Execute Mode',
    shortLabel: 'Execute',
    icon: Zap,
    description: 'Autonomous — AI takes action immediately with live progress',
    color: 'text-green-600',
    activeColor: 'text-green-700',
    activeBg: 'bg-green-50 border-green-300',
    dotColor: 'bg-green-500',
  },
];

export function ModeSwitcher() {
  const { chatMode, setChatMode } = useUiStore();

  return (
    <div className="flex items-center gap-1 p-0.5 rounded-xl bg-sand-100 border border-sand-200">
      {MODES.map((mode) => {
        const isActive = chatMode === mode.key;
        const Icon = mode.icon;
        return (
          <button
            key={mode.key}
            onClick={() => setChatMode(mode.key)}
            title={mode.description}
            className={cn(
              'relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
              isActive
                ? cn('bg-white border shadow-sm', mode.activeBg, mode.activeColor)
                : 'border border-transparent text-sand-500 hover:text-sand-700 hover:bg-sand-50'
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{mode.shortLabel}</span>
            {isActive && (
              <span className={cn('w-1.5 h-1.5 rounded-full animate-pulse', mode.dotColor)} />
            )}
          </button>
        );
      })}
    </div>
  );
}

export function ModeIndicator() {
  const chatMode = useUiStore((s) => s.chatMode);
  const current = MODES.find((m) => m.key === chatMode)!;
  const Icon = current.icon;

  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-all duration-200',
      current.activeBg, current.activeColor
    )}>
      <Icon className="w-3 h-3" />
      <span>{current.label}</span>
      <span className={cn('w-1.5 h-1.5 rounded-full', current.dotColor, chatMode === 'execute' && 'animate-pulse')} />
    </div>
  );
}

export function ModeDescription() {
  const chatMode = useUiStore((s) => s.chatMode);
  const current = MODES.find((m) => m.key === chatMode)!;

  const hints: Record<ChatMode, string> = {
    ask: 'I\'ll ask questions to understand your needs before suggesting anything.',
    plan: 'I\'ll create a detailed plan for your review before taking any action.',
    execute: 'I\'ll take action right away. You\'ll see real-time progress updates.',
  };

  return (
    <p className={cn('text-[11px] font-medium', current.activeColor)}>
      {hints[chatMode]}
    </p>
  );
}
