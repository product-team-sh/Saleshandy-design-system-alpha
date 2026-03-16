'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { ChatMessage } from '@/types/chat';

interface PlanPanelProps {
  onClose: () => void;
  messages: ChatMessage[];
  campaignId: string;
}

// Derive which steps are complete from message types in conversation
function deriveSteps(messages: ChatMessage[]) {
  const types = new Set(messages.filter((m) => m.role === 'ai').map((m) => m.contentType));
  const hasPhrase = (phrase: string) =>
    messages.some((m) => m.role === 'ai' && m.content.toLowerCase().includes(phrase));

  const steps = [
    {
      id: 'goal',
      label: 'Define goal & scale',
      done: messages.some((m) => m.role === 'user'),
      icon: '🎯',
    },
    {
      id: 'icp',
      label: 'Build ICP profile',
      done: types.has('icp_card'),
      icon: '👤',
    },
    {
      id: 'leads',
      label: 'Find & qualify leads',
      done: types.has('lead_table'),
      icon: '🔍',
    },
    {
      id: 'infra',
      label: 'Email infrastructure',
      done: types.has('email_accounts_health'),
      icon: '📬',
    },
    {
      id: 'sequence',
      label: 'Create sequence',
      done: types.has('sequence_overview'),
      icon: '📋',
    },
    {
      id: 'emails',
      label: 'Write & approve emails',
      done: messages.some((m) => m.contentType === 'email_preview'),
      icon: '✉️',
    },
    {
      id: 'launch',
      label: 'Launch campaign',
      done: hasPhrase('launched') || hasPhrase('going live') || types.has('campaign_summary'),
      icon: '🚀',
    },
    {
      id: 'monitor',
      label: 'Monitor & optimize',
      done: hasPhrase('monitor') || hasPhrase('track') || hasPhrase('reporting'),
      icon: '📊',
    },
  ];

  const doneCount = steps.filter((s) => s.done).length;
  const pct = Math.round((doneCount / steps.length) * 100);

  return { steps, doneCount, pct };
}

// Get the first user goal message
function deriveGoal(messages: ChatMessage[]) {
  const first = messages.find((m) => m.role === 'user');
  if (!first) return 'Define your outreach goal';
  return first.content.length > 80 ? first.content.slice(0, 80) + '…' : first.content;
}

export function PlanPanel({ onClose, messages }: PlanPanelProps) {
  const { steps, doneCount, pct } = deriveSteps(messages);
  const goal = deriveGoal(messages);
  const currentStep = steps.find((s) => !s.done);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={cn(
          'fixed left-16 top-0 bottom-0 z-40 w-72 flex flex-col',
          'bg-white border-r-2 border-sand-300 shadow-lg',
          'animate-slide-in-left'
        )}
        style={{
          animation: 'slideInLeft 280ms cubic-bezier(0.34, 1.3, 0.64, 1) both',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-sand-200 bg-sand-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-ocean-50 border border-ocean-200 flex items-center justify-center text-sm">
              📋
            </div>
            <span className="text-sm font-bold text-sand-700">Campaign Plan</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-sand-200 transition-colors text-sand-500 hover:text-sand-700"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Goal */}
        <div className="px-4 py-3 border-b border-sand-200 bg-ocean-50/40">
          <p className="text-[10px] font-semibold text-ocean-500 uppercase tracking-wider mb-1">Goal</p>
          <p className="text-xs text-sand-700 font-medium leading-snug">{goal}</p>
        </div>

        {/* Progress */}
        <div className="px-4 py-3 border-b border-sand-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-sand-500">Progress</span>
            <span className="text-xs font-bold text-sand-700">{doneCount}/{steps.length} steps</span>
          </div>
          <div className="h-2.5 bg-sand-100 rounded-full border border-sand-200 overflow-hidden">
            <div
              className="h-full bg-ocean-500 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {steps.map((step, i) => {
            const isCurrent = step.id === currentStep?.id;
            return (
              <div
                key={step.id}
                className={cn(
                  'flex items-start gap-2.5 p-2.5 rounded-xl border transition-all duration-200',
                  step.done
                    ? 'bg-emerald-50 border-emerald-200'
                    : isCurrent
                    ? 'bg-ocean-50 border-ocean-200 shadow-sm'
                    : 'bg-white border-sand-200'
                )}
              >
                {/* Step number / check */}
                <div
                  className={cn(
                    'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 border',
                    step.done
                      ? 'bg-emerald-500 border-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-ocean-500 border-purple-600 text-white'
                      : 'bg-sand-100 border-sand-200 text-sand-500'
                  )}
                >
                  {step.done ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                    </svg>
                  ) : isCurrent ? (
                    <span className="animate-pulse">→</span>
                  ) : (
                    i + 1
                  )}
                </div>

                <div className="min-w-0">
                  <p
                    className={cn(
                      'text-xs font-semibold leading-snug',
                      step.done
                        ? 'text-emerald-700 line-through opacity-70'
                        : isCurrent
                        ? 'text-ocean-600'
                        : 'text-sand-500'
                    )}
                  >
                    {step.icon} {step.label}
                  </p>
                  {isCurrent && (
                    <p className="text-[10px] text-ocean-500 font-medium mt-0.5">In progress…</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        {currentStep && (
          <div className="px-4 py-3 border-t-2 border-sand-200 bg-amber-soft">
            <p className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider mb-0.5">Next up</p>
            <p className="text-xs text-amber-800 font-medium">{currentStep.label}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from { transform: translateX(-24px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
