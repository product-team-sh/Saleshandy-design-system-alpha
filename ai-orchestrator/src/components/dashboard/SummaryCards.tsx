'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import type { DashboardMetrics } from '@/mock/dashboard';

interface SummaryCardsProps {
  metrics: DashboardMetrics;
}

function TrendIndicator({ value }: { value: number }) {
  if (value > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-sm text-green-600">
        <TrendingUp className="w-3.5 h-3.5" />
        {value}%
      </span>
    );
  }
  if (value < 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-sm text-red-700">
        <TrendingDown className="w-3.5 h-3.5" />
        {Math.abs(value)}%
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 text-sm text-sand-400">
      <Minus className="w-3.5 h-3.5" />
      No change
    </span>
  );
}

export function SummaryCards({ metrics }: SummaryCardsProps) {
  const cards = [
    {
      label: 'Total Prospects',
      value: metrics.totalProspects,
      trend: metrics.trends.prospects,
      extra: null,
    },
    {
      label: 'Active Outreach',
      value: metrics.activeOutreach,
      trend: metrics.trends.outreach,
      extra: (
        <ProgressBar
          value={Math.round((metrics.activeOutreach / metrics.totalForOutreach) * 100)}
          variant="primary"
          size="sm"
          className="mt-2"
        />
      ),
    },
    {
      label: 'Replies',
      value: metrics.replies,
      trend: metrics.trends.replies,
      extra: (
        <Badge
          variant={metrics.replyRate > 5 ? 'success' : metrics.replyRate > 2 ? 'warning' : 'error'}
          size="sm"
          className="mt-2"
        >
          {metrics.replyRate}% rate
        </Badge>
      ),
    },
    {
      label: 'Meetings Booked',
      value: metrics.meetingsBooked,
      trend: metrics.trends.meetings,
      extra: (
        <Badge variant="success" size="sm" className="mt-2">
          {metrics.meetingRate}% rate
        </Badge>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-sand-200 rounded-lg p-6 shadow-xs hover:shadow-sm transition-shadow"
        >
          <p className="text-base font-medium text-sand-500">{card.label}</p>
          <p className="text-4xl font-serif font-bold text-ocean-900 mt-2">
            {card.value.toLocaleString()}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <TrendIndicator value={card.trend} />
            <span className="text-sm text-sand-400">vs last period</span>
          </div>
          {card.extra}
        </div>
      ))}
    </div>
  );
}
