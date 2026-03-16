'use client';

import React, { useState, useMemo } from 'react';
import {
  Search, ChevronUp, ChevronDown, Mail, Linkedin, Phone,
  CheckCircle, XCircle, Clock, MoreHorizontal, Plus, Download,
  Eye, MessageCircle, ArrowUpDown, X, SlidersHorizontal,
  Sparkles, ExternalLink, UserCheck, BellOff, ChevronRight,
  TrendingUp, Minus,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/ui/Avatar';
import { useProspectStore } from '@/stores/useProspectStore';
import type { Prospect, ProspectStatus, ProspectSentiment } from '@/types/prospect';

/* ─── Status config ─────────────────────────────────────────────────── */
const STATUS_CONFIG: Record<ProspectStatus, { label: string; dot: string; bg: string; text: string }> = {
  new:            { label: 'New',           dot: 'bg-sand-400',    bg: 'bg-sand-100',    text: 'text-sand-600' },
  pending_review: { label: 'Needs Review',  dot: 'bg-amber-500',   bg: 'bg-amber-50',    text: 'text-amber-700' },
  approved:       { label: 'Approved',      dot: 'bg-primary-500', bg: 'bg-primary-50',  text: 'text-primary-700' },
  rejected:       { label: 'Rejected',      dot: 'bg-red-400',     bg: 'bg-red-50',      text: 'text-red-600' },
  snoozed:        { label: 'Snoozed',       dot: 'bg-sand-400',    bg: 'bg-sand-50',     text: 'text-sand-500' },
  contacted:      { label: 'Contacted',     dot: 'bg-blue-400',    bg: 'bg-blue-50',     text: 'text-blue-700' },
  replied:        { label: 'Replied',       dot: 'bg-green-500',   bg: 'bg-green-50',    text: 'text-green-700' },
  meeting_booked: { label: 'Meeting Set',   dot: 'bg-mint',        bg: 'bg-green-50',    text: 'text-green-700' },
  not_interested: { label: 'Not Interested',dot: 'bg-sand-400',    bg: 'bg-sand-50',     text: 'text-sand-500' },
  bounced:        { label: 'Bounced',       dot: 'bg-red-400',     bg: 'bg-red-50',      text: 'text-red-600' },
};

const SENTIMENT_CONFIG: Record<ProspectSentiment, { icon: React.ReactNode; label: string; color: string }> = {
  positive: { icon: <TrendingUp className="w-3 h-3" />,  label: 'Positive', color: 'text-green-600' },
  neutral:  { icon: <Minus className="w-3 h-3" />,        label: 'Neutral',  color: 'text-sand-500' },
  negative: { icon: <ChevronDown className="w-3 h-3" />, label: 'Negative', color: 'text-red-500' },
  unknown:  { icon: null,                                 label: '—',        color: 'text-sand-300' },
};

const CHANNEL_ICON: Record<string, React.ElementType> = {
  email: Mail, linkedin: Linkedin, voice: Phone,
};

type SortKey = 'name' | 'company' | 'status' | 'score' | 'opens' | 'replies' | 'lastContact';
type SortDir = 'asc' | 'desc';

/* ─── Sub-components ─────────────────────────────────────────────────── */

function StatusPill({ status }: { status: ProspectStatus }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.new;
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium', cfg.bg, cfg.text)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', cfg.dot)} />
      {cfg.label}
    </span>
  );
}

function ScoreBar({ score }: { score?: number }) {
  if (!score) return <span className="text-xs text-sand-300">—</span>;
  const color = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-500';
  return <span className={cn('text-xs font-bold tabular-nums', color)}>{score}</span>;
}

function SortIcon({ col, sortKey, sortDir }: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey) return <ArrowUpDown className="w-3 h-3 text-sand-300 opacity-0 group-hover:opacity-100" />;
  return sortDir === 'asc'
    ? <ChevronUp className="w-3 h-3 text-primary-600" />
    : <ChevronDown className="w-3 h-3 text-primary-600" />;
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-xs font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-primary-900 ml-0.5">
        <X className="w-2.5 h-2.5" />
      </button>
    </span>
  );
}

