'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search, Plus, Mail, Linkedin, Phone, TrendingUp, TrendingDown,
  Minus, AlertCircle, CheckCircle, Clock, Sparkles, Zap, Users,
  BarChart2, Calendar, ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useContextStore } from '@/stores/useContextStore';
import { useCampaignStore, useCampaignsForContext } from '@/stores/useCampaignStore';
import { Campaign, CampaignStatus, Channel } from '@/types/campaign';

const STATUS_CONFIG: Record<CampaignStatus, { label: string; dot: string; bg: string; text: string }> = {
  draft:     { label: 'Draft',      dot: 'bg-sand-300',    bg: 'bg-sand-100',   text: 'text-sand-500' },
  planning:  { label: 'Planning',   dot: 'bg-primary-400', bg: 'bg-primary-50', text: 'text-primary-600' },
  review:    { label: 'In Review',  dot: 'bg-amber-400',   bg: 'bg-amber-50',   text: 'text-amber-600' },
  approved:  { label: 'Approved',   dot: 'bg-primary-500', bg: 'bg-primary-50', text: 'text-primary-700' },
  active:    { label: 'Active',     dot: 'bg-green-500',   bg: 'bg-green-50',   text: 'text-green-700' },
  paused:    { label: 'Paused',     dot: 'bg-amber-500',   bg: 'bg-amber-50',   text: 'text-amber-700' },
  completed: { label: 'Completed',  dot: 'bg-sand-400',    bg: 'bg-sand-100',   text: 'text-sand-500' },
};

const CHANNEL_ICONS: Record<Channel, React.ElementType> = {
  email: Mail, linkedin: Linkedin, voice: Phone,
};

const HEALTH_CONFIG = {
  green:  { icon: TrendingUp,   color: 'text-green-600', bg: 'bg-green-50' },
  yellow: { icon: Minus,         color: 'text-amber-600', bg: 'bg-amber-50' },
  red:    { icon: TrendingDown,  color: 'text-red-500',   bg: 'bg-red-50' },
} as const;

function replyRate(c: Campaign): number | null {
  if (!c.metrics?.sent || c.metrics.sent === 0) return null;
  return Math.round((c.metrics.replied / c.metrics.sent) * 100);
}

