'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

const SPARKLINE_DATA = [3, 5, 4, 7, 6, 9, 12];

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = 32;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(' ');

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke="#3CCBA0"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={(data.length - 1) / (data.length - 1) * w}
        cy={h - ((data[data.length - 1] - min) / range) * h}
        r="3"
        fill="#3CCBA0"
      />
    </svg>
  );
}

interface NorthStarMetricProps {
  meetings: number;
  trend: number;
  period?: string;
}

export function NorthStarMetric({ meetings, trend, period = 'This Month' }: NorthStarMetricProps) {
  return (
    <div className="bg-white border border-sand-200 rounded-lg p-5 flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-sand-400 uppercase tracking-wide mb-1">Meetings Booked</p>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-sand-900">{meetings}</span>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-green-600">+{trend}%</span>
          </div>
        </div>
        <p className="text-xs text-sand-400 mt-1">{period}</p>
      </div>
      <div className="hidden sm:block">
        <Sparkline data={SPARKLINE_DATA} />
      </div>
    </div>
  );
}
