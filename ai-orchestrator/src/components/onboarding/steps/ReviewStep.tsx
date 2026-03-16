'use client';

import React from 'react';
import { Divider } from '@/components/ui/Divider';
import { Banner } from '@/components/ui/Banner';
import { Badge } from '@/components/ui/Badge';
import { useOnboardingStore } from '@/stores/useOnboardingStore';

function SectionCard({
  title,
  stepNumber,
  children,
}: {
  title: string;
  stepNumber: number;
  children: React.ReactNode;
}) {
  const setStep = useOnboardingStore((s) => s.setStep);

  return (
    <div className="bg-white border border-sand-200 rounded-md p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-sand-800">{title}</h3>
        <button
          onClick={() => setStep(stepNumber)}
          className="text-base font-medium text-primary-700 hover:text-primary-800 underline"
        >
          Edit
        </button>
      </div>
      <Divider />
      <div className="mt-4 space-y-2">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | string[] }) {
  const display = Array.isArray(value)
    ? value.length > 0
      ? value.join(', ')
      : '—'
    : value || '—';

  return (
    <div className="flex gap-4">
      <span className="text-base font-medium text-sand-500 w-[140px] shrink-0">{label}</span>
      <span className="text-base text-sand-800">{display}</span>
    </div>
  );
}

export function ReviewStep() {
  const { data } = useOnboardingStore();

  const enabledChannels = Object.entries(data.channels)
    .filter(([, config]) => config.enabled)
    .map(([key]) => key);

  return (
    <div className="space-y-4">
      <SectionCard title="Company Profile" stepNumber={1}>
        <Field label="Company" value={data.companyName} />
        <Field label="Website" value={data.website} />
        <Field label="Industry" value={data.industry} />
        <Field label="Size" value={data.companySize} />
        <Field label="Value Prop" value={data.valueProposition ? `"${data.valueProposition.slice(0, 100)}${data.valueProposition.length > 100 ? '…' : ''}"` : '—'} />
      </SectionCard>

      <SectionCard title="Ideal Customer Profile" stepNumber={2}>
        <Field label="Titles" value={data.targetTitles} />
        <Field label="Industries" value={data.targetIndustries} />
        <Field label="Company Size" value={data.minEmployees || data.maxEmployees ? `${data.minEmployees || '?'}–${data.maxEmployees || '?'} employees` : '—'} />
        <Field label="Geographies" value={data.geographies} />
      </SectionCard>

      <SectionCard title="Tone & Messaging" stepNumber={3}>
        <Field label="Tone" value={data.tone || '—'} />
        <Field label="AI Rewrite" value={data.aiRewriteEnabled ? 'Enabled' : 'Disabled'} />
      </SectionCard>

      <SectionCard title="Channels" stepNumber={4}>
        <div className="flex gap-2 flex-wrap">
          {enabledChannels.length > 0 ? (
            enabledChannels.map((ch) => (
              <Badge key={ch} variant="info" size="md">
                {ch.charAt(0).toUpperCase() + ch.slice(1)}
              </Badge>
            ))
          ) : (
            <span className="text-base text-sand-400">No channels enabled</span>
          )}
        </div>
      </SectionCard>

      <SectionCard title="Integrations" stepNumber={5}>
        <Field label="Calendar" value={data.calendarConnected ? `${data.calendar} (Connected)` : 'Not connected'} />
        <Field label="CRM" value={data.crmConnected ? `${data.crm} (Connected)` : 'Not connected'} />
        <Field label="Slack" value={data.slackWebhook ? 'Configured' : 'Not configured'} />
      </SectionCard>

      <Banner variant="info">
        You can change any of these settings later from the Settings page.
      </Banner>
    </div>
  );
}
