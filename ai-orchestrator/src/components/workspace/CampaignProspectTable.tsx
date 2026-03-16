'use client';

import React, { useState } from 'react';
import {
  Search, ChevronDown, ChevronRight, Mail, Linkedin, Phone, MessageSquare,
  CheckCircle, XCircle, Clock, MoreHorizontal, Plus, Download,
  Eye, MousePointer, MessageCircle, ArrowUpDown,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TimelineFeed } from '@/components/timeline/TimelineFeed';
import { useProspectStore } from '@/stores/useProspectStore';
import type { Prospect, ProspectStatus, ProspectSentiment } from '@/types/prospect';

const STATUS_CONFIG: Record<ProspectStatus, { label: string; variant: string }> = {
  new: { label: 'New', variant: 'neutral' },
  pending_review: { label: 'Pending Review', variant: 'warning' },
  approved: { label: 'Approved', variant: 'info' },
  rejected: { label: 'Rejected', variant: 'error' },
  snoozed: { label: 'Snoozed', variant: 'neutral' },
  contacted: { label: 'Contacted', variant: 'info' },
  replied: { label: 'Replied', variant: 'success' },
  meeting_booked: { label: 'Meeting Booked', variant: 'success' },
  not_interested: { label: 'Not Interested', variant: 'warning' },
  bounced: { label: 'Bounced', variant: 'error' },
};

const SENTIMENT_CONFIG: Record<ProspectSentiment, { label: string; color: string }> = {
  positive: { label: 'Positive', color: 'bg-green-500' },
  neutral: { label: 'Neutral', color: 'bg-yellow-500' },
  negative: { label: 'Negative', color: 'bg-red-500' },
  unknown: { label: '—', color: 'bg-sand-300' },
};

const CHANNEL_ICONS: Record<string, React.ElementType> = {
  email: Mail,
  linkedin: Linkedin,
  voice: Phone,
  sms: MessageSquare,
};

function ScoreBadge({ score }: { score?: number }) {
  if (!score) return <span className="text-xs text-sand-400">—</span>;
  const color = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-500';
  return <span className={cn('text-xs font-semibold', color)}>{score}</span>;
}

function SentimentDot({ sentiment }: { sentiment?: ProspectSentiment }) {
  const config = SENTIMENT_CONFIG[sentiment ?? 'unknown'];
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn('w-2 h-2 rounded-full', config.color)} />
      <span className="text-xs text-sand-500">{config.label}</span>
    </div>
  );
}

