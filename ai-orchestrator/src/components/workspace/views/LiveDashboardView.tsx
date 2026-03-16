'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { mockLiveMetrics } from '@/mock/metrics';
import { Spinner } from '@/components/ui/Spinner';
import { AiAction } from '@/types/metrics';

interface LiveDashboardViewProps {
  campaignId: string;
}

function CountUpNumber({
  target,
  className,
}: {
  target: number;
  className?: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const startTime = Date.now();
    function tick() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [target]);

  return <span className={className}>{value.toLocaleString()}</span>;
}

function ActionStatusIcon({ status }: { status: AiAction['status'] }) {
  if (status === 'in_progress') {
    return <Spinner size="sm" className="text-primary-700" />;
  }
  if (status === 'completed') {
    return (
      <svg
        className="w-4 h-4 text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    );
  }
  return (
    <svg
      className="w-4 h-4 text-red-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m15 9-6 6" />
      <path d="m9 9 6 6" />
    </svg>
  );
}

export function LiveDashboardView({ campaignId }: LiveDashboardViewProps) {
  const metrics = mockLiveMetrics[campaignId] ?? mockLiveMetrics['camp-001'];

  if (!metrics) {
    return (
      <div className="p-6 text-center text-sm text-sand-500">
        No metrics available.
      </div>
    );
  }

  const metricCards = [
    { label: 'Sent', value: metrics.sent, color: 'text-sand-800' },
    { label: 'Opened', value: metrics.opened, color: 'text-primary-700' },
    { label: 'Replied', value: metrics.replied, color: 'text-green-600' },
    { label: 'Meetings', value: metrics.meetings, color: 'text-purple-600' },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {metricCards.map((card) => (
          <div
            key={card.label}
            className="border border-sand-200 rounded-sm p-4"
          >
            <CountUpNumber
              target={card.value}
              className={cn('text-2xl font-bold', card.color)}
            />
            <p className="text-sm text-sand-500 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-sand-700">
            Completion
          </span>
          <span className="text-sm text-sand-500">
            {metrics.completionPercent}%
          </span>
        </div>
        <div className="bg-sand-100 rounded-full h-2">
          <div
            className="bg-primary-700 rounded-full h-2 transition-all duration-500"
            style={{ width: `${metrics.completionPercent}%` }}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-sand-800 mb-3">
          AI Action Feed
        </h3>
        <div className="space-y-0 max-h-[400px] overflow-y-auto">
          {metrics.recentActions.map((action) => (
            <div
              key={action.id}
              className="flex items-start gap-3 py-2 border-b border-sand-100"
            >
              <div className="mt-0.5 flex-shrink-0">
                <ActionStatusIcon status={action.status} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base text-sand-700">{action.message}</p>
                <p className="text-xs text-sand-400 mt-0.5">
                  {new Date(action.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
