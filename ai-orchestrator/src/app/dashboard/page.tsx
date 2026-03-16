'use client';

import React from 'react';
import Link from 'next/link';
import { RefreshCw, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { NorthStarMetric } from '@/components/dashboard/NorthStarMetric';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { AttentionRequired } from '@/components/dashboard/AttentionRequired';
import { ChannelPerformance } from '@/components/dashboard/ChannelPerformance';
import { StatusBreakdown } from '@/components/dashboard/StatusBreakdown';
import { CampaignHealthCards } from '@/components/dashboard/CampaignHealthCards';
import { EmailInfraStatusWidget } from '@/components/dashboard/EmailInfraStatusWidget';
import { useDashboardStore } from '@/stores/useDashboardStore';
import { useCampaignStore } from '@/stores/useCampaignStore';
import {
  mockDashboardMetrics,
  mockChannelMetrics,
  mockAttentionItems,
  mockStatusCounts,
} from '@/mock/dashboard';

const DATE_RANGE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
];

export default function CommandCenterPage() {
  const { dateRange, setDateRange } = useDashboardStore();
  const campaigns = useCampaignStore((s) => Object.values(s.campaigns));
  const isEmpty = campaigns.length === 0;

  if (isEmpty) {
    return (
      <div className="h-full bg-sand-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🤖</span>
          </div>
          <h2 className="text-2xl font-serif font-semibold text-ocean-900">Your AI knows your business.</h2>
          <p className="text-base text-sand-500 mt-2 mb-6">
            Let's give them their first mission. Create a campaign and your AI will start building your pipeline.
          </p>
          <Link href="/campaigns/new">
            <Button variant="primary" size="lg">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Campaign
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-sand-50">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-serif text-ocean-900">Command Center</h1>
          <div className="flex items-center gap-2">
            <div className="w-[160px]">
              <Dropdown
                options={DATE_RANGE_OPTIONS}
                value={dateRange}
                onChange={(val) => setDateRange(val as string)}
                size="sm"
                placeholder="Date range"
              />
            </div>
            <button
              className="p-2 rounded-sm text-sand-400 hover:text-sand-600 hover:bg-white border border-sand-200 transition-colors duration-fast"
              aria-label="Refresh data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Button
              variant="primary-outline"
              rightIcon={<Download className="w-3.5 h-3.5" />}
            >
              Export Report
            </Button>
            <Link href="/campaigns/new">
              <Button variant="primary">
                <Plus className="w-4 h-4 mr-1" />
                New Campaign
              </Button>
            </Link>
          </div>
        </div>

        {/* North Star Metric */}
        <NorthStarMetric meetings={12} trend={33} period="This Month" />

        {/* Summary Cards */}
        <SummaryCards metrics={mockDashboardMetrics} />

        {/* Attention Required */}
        <AttentionRequired items={mockAttentionItems} />

        {/* Campaign Health Cards */}
        <CampaignHealthCards />

        {/* Email Infra Status */}
        <EmailInfraStatusWidget />

        {/* Channel Performance */}
        <ChannelPerformance channels={mockChannelMetrics} />

        {/* Status Breakdown */}
        <StatusBreakdown statuses={mockStatusCounts} />
      </div>
    </div>
  );
}