function GroupHeader({
  label,
  expanded,
  onToggle,
  colSpan,
  summary,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
  colSpan: number;
  summary?: string;
}) {
  return (
    <th colSpan={colSpan} className="py-1.5 px-2 bg-sand-100 border-b border-sand-200">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-xs font-semibold text-sand-500 uppercase tracking-wide hover:text-sand-700"
      >
        {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        {label}
        {!expanded && summary && <span className="ml-1 font-normal normal-case text-sand-400">{summary}</span>}
      </button>
    </th>
  );
}

function ProspectRow({
  prospect,
  isSelected,
  onToggleSelect,
  onApprove,
  onReject,
  showOutreach,
  showEngagement,
}: {
  prospect: Prospect;
  isSelected: boolean;
  onToggleSelect: () => void;
  onApprove: () => void;
  onReject: () => void;
  showOutreach: boolean;
  showEngagement: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[prospect.status] ?? { label: prospect.status, variant: 'neutral' };

  const totalCols = 5 + (showOutreach ? 4 : 0) + (showEngagement ? 4 : 0) + 1;

  return (
    <>
      <tr
        className={cn(
          'border-b border-sand-100 transition-colors duration-fast',
          isSelected ? 'bg-primary-50' : 'hover:bg-sand-50'
        )}
      >
        <td className="pl-3 pr-1 py-2 w-8">
          <input type="checkbox" checked={isSelected} onChange={onToggleSelect} className="w-3.5 h-3.5 accent-primary-700" />
        </td>
        <td className="pr-1 py-2 w-5">
          <button onClick={() => setExpanded(!expanded)} className="text-sand-400 hover:text-sand-600">
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </td>

        {/* Prospect Info */}
        <td className="py-2 pr-3">
          <div className="flex items-center gap-2">
            <Avatar name={`${prospect.firstName} ${prospect.lastName}`} size="sm" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-sand-800 truncate">{prospect.firstName} {prospect.lastName}</p>
              <p className="text-[11px] text-sand-500 truncate">{prospect.email}</p>
            </div>
          </div>
        </td>
        <td className="py-2 pr-3">
          <p className="text-xs text-sand-700 truncate">{prospect.company}</p>
          <p className="text-[11px] text-sand-500 truncate">{prospect.title}</p>
        </td>
        <td className="py-2 pr-3 w-12 text-center"><ScoreBadge score={prospect.matchScore} /></td>

        {/* Outreach Status */}
        {showOutreach && (
          <>
            <td className="py-2 pr-3 w-28">
              <Badge variant={status.variant as any} className="text-[11px]">{status.label}</Badge>
            </td>
            <td className="py-2 pr-3 w-28">
              <span className="text-xs text-sand-600">{prospect.currentStep ?? '—'}</span>
            </td>
            <td className="py-2 pr-3 w-20">
              <div className="flex items-center gap-0.5">
                {(prospect.campaignIds?.length ? ['email', 'linkedin'] : []).map((ch) => {
                  const Icon = CHANNEL_ICONS[ch];
                  return Icon ? (
                    <div key={ch} className="w-5 h-5 rounded bg-sand-100 flex items-center justify-center">
                      <Icon className="w-3 h-3 text-sand-500" />
                    </div>
                  ) : null;
                })}
              </div>
            </td>
            <td className="py-2 pr-3 w-24 text-xs text-sand-500">
              {prospect.lastContactedAt
                ? new Date(prospect.lastContactedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : '—'}
            </td>
          </>
        )}

        {/* Engagement Signals */}
        {showEngagement && (
          <>
            <td className="py-2 pr-3 w-12 text-center">
              <span className="text-xs text-sand-600">{prospect.opens ?? 0}</span>
            </td>
            <td className="py-2 pr-3 w-12 text-center">
              <span className="text-xs text-sand-600">{prospect.clicks ?? 0}</span>
            </td>
            <td className="py-2 pr-3 w-12 text-center">
              <span className="text-xs text-sand-600">{prospect.replyCount ?? 0}</span>
            </td>
            <td className="py-2 pr-3 w-24">
              <SentimentDot sentiment={prospect.sentiment} />
            </td>
          </>
        )}

        {/* Actions */}
        <td className="py-2 pr-3 w-20">
          <div className="flex items-center gap-0.5">
            {prospect.status === 'pending_review' && (
              <>
                <button onClick={onApprove} className="p-1 rounded hover:bg-green-50 text-sand-400 hover:text-green-600 transition-colors" title="Approve">
                  <CheckCircle className="w-3.5 h-3.5" />
                </button>
                <button onClick={onReject} className="p-1 rounded hover:bg-red-50 text-sand-400 hover:text-red-600 transition-colors" title="Reject">
                  <XCircle className="w-3.5 h-3.5" />
                </button>
              </>
            )}
            <button className="p-1 rounded hover:bg-sand-100 text-sand-400 hover:text-sand-600">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
        </td>
      </tr>

      {/* Expanded row */}
      {expanded && (
        <tr className="bg-sand-50 border-b border-sand-200">
          <td colSpan={totalCols} className="px-6 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* AI Reasoning */}
              {prospect.aiReasoning && (
                <div className="bg-primary-50 border border-primary-200 rounded-md p-3">
                  <p className="text-[11px] font-semibold text-primary-700 mb-1 uppercase tracking-wide">AI Reasoning</p>
                  <p className="text-xs text-primary-800 leading-relaxed">{prospect.aiReasoning}</p>
                </div>
              )}

              {/* Conversation Thread */}
              {prospect.conversationThread && prospect.conversationThread.length > 0 ? (
                <div className="bg-white border border-sand-200 rounded-md p-3">
                  <p className="text-[11px] font-semibold text-sand-500 mb-2 uppercase tracking-wide">Conversation</p>
                  <div className="space-y-2">
                    {prospect.conversationThread.map((entry) => (
                      <div key={entry.id} className="flex gap-2">
                        <div className={cn('w-1 rounded-full flex-shrink-0', entry.direction === 'outbound' ? 'bg-primary-300' : 'bg-green-300')} />
                        <div className="min-w-0">
                          <p className="text-[11px] text-sand-400">{entry.direction === 'outbound' ? 'You' : prospect.firstName} · {entry.channel}</p>
                          <p className="text-xs text-sand-700 truncate">{entry.snippet}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-sand-200 rounded-md p-3">
                  <p className="text-[11px] font-semibold text-sand-500 mb-2 uppercase tracking-wide">Recent Activity</p>
                  <TimelineFeed prospectId={prospect.id} />
                </div>
              )}

              {/* Next Action */}
              <div className="bg-white border border-sand-200 rounded-md p-3">
                <p className="text-[11px] font-semibold text-sand-500 mb-2 uppercase tracking-wide">Next Action</p>
                {prospect.nextAction ? (
                  <div>
                    <p className="text-xs text-sand-700 mb-2">{prospect.nextAction}</p>
                    <div className="flex gap-2">
                      <button className="text-[11px] px-2 py-1 rounded bg-primary-700 text-white hover:bg-primary-800">Approve</button>
                      <button className="text-[11px] px-2 py-1 rounded border border-sand-200 text-sand-600 hover:bg-sand-50">Skip</button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-sand-400">No pending action</p>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

interface CampaignProspectTableProps {
  campaignId: string;
}

export function CampaignProspectTable({ campaignId }: CampaignProspectTableProps) {
  const {
    prospects,
    selectedProspectIds,
    toggleProspectSelection,
    selectProspects,
    clearSelection,
    bulkUpdateStatus,
    updateProspectStatus,
  } = useProspectStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showOutreach, setShowOutreach] = useState(true);
  const [showEngagement, setShowEngagement] = useState(true);

  const allProspects = Object.values(prospects).filter((p) =>
    p.campaignIds.includes(campaignId)
  );

  const filtered = allProspects
    .filter((p) => statusFilter === 'all' || p.status === statusFilter)
    .filter((p) =>
      search === '' ||
      `${p.firstName} ${p.lastName} ${p.company}`.toLowerCase().includes(search.toLowerCase())
    );

  const allSelected = filtered.length > 0 && filtered.every((p) => selectedProspectIds.includes(p.id));

  const toggleSelectAll = () => {
    if (allSelected) clearSelection();
    else selectProspects(filtered.map((p) => p.id));
  };

  const STATUS_FILTER_OPTIONS = [
    { value: 'all', label: 'All Status' },
    { value: 'pending_review', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'replied', label: 'Replied' },
    { value: 'meeting_booked', label: 'Meeting Booked' },
    { value: 'rejected', label: 'Rejected' },
  ];

  // Aggregate engagement stats
  const totalOpens = filtered.reduce((s, p) => s + (p.opens ?? 0), 0);
  const totalReplies = filtered.reduce((s, p) => s + (p.replyCount ?? 0), 0);

  return (
    <div className="h-full flex flex-col relative">
      {/* Toolbar */}
      <div className="px-4 py-2 border-b border-sand-200 bg-white flex items-center gap-2 shrink-0">
        <div className="flex-1 max-w-[200px]">
          <Input
            placeholder="Search..."
            size="sm"
            leftIcon={<Search className="w-3.5 h-3.5" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs border border-sand-200 rounded-sm px-2 py-1.5 text-sand-700 focus:border-primary-700 outline-none"
        >
          {STATUS_FILTER_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-sand-500">{filtered.length} prospects</span>
          <Button variant="secondary" className="text-xs py-1 px-2">
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add
          </Button>
          <Button variant="secondary" className="text-xs py-1 px-2">
            <Download className="w-3.5 h-3.5 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left">
          {/* Column group headers */}
          <thead>
            <tr className="bg-sand-100">
              <th className="w-8" />
              <th className="w-5" />
              <GroupHeader label="Prospect Info" expanded={true} onToggle={() => {}} colSpan={3} />
              {showOutreach ? (
                <GroupHeader
                  label="Outreach Status"
                  expanded={showOutreach}
                  onToggle={() => setShowOutreach(!showOutreach)}
                  colSpan={4}
                />
              ) : (
                <GroupHeader
                  label="Outreach"
                  expanded={false}
                  onToggle={() => setShowOutreach(true)}
                  colSpan={1}
                  summary={`${filtered.filter(p => ['contacted', 'replied', 'meeting_booked'].includes(p.status)).length} active`}
                />
              )}
              {showEngagement ? (
                <GroupHeader
                  label="Engagement Signals"
                  expanded={showEngagement}
                  onToggle={() => setShowEngagement(!showEngagement)}
                  colSpan={4}
                  summary={`${totalOpens} opens, ${totalReplies} replies`}
                />
              ) : (
                <GroupHeader
                  label="Engagement"
                  expanded={false}
                  onToggle={() => setShowEngagement(true)}
                  colSpan={1}
                  summary={`${totalOpens} opens`}
                />
              )}
              <th className="w-20" />
            </tr>
            <tr className="bg-sand-50 border-b border-sand-200 sticky top-0 z-10">
              <th className="pl-3 pr-1 py-1.5 w-8">
                <input type="checkbox" checked={allSelected} onChange={toggleSelectAll} className="w-3.5 h-3.5 accent-primary-700" />
              </th>
              <th className="pr-1 w-5" />
              <th className="py-1.5 pr-3 text-[11px] font-semibold text-sand-500 uppercase tracking-wide">Prospect</th>
              <th className="py-1.5 pr-3 text-[11px] font-semibold text-sand-500 uppercase tracking-wide">Company</th>
              <th className="py-1.5 pr-3 text-[11px] font-semibold text-sand-500 uppercase tracking-wide w-12">Score</th>

              {showOutreach && (
                <>
                  <th className="py-1.5 pr-3 text-[11px] font-semibold text-sand-500 uppercase tracking-wide w-28">Status</th>
                  <th className="py-1.5 pr-3 text-[11px] font-semibold text-sand-500 uppercase tracking-wide w-28">Step</th>
                  <th className="py-1.5 pr-3 text-[11px] font-semibold text-sand-500 uppercase tracking-wide w-20">Channels</th>
                  <th className="py-1.5 pr-3 text-[11px] font-semibold text-sand-500 uppercase tracking-wide w-24">Last Contact</th>
                </>
              )}
              {!showOutreach && <th className="w-0" />}

              {showEngagement && (
                <>
                  <th className="py-1.5 pr-3 text-[11px] font-semibold text-sand-500 uppercase tracking-wide w-12 text-center">
                    <Eye className="w-3 h-3 mx-auto" />
                  </th>
                  <th className="py-1.5 pr-3 text-[11px] font-semibold text-sand-500 uppercase tracking-wide w-12 text-center">
                    <MousePointer className="w-3 h-3 mx-auto" />
                  </th>
                  <th className="py-1.5 pr-3 text-[11px] font-semibold text-sand-500 uppercase tracking-wide w-12 text-center">
                    <MessageCircle className="w-3 h-3 mx-auto" />
                  </th>
                  <th className="py-1.5 pr-3 text-[11px] font-semibold text-sand-500 uppercase tracking-wide w-24">Sentiment</th>
                </>
              )}
              {!showEngagement && <th className="w-0" />}

              <th className="py-1.5 pr-3 w-20" />
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={20} className="text-center py-12 text-sand-400 text-sm">
                  No prospects match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((prospect) => (
                <ProspectRow
                  key={prospect.id}
                  prospect={prospect}
                  isSelected={selectedProspectIds.includes(prospect.id)}
                  onToggleSelect={() => toggleProspectSelection(prospect.id)}
                  onApprove={() => updateProspectStatus(prospect.id, 'approved')}
                  onReject={() => updateProspectStatus(prospect.id, 'rejected')}
                  showOutreach={showOutreach}
                  showEngagement={showEngagement}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bulk action bar */}
      {selectedProspectIds.length > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-ocean-800 text-white rounded-lg px-4 py-2 flex items-center gap-3 shadow-modal z-20">
          <span className="text-xs font-medium">{selectedProspectIds.length} selected</span>
          <div className="w-px h-4 bg-sand-600" />
          <Button variant="primary" onClick={() => bulkUpdateStatus(selectedProspectIds, 'approved')} className="text-xs py-1">
            <CheckCircle className="w-3.5 h-3.5 mr-1" />
            Approve
          </Button>
          <Button
            variant="secondary"
            onClick={() => bulkUpdateStatus(selectedProspectIds, 'snoozed')}
            className="bg-sand-700 text-white border-sand-600 hover:bg-sand-600 text-xs py-1"
          >
            <Clock className="w-3.5 h-3.5 mr-1" />
            Snooze
          </Button>
          <button onClick={clearSelection} className="text-sand-400 hover:text-white ml-1 text-xs">✕</button>
        </div>
      )}
    </div>
  );
}
