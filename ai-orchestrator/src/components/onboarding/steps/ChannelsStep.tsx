'use client';

import React from 'react';
import { Mail, Phone, Linkedin, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Checkbox } from '@/components/ui/Checkbox';
import { Dropdown } from '@/components/ui/Dropdown';
import { Toggle } from '@/components/ui/Toggle';
import { Banner } from '@/components/ui/Banner';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import type { ChannelConfig } from '@/types/onboarding';

const LIMIT_OPTIONS = [
  { value: '10', label: '10' },
  { value: '25', label: '25' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
  { value: '200', label: '200' },
];

const WARMUP_OPTIONS = [
  { value: '40/60', label: '40/60' },
  { value: '50/50', label: '50/50' },
  { value: '60/40', label: '60/40' },
];

const CHANNELS = [
  { key: 'email', label: 'Email', icon: Mail, description: 'Send personalized email sequences' },
  { key: 'voice', label: 'Voice AI', icon: Phone, description: 'AI-powered voice calls' },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, description: 'LinkedIn DMs and connection requests' },
  { key: 'sms', label: 'WhatsApp / SMS', icon: MessageSquare, description: 'Text-based messaging' },
];

export function ChannelsStep() {
  const { data, updateData } = useOnboardingStore();

  const updateChannel = (key: string, partial: Partial<ChannelConfig>) => {
    updateData({
      channels: {
        ...data.channels,
        [key]: { ...data.channels[key], ...partial },
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CHANNELS.map((ch) => {
          const config = data.channels[ch.key];
          return (
            <div
              key={ch.key}
              className={cn(
                'border-2 rounded-md p-4 transition-all duration-base',
                config?.enabled ? 'border-primary-700 bg-white' : 'border-sand-200 bg-white'
              )}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={config?.enabled ?? false}
                  onChange={(checked) => updateChannel(ch.key, { enabled: checked })}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <ch.icon className="w-4 h-4 text-sand-600" />
                    <span className="text-base font-semibold text-sand-800">{ch.label}</span>
                  </div>
                  <p className="text-sm text-sand-500 mt-0.5">{ch.description}</p>
                </div>
              </div>

              {config?.enabled && (
                <div className="mt-4 pt-4 border-t border-sand-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-sand-600">Daily limit</span>
                    <div className="w-[100px]">
                      <Dropdown
                        options={LIMIT_OPTIONS}
                        value={String(config.dailyLimit)}
                        onChange={(val) => updateChannel(ch.key, { dailyLimit: Number(val) })}
                        size="sm"
                      />
                    </div>
                  </div>

                  {ch.key === 'email' && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-sand-600">Warmup enabled</span>
                        <Toggle
                          checked={config.warmupEnabled ?? false}
                          onChange={(checked) => updateChannel(ch.key, { warmupEnabled: checked })}
                        />
                      </div>
                      {config.warmupEnabled && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-sand-600">Warmup ratio</span>
                          <div className="w-[100px]">
                            <Dropdown
                              options={WARMUP_OPTIONS}
                              value={config.warmupRatio ?? '40/60'}
                              onChange={(val) => updateChannel(ch.key, { warmupRatio: val as string })}
                              size="sm"
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {ch.key === 'voice' && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-sand-600">Business hours only</span>
                      <Toggle
                        checked={config.businessHoursOnly ?? true}
                        onChange={(checked) => updateChannel(ch.key, { businessHoursOnly: checked })}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Banner variant="info">
        Start conservative. You can increase limits after warmup is complete.
      </Banner>
    </div>
  );
}