function CampaignRow({ campaign }: { campaign: Campaign }) {
  const status = STATUS_CONFIG[campaign.status];
  const rr = replyRate(campaign);
  const health = campaign.healthPulse ? HEALTH_CONFIG[campaign.healthPulse] : null;
  const HealthIcon = health?.icon;

  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className="group flex items-center gap-0 hover:bg-sand-50/80 transition-colors border-b border-sand-100 last:border-b-0"
    >
      {/* Status dot bar */}
      <div className={cn('w-1 self-stretch rounded-l-sm', status.dot.replace('bg-', 'bg-'))} />

      {/* Campaign name */}
      <div className="flex-1 min-w-0 py-3 pl-4 pr-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-sand-900 group-hover:text-primary-700 transition-colors truncate">
            {campaign.name}
          </span>
          {campaign.hasUnreadAiUpdate && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary-100 text-primary-700 shrink-0">
              <Sparkles className="w-2.5 h-2.5" />
              AI update
            </span>
          )}
          {campaign.metrics?.aiActionsInProgress ? (
            <span className="text-[10px] text-sand-400 shrink-0">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-1" />
              {campaign.metrics.aiActionsInProgress} in progress
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className={cn('inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-0.5 rounded-full', status.bg, status.text)}>
            <span className={cn('w-1.5 h-1.5 rounded-full', status.dot)} />
            {status.label}
          </span>
          {/* Channels */}
          <div className="flex items-center gap-0.5">
            {campaign.channels.map((ch) => {
              const Icon = CHANNEL_ICONS[ch];
              return (
                <div key={ch} className="w-4 h-4 flex items-center justify-center" title={ch}>
                  <Icon className="w-3 h-3 text-sand-400" />
                </div>
              );
            })}
          </div>
          {campaign.healthNote && (
            <span className="text-[11px] text-sand-400 truncate">— {campaign.healthNote}</span>
          )}
        </div>
      </div>

      {/* Metrics */}
      <div className="hidden lg:flex items-center gap-6 pr-6 text-right shrink-0">
        {campaign.metrics ? (
          <>
            <div className="text-right">
              <p className="text-xs font-semibold text-sand-800 tabular-nums">{campaign.metrics.sent}</p>
              <p className="text-[10px] text-sand-400">Sent</p>
            </div>
            <div className="text-right">
              <p className={cn('text-xs font-semibold tabular-nums', (campaign.metrics.replied > 0) ? 'text-green-600' : 'text-sand-800')}>
                {rr !== null ? `${rr}%` : '—'}
              </p>
              <p className="text-[10px] text-sand-400">Reply Rate</p>
            </div>
            <div className="text-right">
              <p className={cn('text-xs font-bold tabular-nums', campaign.metrics.meetings > 0 ? 'text-mint' : 'text-sand-800')}>
                {campaign.metrics.meetings}
              </p>
              <p className="text-[10px] text-sand-400">Meetings</p>
            </div>
          </>
        ) : (
          <span className="text-xs text-sand-300">Not started</span>
        )}

        {/* Health */}
        {health && HealthIcon && (
          <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center', health.bg)}>
            <HealthIcon className={cn('w-3.5 h-3.5', health.color)} />
          </div>
        )}
      </div>

      <div className="pr-3 text-sand-300 group-hover:text-sand-500 transition-colors">
        <ChevronRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

export default function CampaignsPage() {
  const activeContextId = useContextStore((s) => s.activeContextId);
  const campaigns = useCampaignsForContext(activeContextId);
  const { filters, setFilters } = useCampaignStore();
  const createCampaign = useCampaignStore((s) => s.createCampaign);

  const [statusFilter, setStatusFilter] = useState<CampaignStatus | 'all'>('all');

  function handleNewCampaign() {
    const campaign = createCampaign(activeContextId);
    window.location.href = `/campaigns/${campaign.id}`;
  }

  const filtered = campaigns
    .filter((c) => statusFilter === 'all' || c.status === statusFilter)
    .filter((c) =>
      filters.search === '' ||
      c.name.toLowerCase().includes(filters.search.toLowerCase())
    );

  // Stats
  const activeCampaigns = campaigns.filter((c) => c.status === 'active');
  const totalMeetings = campaigns.reduce((s, c) => s + (c.metrics?.meetings ?? 0), 0);
  const pendingReview = campaigns.filter((c) => c.status === 'review').length;

  return (
    <div className="h-full overflow-y-auto bg-sand-50">
      <div className="p-6 max-w-[1100px] mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ocean-900">Campaigns</h1>
            <p className="text-sm text-sand-500 mt-0.5">Your AI agent runs these end-to-end</p>
          </div>
          <button
            onClick={handleNewCampaign}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>

        {/* Stats row */}
        {campaigns.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: 'Total Campaigns',  value: String(campaigns.length),    icon: Zap,      color: 'text-primary-600' },
              { label: 'Active',           value: String(activeCampaigns.length), icon: Activity, color: 'text-green-600' },
              { label: 'Meetings Booked',  value: String(totalMeetings),         icon: Calendar,  color: 'text-mint' },
              { label: 'Pending Review',   value: String(pendingReview),         icon: AlertCircle, color: 'text-amber-600' },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-sand-200 rounded-xl p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sand-50 flex items-center justify-center">
                  <s.icon className={cn('w-4 h-4', s.color)} />
                </div>
                <div>
                  <p className={cn('text-xl font-bold tabular-nums', s.color)}>{s.value}</p>
                  <p className="text-[11px] text-sand-400">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filters + Table */}
        <div className="bg-white border border-sand-200 rounded-xl overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-sand-100">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sand-400" />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-sand-200 rounded-lg placeholder-sand-400 text-sand-800 focus:border-primary-500 outline-none transition-colors"
              />
            </div>
            <div className="flex items-center gap-1">
              {(['all', 'active', 'review', 'planning', 'draft', 'paused', 'completed'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={cn(
                    'text-xs px-2.5 py-1 rounded-lg font-medium transition-colors',
                    statusFilter === s
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-sand-500 hover:text-sand-700 hover:bg-sand-50'
                  )}
                >
                  {s === 'all' ? 'All' : STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Campaign list */}
          {filtered.length > 0 ? (
            <div>
              {filtered.map((campaign) => (
                <CampaignRow key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : campaigns.length === 0 ? (
            // True empty state
            <div className="py-20 px-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-primary-700" />
              </div>
              <h3 className="text-base font-semibold text-sand-900">No campaigns yet</h3>
              <p className="text-sm text-sand-400 mt-2 max-w-sm mx-auto">
                Create your first AI-powered campaign. Define your target audience and the agent handles the rest — research, outreach, follow-ups, and meeting booking.
              </p>
              <button
                onClick={handleNewCampaign}
                className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-700 text-white text-sm font-semibold hover:bg-primary-800 transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                Create First Campaign
              </button>
              <p className="text-xs text-sand-400 mt-3">Takes 2 minutes to set up</p>
            </div>
          ) : (
            // Filtered empty state
            <div className="py-12 text-center">
              <p className="text-sm text-sand-500">No campaigns match your filters</p>
              <button
                onClick={() => { setStatusFilter('all'); setFilters({ search: '' }); }}
                className="mt-2 text-xs text-primary-700 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Import missing icon
function Activity({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
