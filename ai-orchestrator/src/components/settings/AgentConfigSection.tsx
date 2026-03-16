'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { CheckCircle } from 'lucide-react';
import { useSettingsStore } from '@/stores/useSettingsStore';
import type { AgentPreset } from '@/types/settings';

const PRESETS: { key: AgentPreset; label: string; description: string; tag?: string }[] = [
  {
    key: 'balanced',
    label: 'Balanced Outreach',
    description: 'Email + LinkedIn primary. 3 follow-ups. Auto-book meetings.',
    tag: 'Recommended',
  },
  {
    key: 'email_first',
    label: 'Email-First',
    description: 'Email primary, other channels as fallback only after full sequence.',
  },
  {
    key: 'multi_channel_blitz',
    label: 'Multi-Channel Blitz',
    description: 'All agents max. Parallel outreach. 5 follow-ups. Highest volume.',
  },
  {
    key: 'warm_steady',
    label: 'Warm & Steady',
    description: 'Slower cadence, fewer follow-ups, more personalization. Conservative.',
  },
];

export function AgentConfigSection() {
  const { agentPreset, setAgentPreset } = useSettingsStore();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-sand-800">Agent Configuration</h3>
        <p className="text-base text-sand-500 mt-0.5">
          Choose how your AI behaves across all campaigns. You can override per-campaign.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PRESETS.map((preset) => {
          const isSelected = agentPreset === preset.key;
          return (
            <button
              key={preset.key}
              type="button"
              onClick={() => setAgentPreset(preset.key)}
              className={cn(
                'text-left p-4 border-2 rounded-md transition-colors duration-150',
                isSelected
                  ? 'border-primary-700 bg-primary-50'
                  : 'border-sand-200 bg-white hover:border-sand-300'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      'text-base font-semibold',
                      isSelected ? 'text-primary-700' : 'text-sand-800'
                    )}>
                      {preset.label}
                    </span>
                    {preset.tag && (
                      <span className="text-xs font-medium text-primary-700 bg-primary-100 px-1.5 py-0.5 rounded">
                        {preset.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-base text-sand-500">{preset.description}</p>
                </div>
                {isSelected && <CheckCircle className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
