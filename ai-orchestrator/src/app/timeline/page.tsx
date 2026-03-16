'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Toggle } from '@/components/ui/Toggle';
import { ProspectList } from '@/components/timeline/ProspectList';
import { TimelineFeed } from '@/components/timeline/TimelineFeed';
import { ContextTab } from '@/components/timeline/ContextTab';
import { NotesTab } from '@/components/timeline/NotesTab';
import { useTimelineStore } from '@/stores/useTimelineStore';
import { useProspectStore } from '@/stores/useProspectStore';

const TABS = [
  { key: 'timeline' as const, label: 'Timeline' },
  { key: 'context' as const, label: 'AI Context' },
  { key: 'notes' as const, label: 'Notes' },
];

const STATUS_LABELS: Record<string, { label: string; variant: string }> = {
  contacted: { label: 'Active', variant: 'info' },
  replied: { label: 'Replied', variant: 'success' },
  meeting_booked: { label: 'Meeting Booked', variant: 'success' },
  pending_review: { label: 'Pending Review', variant: 'warning' },
  approved: { label: 'Approved', variant: 'info' },
  rejected: { label: 'Rejected', variant: 'error' },
  snoozed: { label: 'Snoozed', variant: 'neutral' },
};

export default function TimelinePage() {
  const { activeProspectId, activeTab, setActiveTab } = useTimelineStore();
  const prospects = useProspectStore((s) => s.prospects);
  const prospect = activeProspectId ? prospects[activeProspectId] : null;

  const statusInfo = prospect ? STATUS_LABELS[prospect.status] ?? { label: prospect.status, variant: 'neutral' } : null;

  return (
    <div className="flex h-[calc(100vh-56px)]">
      {/* Left panel — prospect list */}
      <ProspectList />

      {/* Right panel — detail */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {prospect ? (
          <>
            {/* Prospect header */}
            <div className="px-6 py-4 border-b border-sand-200 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={`${prospect.firstName} ${prospect.lastName}`} size="lg" />
                  <div>
                    <h2 className="text-xl font-serif font-semibold text-ocean-900">
                      {prospect.firstName} {prospect.lastName}
                    </h2>
                    <p className="text-sm text-sand-500">
                      {prospect.title} at {prospect.company}
                    </p>
                  </div>
                  {statusInfo && (
                    <Badge variant={statusInfo.variant as any}>{statusInfo.label}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-sand-500">Pause outreach</span>
                  <Toggle />
                </div>
              </div>
            </div>

            {/* Tab bar */}
            <div className="px-6 border-b border-sand-200 shrink-0">
              <div className="flex gap-6">
                {TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      'py-3 text-sm font-medium border-b-2 transition-colors duration-150',
                      activeTab === tab.key
                        ? 'border-primary-700 text-primary-700'
                        : 'border-transparent text-sand-500 hover:text-sand-800'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {activeTab === 'timeline' && <TimelineFeed prospectId={activeProspectId!} />}
              {activeTab === 'context' && <ContextTab prospectId={activeProspectId!} />}
              {activeTab === 'notes' && <NotesTab prospectId={activeProspectId!} />}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-sand-400 text-2xl">←</span>
              </div>
              <h3 className="text-xl font-serif font-semibold text-ocean-900">Select a Prospect</h3>
              <p className="text-base text-sand-500 mt-2 max-w-sm">
                Choose a prospect from the list to view their outreach timeline and AI context.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
