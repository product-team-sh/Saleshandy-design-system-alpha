'use client';

import React from 'react';
import { cn } from '@/lib/cn';

interface SequenceStep {
  step: number;
  channel: 'email' | 'linkedin' | 'phone';
  day: number;
  subject?: string;
  description: string;
  status: 'draft' | 'approved' | 'locked';
}

interface SequenceOverviewArtifactProps {
  sequenceName: string;
  sequenceId: string;
  steps: SequenceStep[];
  shLink?: string;
  shLinkLabel?: string;
}

const CHANNEL_CONFIG: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  email: {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: 'bg-ocean-50 text-ocean-600 border-purple-200',
    label: 'Email',
  },
  linkedin: {
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    label: 'LinkedIn',
  },
  phone: {
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6.5A4.5 4.5 0 0 1 6.5 2h11A4.5 4.5 0 0 1 22 6.5v11A4.5 4.5 0 0 1 17.5 22h-11A4.5 4.5 0 0 1 2 17.5v-11Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m15 9-6 6M9 9h6v6" />
      </svg>
    ),
    color: 'bg-mint-soft text-emerald-700 border-emerald-200',
    label: 'Call',
  },
};

const STATUS_CONFIG: Record<string, { label: string; classes: string }> = {
  locked:   { label: '✓ Locked',   classes: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  approved: { label: '✓ Approved', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
  draft:    { label: 'Draft',      classes: 'bg-sand-100 text-sand-500 border-sand-200' },
};

export function SequenceOverviewArtifact({
  sequenceName,
  steps,
  shLink,
  shLinkLabel,
}: SequenceOverviewArtifactProps) {
  const lastDay = steps.length > 0 ? steps[steps.length - 1].day : 0;
  const lockedCount = steps.filter(s => s.status === 'locked' || s.status === 'approved').length;

  return (
    <div className="mt-3 rounded-xl border-2 border-sand-300 bg-white overflow-hidden shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-sand-200 bg-sand-100">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
          </svg>
          <span className="text-xs font-bold text-sand-700 truncate max-w-[180px]">{sequenceName}</span>
        </div>
        <span className="text-xs font-semibold text-sand-500 flex-shrink-0">
          {steps.length} steps · {lastDay + 1}d · {lockedCount}/{steps.length} locked
        </span>
      </div>

      {/* Steps */}
      <div className="divide-y divide-pg-border">
        {steps.map((step) => {
          const channel = CHANNEL_CONFIG[step.channel];
          const status = STATUS_CONFIG[step.status];

          return (
            <div key={step.step} className="px-4 py-3 flex items-start gap-3">
              {/* Step number + vertical connector */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black border-2',
                  step.status === 'locked' || step.status === 'approved'
                    ? 'bg-ocean-500 border-sand-300 text-white'
                    : 'bg-white border-sand-200 text-sand-500'
                )}>
                  {step.step}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                {/* Top row: Day + channel + status */}
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[11px] font-bold text-sand-500">Day {step.day}</span>
                  <span className={cn('flex items-center gap-1 text-[11px] font-semibold px-1.5 py-0.5 rounded-full border', channel.color)}>
                    {channel.icon}
                    {channel.label}
                  </span>
                  <span className={cn('text-[11px] font-semibold px-1.5 py-0.5 rounded-full border ml-auto', status.classes)}>
                    {status.label}
                  </span>
                </div>

                {/* Subject line */}
                {step.subject && (
                  <p className="text-xs font-semibold text-sand-700 truncate mb-0.5">
                    "{step.subject}"
                  </p>
                )}

                {/* Description */}
                <p className="text-[11px] text-sand-500 leading-snug">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {shLink && (
        <div className="px-4 py-2.5 border-t-2 border-sand-200 bg-sand-100">
          <a
            href={shLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-ocean-500 hover:text-ocean-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {shLinkLabel ?? 'Open in Saleshandy'}
          </a>
        </div>
      )}
    </div>
  );
}
