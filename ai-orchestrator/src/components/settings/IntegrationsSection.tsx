'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { CheckCircle, Link2, Unlink } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useSettingsStore } from '@/stores/useSettingsStore';
import type { IntegrationType } from '@/types/settings';

const INTEGRATION_ICONS: Record<IntegrationType, string> = {
  slack: 'S',
  hubspot: 'H',
  salesforce: 'SF',
  pipedrive: 'PD',
  google_calendar: 'G',
  outlook_calendar: 'O',
};

const INTEGRATION_COLORS: Record<IntegrationType, string> = {
  slack: 'bg-purple-100 text-purple-700',
  hubspot: 'bg-orange-100 text-orange-700',
  salesforce: 'bg-blue-100 text-blue-700',
  pipedrive: 'bg-green-100 text-green-700',
  google_calendar: 'bg-red-100 text-red-700',
  outlook_calendar: 'bg-blue-100 text-blue-700',
};

export function IntegrationsSection() {
  const { integrations, connectIntegration, disconnectIntegration } = useSettingsStore();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-sand-800">Integrations</h3>
        <p className="text-base text-sand-500 mt-0.5">
          Connect your CRM, calendar, and communication tools.
        </p>
      </div>

      <div className="space-y-3">
        {integrations.map((integration) => (
          <div key={integration.id} className="bg-white border border-sand-200 rounded-lg p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                'w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm shrink-0',
                INTEGRATION_COLORS[integration.type]
              )}>
                {INTEGRATION_ICONS[integration.type]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-sand-800">{integration.name}</span>
                  {integration.connected && (
                    <Badge variant="success">Connected</Badge>
                  )}
                </div>
                <p className="text-base text-sand-500">{integration.description}</p>
                {integration.connected && integration.lastSyncAt && (
                  <p className="text-xs text-sand-400 mt-0.5">
                    Last synced {new Date(integration.lastSyncAt).toLocaleString('en-US', {
                      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                )}
              </div>
            </div>

            {integration.connected ? (
              <Button
                variant="secondary"
                onClick={() => disconnectIntegration(integration.id)}
              >
                <Unlink className="w-4 h-4 mr-1" />
                Disconnect
              </Button>
            ) : (
              <Button
                variant="primary-outline"
                onClick={() => connectIntegration(integration.id)}
              >
                <Link2 className="w-4 h-4 mr-1" />
                Connect
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
