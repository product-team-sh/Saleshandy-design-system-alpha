'use client';

import React from 'react';
import { Linkedin, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { useSettingsStore } from '@/stores/useSettingsStore';
import type { ChannelAccountType } from '@/types/settings';

const CHANNEL_CONFIG: Record<ChannelAccountType, { label: string; icon: React.ElementType; description: string }> = {
  linkedin: { label: 'LinkedIn', icon: Linkedin, description: 'AI sends connection requests, InMails, and DMs' },
  phone: { label: 'Phone / Voice', icon: Phone, description: 'AI makes calls, leaves voicemails, handles live conversations' },
  whatsapp: { label: 'WhatsApp', icon: MessageSquare, description: 'High open-rate messaging for international prospects' },
  sms: { label: 'SMS', icon: MessageSquare, description: 'Short urgent messages — confirmations and follow-ups' },
};

export function ChannelAccountsSection() {
  const { channelAccounts, connectChannelAccount, disconnectChannelAccount } = useSettingsStore();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-sand-800">Channel Accounts</h3>
        <p className="text-base text-sand-500 mt-0.5">
          Connect channels to enable multi-channel outreach.
        </p>
      </div>

      <div className="space-y-3">
        {channelAccounts.map((account) => {
          const config = CHANNEL_CONFIG[account.type];
          const Icon = config.icon;
          return (
            <div key={account.id} className="bg-white border border-sand-200 rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-sand-100 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-sand-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-medium text-sand-800">{config.label}</span>
                    {account.connected && (
                      <Badge variant="success">Connected</Badge>
                    )}
                  </div>
                  <p className="text-base text-sand-500">{config.description}</p>
                  {account.connected && (
                    <p className="text-xs text-sand-400 mt-0.5">{account.identifier} · {account.dailyLimit}/day limit</p>
                  )}
                </div>
              </div>

              <Toggle
                checked={account.connected}
                onChange={(checked) => checked ? connectChannelAccount(account.id) : disconnectChannelAccount(account.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
