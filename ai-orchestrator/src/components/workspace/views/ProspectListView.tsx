'use client';

import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/cn';
import { useProspectStore } from '@/stores/useProspectStore';
import { Badge } from '@/components/ui/Badge';
import { ProspectStatus } from '@/types/prospect';

interface ProspectListViewProps {
  campaignId: string;
}

const statusBadgeVariant: Record<ProspectStatus, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  new: 'default',
  contacted: 'info',
  replied: 'success',
  meeting_booked: 'success',
  not_interested: 'warning',
  bounced: 'error',
  pending_review: 'warning',
  approved: 'info',
  rejected: 'error',
  snoozed: 'default',
};

const statusLabels: Record<ProspectStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  replied: 'Replied',
  meeting_booked: 'Meeting',
  not_interested: 'Not Interested',
  bounced: 'Bounced',
  pending_review: 'Pending Review',
  approved: 'Approved',
  rejected: 'Rejected',
  snoozed: 'Snoozed',
};

export function ProspectListView({ campaignId }: ProspectListViewProps) {
  const prospects = useProspectStore((s) => s.prospects);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return Object.values(prospects)
      .filter((p) => p.campaignIds.includes(campaignId))
      .filter(
        (p) =>
          search === '' ||
          `${p.firstName} ${p.lastName} ${p.email} ${p.company}`
            .toLowerCase()
            .includes(search.toLowerCase())
      );
  }, [prospects, campaignId, search]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-2">
        <input
          type="text"
          placeholder="Search prospects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-sand-200 rounded-sm px-3 py-2 text-sm focus:border-primary-700 focus:shadow-focused outline-none"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map((prospect) => (
          <div
            key={prospect.id}
            className="flex items-center gap-3 px-4 py-3 hover:bg-sand-50 rounded-sm cursor-pointer border-b border-sand-100"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-medium text-sm flex items-center justify-center flex-shrink-0">
              {prospect.firstName[0]}
              {prospect.lastName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-medium text-sand-800 truncate">
                {prospect.firstName} {prospect.lastName}
              </p>
              <p className="text-sm text-sand-500 truncate">
                {prospect.company}
              </p>
            </div>
            <Badge variant={statusBadgeVariant[prospect.status]} size="sm">
              {statusLabels[prospect.status]}
            </Badge>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-sand-400">
            No prospects found.
          </div>
        )}
      </div>
      <div className="border-t border-sand-200 px-4 py-3 text-center">
        <a
          href="/prospects"
          className="text-primary-700 hover:text-primary-800 text-sm font-medium"
        >
          View All Prospects
        </a>
      </div>
    </div>
  );
}
