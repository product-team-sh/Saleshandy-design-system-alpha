'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { ArrowRight } from 'lucide-react';
import { useCampaignStore } from '@/stores/useCampaignStore';
import type { CampaignHealthPulse } from '@/types/campaign';

const PULSE_COLORS: Record<CampaignHealthPulse, string> = {
  green: 'bg-green-500',
  yellow: 'bg-yellow-400',
  red: 'bg-red-500',
};

const STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  review: 'In Review',
  planning: 'Planning',
  draft: 'Draft',
  approved: 'Approved',
  paused: 'Paused',
  completed: 'Completed',
};

export function CampaignHealthCards() {
  const campaigns = useCampaignStore((s) => Object.values(s.campaigns));

  const activeCampaigns = campaigns
    .filter((c) => c.status !== 'completed')
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  if (activeCampaigns.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-sand-800">Active Campaigns</h2>
        <Link href="/campaigns" className="text-sm text-primary-700 hover:text-primary-800 font-medium">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {activeCampaigns.map((campaign) => (
          <Link
            key={campaign.id}
            href={`/campaigns/${campaign.id}`}
            className="bg-white border border-sand-200 rounded-lg p-5 shadow-xs hover:shadow-md transition-all duration-150 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {campaign.healthPulse && (
                    <span className={cn(
                      'w-2 h-2 rounded-full shrink-0',
                      PULSE_COLORS[campaign.healthPulse],
                      campaign.healthPulse === 'green' && 'animate-ocean-pulse'
                    )} />
                  )}
                  <span className="text-base font-semibold text-sand-800 truncate">{campaign.name}</span>
                </div>
                <span className="text-xs text-sand-500 bg-sand-100 px-2 py-0.5 rounded-full">
                  {STATUS_LABELS[campaign.status]}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-sand-300 group-hover:text-primary-700 transition-colors shrink-0 mt-0.5 ml-2" />
            </div>

            {campaign.metrics ? (
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-base font-semibold text-sand-800">{campaign.metrics.sent}</p>
                  <p className="text-xs text-sand-400">Sent</p>
                </div>
                <div>
                  <p className="text-base font-semibold text-sand-800">{campaign.metrics.replied}</p>
                  <p className="text-xs text-sand-400">Replied</p>
                </div>
                <div>
                  <p className="text-base font-semibold text-green-600">{campaign.metrics.meetings}</p>
                  <p className="text-xs text-sand-400">Meetings</p>
                </div>
              </div>
            ) : (
              <p className="text-base text-sand-400 text-center py-1">No data yet</p>
            )}

            {campaign.healthNote && (
              <p className={cn(
                'text-xs mt-2 pt-2 border-t border-sand-100',
                campaign.healthPulse === 'green' ? 'text-green-600' :
                campaign.healthPulse === 'yellow' ? 'text-yellow-700' :
                'text-red-600'
              )}>
                {campaign.healthNote}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
