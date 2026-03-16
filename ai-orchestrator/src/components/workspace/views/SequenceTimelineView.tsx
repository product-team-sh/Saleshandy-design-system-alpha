'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { mockPlans } from '@/mock/plans';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { Channel } from '@/types/campaign';

interface SequenceTimelineViewProps {
  campaignId: string;
}

const channelBadgeStyles: Record<Channel, string> = {
  email: 'bg-primary-50 text-primary-700',
  linkedin: 'bg-purple-50 text-purple-700',
  voice: 'bg-green-50 text-green-700',
};

const channelLabels: Record<Channel, string> = {
  email: 'Email',
  linkedin: 'LinkedIn',
  voice: 'Voice',
};

type StepStatus = 'completed' | 'current' | 'pending';

function getStepStatus(index: number): StepStatus {
  if (index < 2) return 'completed';
  if (index === 2) return 'current';
  return 'pending';
}

export function SequenceTimelineView({ campaignId }: SequenceTimelineViewProps) {
  const panelData = useWorkspaceStore((s) => s.panelData);
  const planId = panelData.planId ?? 'plan-001';
  const plan = mockPlans[planId];

  if (!plan) {
    return (
      <div className="p-6 text-center text-sm text-sand-500">
        No sequence found.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-0">
      {plan.steps.map((step, i) => {
        const status = getStepStatus(step.index);
        const isLast = i === plan.steps.length - 1;

        return (
          <div key={step.index} className="relative flex gap-3">
            {/* Vertical line */}
            {!isLast && (
              <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-sand-200" />
            )}

            {/* Circle node */}
            <div
              className={cn(
                'relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium flex-shrink-0',
                status === 'current' &&
                  'border-primary-700 text-primary-700 bg-primary-50',
                status === 'completed' &&
                  'border-green-500 bg-green-50 text-green-600',
                status === 'pending' &&
                  'border-sand-300 text-sand-400 bg-white'
              )}
            >
              {status === 'completed' ? (
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                step.index + 1
              )}
            </div>

            {/* Content */}
            <div className="pb-6 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-medium',
                    channelBadgeStyles[step.channel]
                  )}
                >
                  {channelLabels[step.channel]}
                </span>
              </div>
              <p className="text-sm font-medium text-sand-800">{step.action}</p>
              {step.delayDays > 0 && (
                <p className="text-sm text-sand-400 mt-0.5">
                  Wait {step.delayDays} day{step.delayDays > 1 ? 's' : ''}
                </p>
              )}
              {step.conditions && (
                <p className="text-sm italic text-sand-400 mt-0.5">
                  {step.conditions}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