function ExpandedRow({ prospect, totalCols, onApprove, onReject }: {
  prospect: Prospect;
  totalCols: number;
  onApprove: () => void;
  onReject: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'ai' | 'thread' | 'action'>('ai');
  const tabs: { key: typeof activeTab; label: string }[] = [
    { key: 'ai', label: 'AI Reasoning' },
    { key: 'thread', label: 'Conversation' },
    { key: 'action', label: 'Next Action' },
  ];
  return (
    <tr className="bg-gradient-to-b from-sand-50 to-white">
      <td colSpan={totalCols} className="px-0 py-0">
        <div className="border-b border-sand-200 mx-0">
          {/* Tab strip */}
          <div className="flex gap-0 border-b border-sand-200 px-8">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={cn(
                  'text-xs font-medium py-2 px-3 border-b-2 transition-colors',
                  activeTab === t.key
                    ? 'border-primary-600 text-primary-700'
                    : 'border-transparent text-sand-400 hover:text-sand-600'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="px-8 py-3 max-w-3xl">
            {activeTab === 'ai' && (
              <div className="flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-primary-500 mt-0.5 shrink-0" />
                <p className="text-xs text-sand-700 leading-relaxed">
                  {prospect.aiReasoning ?? 'No AI reasoning recorded for this prospect yet.'}
                </p>
              </div>
            )}
            {activeTab === 'thread' && (
              <div className="space-y-2">
                {prospect.conversationThread && prospect.conversationThread.length > 0 ? (
                  prospect.conversationThread.map((entry) => (
                    <div key={entry.id} className="flex gap-3 items-start">
                      <div className={cn(
                        'text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0 mt-0.5',
                        entry.direction === 'outbound' ? 'bg-primary-100 text-primary-700' : 'bg-green-100 text-green-700'
                      )}>
                        {entry.direction === 'outbound' ? 'Sent' : 'Reply'}
                      </div>
                      <div>
                        {entry.subject && <p className="text-xs font-medium text-sand-700">{entry.subject}</p>}
                        <p className="text-xs text-sand-500 italic">"{entry.snippet}"</p>
                        <p className="text-[10px] text-sand-300 mt-0.5">
                          {new Date(entry.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {entry.channel}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-sand-400">No conversation recorded yet.</p>
                )}
              </div>
            )}
            {activeTab === 'action' && (
              <div>
                {prospect.nextAction ? (
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-sand-700">{prospect.nextAction}</p>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={onApprove}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-primary-700 text-white hover:bg-primary-800 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve Action
                      </button>
                      <button
                        onClick={onReject}
                        className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-sand-200 text-sand-600 hover:bg-sand-50 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Skip
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-sand-400">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                    No pending actions — agent is up to date
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}

function ProspectRow({
  prospect,
  isSelected,
  onToggleSelect,
  onApprove,
  onReject,
  onSnooze,
}: {
  prospect: Prospect;
  isSelected: boolean;
  onToggleSelect: () => void;
  onApprove: () => void;
  onReject: () => void;
  onSnooze: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const sentiment = SENTIMENT_CONFIG[prospect.sentiment ?? 'unknown'];
  const lastContact = prospect.lastContactedAt
    ? new Date(prospect.lastContactedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '—';

  const totalCols = 12;

  return (
    <>
      <tr
        className={cn(
          'group border-b border-sand-100 transition-colors duration-75 cursor-pointer',
          isSelected ? 'bg-primary-50/60' : 'hover:bg-sand-50/80',
          expanded && 'bg-sand-50/40'
        )}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onClick={() => setExpanded(!expanded)}
      >
        {/* Checkbox */}
        <td className="pl-4 pr-2 py-2.5 w-8" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="w-3.5 h-3.5 accent-primary-700 cursor-pointer"
          />
        </td>

        {/* Expand */}
        <td className="pr-1 py-2.5 w-5">
          <ChevronRight className={cn('w-3 h-3 text-sand-300 transition-transform', expanded && 'rotate-90')} />
        </td>

        {/* Name + Email */}
        <td className="py-2.5 pr-3 min-w-[180px]">
          <div className="flex items-center gap-2.5">
            <Avatar name={`${prospect.firstName} ${prospect.lastName}`} size="sm" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-sand-900 truncate leading-tight">
                {prospect.firstName} {prospect.lastName}
              </p>
              <p className="text-[10px] text-sand-400 truncate leading-tight mt-0.5">{prospect.email}</p>
            </div>
          </div>
        </td>

        {/* Company + Title */}
        <td className="py-2.5 pr-3 min-w-[160px]">
          <p className="text-xs font-medium text-sand-700 truncate leading-tight">{prospect.company}</p>
          <p className="text-[10px] text-sand-400 truncate leading-tight mt-0.5">{prospect.title}</p>
        </td>

        {/* Status */}
        <td className="py-2.5 pr-3 w-[130px]">
          <StatusPill status={prospect.status} />
        </td>

        {/* Step */}
        <td className="py-2.5 pr-3 w-20">
          <span className="text-xs text-sand-600">{prospect.currentStep ?? '—'}</span>
        </td>

        {/* Channel */}
        <td className="py-2.5 pr-3 w-20" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-0.5">
            {prospect.channelRecommendation
              ? [prospect.channelRecommendation].map((ch) => {
                  const Icon = CHANNEL_ICON[ch];
                  return Icon ? (
                    <div key={ch} className="w-5 h-5 rounded bg-sand-100 flex items-center justify-center" title={ch}>
                      <Icon className="w-3 h-3 text-sand-500" />
                    </div>
                  ) : null;
                })
              : <span className="text-xs text-sand-300">—</span>
            }
          </div>
        </td>

        {/* Opens */}
        <td className="py-2.5 pr-2 w-10 text-center">
          <span className={cn('text-xs tabular-nums', (prospect.opens ?? 0) > 0 ? 'text-sand-700 font-medium' : 'text-sand-300')}>
            {prospect.opens ?? 0}
          </span>
        </td>

        {/* Replies */}
        <td className="py-2.5 pr-2 w-10 text-center">
          <span className={cn('text-xs tabular-nums', (prospect.replyCount ?? 0) > 0 ? 'text-green-600 font-medium' : 'text-sand-300')}>
            {prospect.replyCount ?? 0}
          </span>
        </td>

        {/* Sentiment */}
        <td className="py-2.5 pr-3 w-24">
          <span className={cn('flex items-center gap-1 text-xs', sentiment.color)}>
            {sentiment.icon}
            {sentiment.label}
          </span>
        </td>

        {/* Score */}
        <td className="py-2.5 pr-3 w-10 text-center">
          <ScoreBar score={prospect.matchScore} />
        </td>

        {/* Last Contact */}
        <td className="py-2.5 pr-4 w-20 text-right">
          {showActions ? (
            <div className="flex items-center justify-end gap-0.5" onClick={(e) => e.stopPropagation()}>
              {prospect.status === 'pending_review' && (
                <>
                  <button
                    onClick={onApprove}
                    className="p-1 rounded hover:bg-green-100 text-sand-400 hover:text-green-600 transition-colors"
                    title="Approve"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onReject}
                    className="p-1 rounded hover:bg-red-100 text-sand-400 hover:text-red-500 transition-colors"
                    title="Reject"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
              <button
                onClick={onSnooze}
                className="p-1 rounded hover:bg-sand-100 text-sand-400 hover:text-sand-600 transition-colors"
                title="Snooze"
              >
                <BellOff className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 rounded hover:bg-sand-100 text-sand-400 hover:text-sand-600 transition-colors" title="More">
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <span className="text-[10px] text-sand-300 font-mono">{lastContact}</span>
          )}
        </td>
      </tr>

      {expanded && (
        <ExpandedRow
          prospect={prospect}
          totalCols={totalCols}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}
    </>
  );
}

/* ─── Main table component ───────────────────────────────────────────── */

interface ProspectDataTableProps {
  campaignId: string;
}

export function ProspectDataTable({ campaignId }: ProspectDataTableProps) {
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
  const [statusFilter, setStatusFilter] = useState<ProspectStatus | 'all'>('all');
  const [sentimentFilter, setSentimentFilter] = useState<ProspectSentiment | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('score');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const allProspects = useMemo(
    () => Object.values(prospects).filter((p) => p.campaignIds.includes(campaignId)),
    [prospects, campaignId]
  );

  const filtered = useMemo(() => {
    let list = allProspects;
    if (statusFilter !== 'all') list = list.filter((p) => p.status === statusFilter);
    if (sentimentFilter !== 'all') list = list.filter((p) => (p.sentiment ?? 'unknown') === sentimentFilter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        `${p.firstName} ${p.lastName} ${p.company} ${p.email}`.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'name') cmp = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
      else if (sortKey === 'company') cmp = (a.company ?? '').localeCompare(b.company ?? '');
      else if (sortKey === 'status') cmp = a.status.localeCompare(b.status);
      else if (sortKey === 'score') cmp = (a.matchScore ?? 0) - (b.matchScore ?? 0);
      else if (sortKey === 'opens') cmp = (a.opens ?? 0) - (b.opens ?? 0);
      else if (sortKey === 'replies') cmp = (a.replyCount ?? 0) - (b.replyCount ?? 0);
      else if (sortKey === 'lastContact') cmp = (a.lastContactedAt ?? '').localeCompare(b.lastContactedAt ?? '');
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [allProspects, statusFilter, sentimentFilter, search, sortKey, sortDir]);

  const allSelected = filtered.length > 0 && filtered.every((p) => selectedProspectIds.includes(p.id));

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  }

  function toggleSelectAll() {
    if (allSelected) clearSelection();
    else selectProspects(filtered.map((p) => p.id));
  }

  // Aggregate stats
  const pendingCount = allProspects.filter((p) => p.status === 'pending_review').length;
  const repliedCount = allProspects.filter((p) => p.status === 'replied' || p.status === 'meeting_booked').length;

  const activeFilters: { label: string; clear: () => void }[] = [
    ...(statusFilter !== 'all' ? [{ label: STATUS_CONFIG[statusFilter].label, clear: () => setStatusFilter('all') }] : []),
    ...(sentimentFilter !== 'all' ? [{ label: `Sentiment: ${sentimentFilter}`, clear: () => setSentimentFilter('all') }] : []),
    ...(search ? [{ label: `"${search}"`, clear: () => setSearch('') }] : []),
  ];

  function SortTh({ col, label, className }: { col: SortKey; label: string; className?: string }) {
    return (
      <th
        className={cn('py-2 pr-3 text-[10px] font-semibold text-sand-400 uppercase tracking-wide cursor-pointer select-none group', className)}
        onClick={() => toggleSort(col)}
      >
        <span className="flex items-center gap-1">
          {label}
          <SortIcon col={col} sortKey={sortKey} sortDir={sortDir} />
        </span>
      </th>
    );
  }

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-white">
      {/* ── Toolbar ── */}
      <div className="border-b border-sand-200 shrink-0">
        {/* Main toolbar */}
        <div className="px-4 py-2 flex items-center gap-2">
          {/* Search */}
          <div className="relative flex-1 max-w-[240px]">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sand-400" />
            <input
              type="text"
              placeholder="Search prospects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-sand-200 rounded-md placeholder-sand-400 text-sand-800 focus:border-primary-500 focus:shadow-focused outline-none transition-colors"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ProspectStatus | 'all')}
            className="text-xs border border-sand-200 rounded-md px-2.5 py-1.5 text-sand-600 focus:border-primary-500 outline-none bg-white"
          >
            <option value="all">All Status</option>
            <option value="pending_review">Needs Review</option>
            <option value="approved">Approved</option>
            <option value="contacted">Contacted</option>
            <option value="replied">Replied</option>
            <option value="meeting_booked">Meeting Set</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Sentiment filter */}
          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value as ProspectSentiment | 'all')}
            className="text-xs border border-sand-200 rounded-md px-2.5 py-1.5 text-sand-600 focus:border-primary-500 outline-none bg-white"
          >
            <option value="all">All Sentiment</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

          {/* Stats pills */}
          <div className="hidden lg:flex items-center gap-2 ml-1">
            {pendingCount > 0 && (
              <button
                onClick={() => setStatusFilter('pending_review')}
                className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-amber-50 text-amber-700 font-medium hover:bg-amber-100 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                {pendingCount} need review
              </button>
            )}
            {repliedCount > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {repliedCount} replied
              </span>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-sand-400 tabular-nums">{filtered.length} / {allProspects.length}</span>
            <button className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-sand-200 text-sand-600 hover:bg-sand-50 transition-colors">
              <Plus className="w-3 h-3" />
              Add
            </button>
            <button className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md border border-sand-200 text-sand-600 hover:bg-sand-50 transition-colors">
              <Download className="w-3 h-3" />
              Export
            </button>
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="px-4 pb-2 flex items-center gap-1.5">
            <span className="text-[10px] text-sand-400 font-medium">Filters:</span>
            {activeFilters.map((f) => (
              <FilterChip key={f.label} label={f.label} onRemove={f.clear} />
            ))}
            <button
              onClick={() => { setStatusFilter('all'); setSentimentFilter('all'); setSearch(''); }}
              className="text-[10px] text-sand-400 hover:text-sand-600 ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10 bg-white border-b border-sand-200">
            <tr>
              <th className="pl-4 pr-2 py-2 w-8">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="w-3.5 h-3.5 accent-primary-700"
                />
              </th>
              <th className="pr-1 w-5" />
              <SortTh col="name" label="Prospect" className="min-w-[180px]" />
              <SortTh col="company" label="Company" className="min-w-[160px]" />
              <SortTh col="status" label="Status" className="w-[130px]" />
              <th className="py-2 pr-3 text-[10px] font-semibold text-sand-400 uppercase tracking-wide w-20">Step</th>
              <th className="py-2 pr-3 text-[10px] font-semibold text-sand-400 uppercase tracking-wide w-20">Channel</th>
              <th className="py-2 pr-2 text-[10px] font-semibold text-sand-400 uppercase tracking-wide w-10 text-center">
                <span title="Opens"><Eye className="w-3 h-3 mx-auto" /></span>
              </th>
              <th className="py-2 pr-2 text-[10px] font-semibold text-sand-400 uppercase tracking-wide w-10 text-center">
                <span title="Replies"><MessageCircle className="w-3 h-3 mx-auto" /></span>
              </th>
              <th className="py-2 pr-3 text-[10px] font-semibold text-sand-400 uppercase tracking-wide w-24">Sentiment</th>
              <SortTh col="score" label="Score" className="w-10 text-center" />
              <th className="py-2 pr-4 text-[10px] font-semibold text-sand-400 uppercase tracking-wide w-20 text-right">
                Last Contact
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={12} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sand-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-sand-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-sand-700">
                        {search || statusFilter !== 'all' || sentimentFilter !== 'all'
                          ? 'No prospects match your filters'
                          : 'No prospects in this campaign yet'}
                      </p>
                      <p className="text-xs text-sand-400 mt-1">
                        {search || statusFilter !== 'all' || sentimentFilter !== 'all'
                          ? 'Try clearing some filters'
                          : 'Ask the AI agent to find and add prospects'}
                      </p>
                    </div>
                    {!(search || statusFilter !== 'all' || sentimentFilter !== 'all') && (
                      <button className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-primary-700 text-white hover:bg-primary-800 transition-colors">
                        <Sparkles className="w-3.5 h-3.5" />
                        Ask AI to find prospects
                      </button>
                    )}
                  </div>
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
                  onSnooze={() => updateProspectStatus(prospect.id, 'snoozed')}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── Floating bulk action bar ── */}
      {selectedProspectIds.length > 0 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-ocean-900 text-white rounded-xl px-4 py-2.5 shadow-modal z-20 border border-white/10">
          <span className="text-xs font-semibold">{selectedProspectIds.length} selected</span>
          <div className="w-px h-4 bg-white/20" />
          <button
            onClick={() => { bulkUpdateStatus(selectedProspectIds, 'approved'); clearSelection(); }}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
          >
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            Approve all
          </button>
          <button
            onClick={() => { bulkUpdateStatus(selectedProspectIds, 'snoozed'); clearSelection(); }}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Snooze
          </button>
          <button
            onClick={() => { bulkUpdateStatus(selectedProspectIds, 'rejected'); clearSelection(); }}
            className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
          >
            <XCircle className="w-3.5 h-3.5 text-red-400" />
            Reject
          </button>
          <button
            onClick={clearSelection}
            className="ml-1 text-white/40 hover:text-white/70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// Fix import for empty state icon
function Users({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
