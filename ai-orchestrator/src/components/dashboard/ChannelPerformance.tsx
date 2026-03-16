'use client';

import React from 'react';
import { Mail, Phone, Linkedin, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ProgressBar } from '@/components/ui/ProgressBar';
import type { ChannelMetrics } from '@/mock/dashboard';

interface ChannelPerformanceProps {
  channels: ChannelMetrics[];
}

const iconMap: Record<string, React.ElementType> = {
  mail: Mail,
  phone: Phone,
  linkedin: Linkedin,
  'message-square': MessageSquare,
};

function getBarVariant(label: string, value: number, total: number): 'primary' | 'success' | 'warning' | 'error' {
  const rate = total > 0 ? (value / total) * 100 : 0;
  if (label.toLowerCase().includes('bounced')) return rate > 3 ? 'error' : 'primary';
  if (label.toLowerCase().includes('replied') || label.toLowerCase().includes('meeting')) {
    return rate > 5 ? 'success' : 'warning';
  }
  return 'primary';
}

export function ChannelPerformance({ channels }: ChannelPerformanceProps) {
  return (
    <div className="bg-white border border-sand-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-sand-800 mb-4">Channel Performance</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {channels.map((ch, idx) => {
          const Icon = iconMap[ch.icon] ?? Mail;
          return (
            <div
              key={ch.channel}
              className={cn(
                'space-y-4',
                idx < channels.length - 1 && 'xl:border-r xl:border-sand-200 xl:pr-6'
              )}
            >
              <div className={cn(
                'flex items-center gap-2',
                !ch.enabled && 'opacity-50'
              )}>
                <Icon className="w-4 h-4 text-sand-600" />
                <span className="text-base font-semibold text-sand-800">{ch.channel}</span>
              </div>
              {!ch.enabled ? (
                <p className="text-sm text-sand-400">Not enabled</p>
              ) : (
                <div className="space-y-3">
                  {ch.metrics.map((m) => {
                    const pct = m.total > 0 ? Math.round((m.value / m.total) * 100) : 0;
                    return (
                      <div key={m.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-sand-500">{m.label}</span>
                          <span className="text-base font-semibold text-sand-800">
                            {m.value.toLocaleString()}
                          </span>
                        </div>
                        <ProgressBar
                          value={pct}
                          variant={getBarVariant(m.label, m.value, m.total)}
                          size="sm"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
