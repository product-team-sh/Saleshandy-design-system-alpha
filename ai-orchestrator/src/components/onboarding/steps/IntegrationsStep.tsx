'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useOnboardingStore } from '@/stores/useOnboardingStore';

const CALENDARS = [
  { value: 'google' as const, label: 'Google Calendar', icon: '📅' },
  { value: 'outlook' as const, label: 'Outlook', icon: '📧' },
];

const CRMS = [
  { value: 'hubspot' as const, label: 'HubSpot', icon: '🟠' },
  { value: 'salesforce' as const, label: 'Salesforce', icon: '☁️' },
  { value: 'pipedrive' as const, label: 'Pipedrive', icon: '🟢' },
];

export function IntegrationsStep() {
  const { data, updateData } = useOnboardingStore();
  const [connectingCalendar, setConnectingCalendar] = useState(false);
  const [connectingCrm, setConnectingCrm] = useState(false);

  const handleConnectCalendar = (cal: typeof data.calendar) => {
    updateData({ calendar: cal });
    setConnectingCalendar(true);
    setTimeout(() => {
      updateData({ calendarConnected: true });
      setConnectingCalendar(false);
    }, 1500);
  };

  const handleConnectCrm = (crm: typeof data.crm) => {
    updateData({ crm });
    setConnectingCrm(true);
    setTimeout(() => {
      updateData({ crmConnected: true });
      setConnectingCrm(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Calendar */}
      <div>
        <h3 className="text-lg font-semibold text-sand-800 mb-3">Calendar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CALENDARS.map((cal) => {
            const isSelected = data.calendar === cal.value;
            const isConnected = isSelected && data.calendarConnected;
            return (
              <div
                key={cal.value}
                className={cn(
                  'border-2 rounded-md p-4 transition-all duration-base',
                  isConnected ? 'border-primary-700' : 'border-sand-200'
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{cal.icon}</span>
                  <span className="text-base font-semibold text-sand-800">{cal.label}</span>
                  {isConnected && <Badge variant="success" size="sm">Connected</Badge>}
                </div>
                {isConnected ? (
                  <Button
                    variant="tertiary"
                    size="sm"
                    onClick={() => updateData({ calendar: '', calendarConnected: false })}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="primary-outline"
                    size="sm"
                    loading={connectingCalendar && data.calendar === cal.value}
                    onClick={() => handleConnectCalendar(cal.value)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CRM */}
      <div>
        <h3 className="text-lg font-semibold text-sand-800 mb-3">CRM</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CRMS.map((crm) => {
            const isSelected = data.crm === crm.value;
            const isConnected = isSelected && data.crmConnected;
            return (
              <div
                key={crm.value}
                className={cn(
                  'border-2 rounded-md p-4 transition-all duration-base',
                  isConnected ? 'border-primary-700' : 'border-sand-200'
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{crm.icon}</span>
                  <span className="text-base font-semibold text-sand-800">{crm.label}</span>
                  {isConnected && <Badge variant="success" size="sm">Connected</Badge>}
                </div>
                {isConnected ? (
                  <Button
                    variant="tertiary"
                    size="sm"
                    onClick={() => updateData({ crm: '', crmConnected: false })}
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="primary-outline"
                    size="sm"
                    loading={connectingCrm && data.crm === crm.value}
                    onClick={() => handleConnectCrm(crm.value)}
                  >
                    Connect
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Slack */}
      <div>
        <h3 className="text-lg font-semibold text-sand-800 mb-3">Slack (Handoffs)</h3>
        <Input
          placeholder="https://hooks.slack.com/services/…"
          value={data.slackWebhook}
          onChange={(e) => updateData({ slackWebhook: e.target.value })}
        />
        <p className="text-sm text-sand-500 mt-1">
          Human handoffs and escalations will be posted to this channel
        </p>
      </div>
    </div>
  );
}
