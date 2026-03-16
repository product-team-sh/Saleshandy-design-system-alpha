'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { useSettingsStore } from '@/stores/useSettingsStore';
import type { MailboxStatus } from '@/types/settings';
import { Plus } from 'lucide-react';

const STATUS_CONFIG: Record<MailboxStatus, { variant: string; label: string }> = {
  ready: { variant: 'success', label: 'Ready' },
  warming: { variant: 'warning', label: 'Warming' },
  paused: { variant: 'neutral', label: 'Paused' },
  error: { variant: 'error', label: 'Error' },
};

export function EmailInfraSection() {
  const { mailboxes, updateMailbox } = useSettingsStore();

  const readyCount = mailboxes.filter((m) => m.status === 'ready').length;
  const warmingCount = mailboxes.filter((m) => m.status === 'warming').length;
  const errorCount = mailboxes.filter((m) => m.status === 'error').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-sand-800">Email Infrastructure</h3>
          <p className="text-base text-sand-500 mt-0.5">
            {readyCount} ready · {warmingCount} warming up{errorCount > 0 ? ` · ${errorCount} error` : ''}
          </p>
        </div>
        <Button variant="secondary">
          <Plus className="w-4 h-4 mr-1" />
          Add Mailbox
        </Button>
      </div>

      <div className="space-y-3">
        {mailboxes.map((mailbox) => {
          const statusConfig = STATUS_CONFIG[mailbox.status];
          return (
            <div key={mailbox.id} className="bg-white border border-sand-200 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-medium text-sand-800 truncate">{mailbox.email}</span>
                    <Badge variant={statusConfig.variant as any}>{statusConfig.label}</Badge>
                    <span className="text-xs text-sand-400 uppercase">{mailbox.provider}</span>
                  </div>

                  {mailbox.status === 'warming' && (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center justify-between text-xs text-sand-500">
                        <span>Warmup progress</span>
                        <span>{mailbox.warmupPercent}%{mailbox.daysRemaining ? ` · ~${mailbox.daysRemaining} days left` : ''}</span>
                      </div>
                      <ProgressBar value={mailbox.warmupPercent} variant="warning" size="sm" />
                    </div>
                  )}

                  {mailbox.status === 'ready' && (
                    <div className="mt-2 flex items-center gap-4 text-base text-sand-500">
                      <span>{mailbox.currentDailyVolume}/{mailbox.targetDailyVolume} emails/day</span>
                      <span>Health: <span className={cn(
                        'font-medium',
                        mailbox.healthScore >= 80 ? 'text-green-600' : mailbox.healthScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                      )}>{mailbox.healthScore}%</span></span>
                    </div>
                  )}

                  {mailbox.status === 'error' && (
                    <p className="text-base text-red-600 mt-1">
                      Deliverability issue detected. Health score: {mailbox.healthScore}%. Sending paused.
                    </p>
                  )}
                </div>

                <Toggle
                  checked={mailbox.warmupEnabled && mailbox.status !== 'error'}
                  onChange={(checked) => updateMailbox(mailbox.id, { warmupEnabled: checked })}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
