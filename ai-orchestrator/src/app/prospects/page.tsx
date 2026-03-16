'use client';

import React, { useState } from 'react';
import { Search, Upload, Users, MoreHorizontal, CheckCircle, XCircle, Mail, Phone, Linkedin } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Checkbox } from '@/components/ui/Checkbox';
import { EmptyState } from '@/components/ui/EmptyState';
import { useProspectStore, useFilteredProspects } from '@/stores/useProspectStore';
import { useUiStore } from '@/stores/useUiStore';
import { ProspectDetailDrawer } from '@/components/prospects-page/ProspectDetailDrawer';
import { ProspectImportModal } from '@/components/prospects-page/ProspectImportModal';
import type { ProspectStatus } from '@/types/prospect';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending_review', label: 'Pending Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'snoozed', label: 'Snoozed' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'replied', label: 'Replied' },
  { value: 'meeting_booked', label: 'Meeting Booked' },
  { value: 'not_interested', label: 'Not Interested' },
  { value: 'bounced', label: 'Bounced' },
];

const SOURCE_OPTIONS = [
  { value: 'all', label: 'All Sources' },
  { value: 'AI Sourced', label: 'AI Sourced' },
  { value: 'Imported', label: 'Imported' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'CRM Sync', label: 'CRM Sync' },
];

const TAG_OPTIONS = [
  { value: 'saas', label: 'SaaS' },
  { value: 'series-a', label: 'Series A' },
  { value: 'startup', label: 'Startup' },
  { value: 'enterprise', label: 'Enterprise' },
  { value: 'sales-tech', label: 'Sales Tech' },
  { value: 'marketing-automation', label: 'Marketing Automation' },
];

const STATUS_BADGE_CLASSES: Record<ProspectStatus, string> = {
  new: 'bg-sand-100 text-sand-600',
  pending_review: 'bg-sand-100 text-sand-600',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  snoozed: 'bg-sand-100 text-sand-400',
  contacted: 'bg-primary-100 text-primary-700',
  replied: 'bg-green-100 text-green-700',
  meeting_booked: 'bg-purple-100 text-purple-700',
  not_interested: 'bg-yellow-100 text-yellow-700',
  bounced: 'bg-red-100 text-red-700',
};

const STATUS_LABELS: Record<ProspectStatus, string> = {
  new: 'New',
  pending_review: 'Pending Review',
  approved: 'Approved',
  rejected: 'Rejected',
  snoozed: 'Snoozed',
  contacted: 'Contacted',
  replied: 'Replied',
  meeting_booked: 'Meeting Booked',
  not_interested: 'Not Interested',
  bounced: 'Bounced',
};

const CHANNEL_ICONS: Record<string, React.ElementType> = {
  email: Mail,
  voice: Phone,
  linkedin: Linkedin,
};

function ScoreCircle({ score }: { score?: number }) {
  if (!score) return <span className="text-sm text-sand-400">—</span>;
  const color = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600';
  const bg = score >= 80 ? 'stroke-green-600' : score >= 60 ? 'stroke-yellow-500' : 'stroke-red-600';
  const circumference = 2 * Math.PI * 14;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-9 h-9 flex items-center justify-center">
      <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="14" fill="none" strokeWidth="3" className="stroke-gray-100" />
        <circle
          cx="18" cy="18" r="14" fill="none" strokeWidth="3"
          className={bg}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className={cn('absolute text-xs font-semibold', color)}>{score}</span>
    </div>
  );
}

function formatRelativeTime(dateString?: string): string {
  if (!dateString) return 'Never';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ProspectsPage() {
  const {
    filters,
    setFilters,
    selectedProspectIds,
    selectProspects,
    toggleProspectSelection,
    clearSelection,
    bulkUpdateStatus,
  } = useProspectStore();

  const filteredProspects = useFilteredProspects();
  const { openProspectDrawer } = useUiStore();
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [sourceFilter, setSourceFilter] = useState('all');

  const displayProspects = sourceFilter === 'all'
    ? filteredProspects
    : filteredProspects.filter((p) => p.source === sourceFilter);

  const allSelected =
    displayProspects.length > 0 &&
    displayProspects.every((p) => selectedProspectIds.includes(p.id));
  const someSelected = selectedProspectIds.length > 0;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      selectProspects(displayProspects.map((p) => p.id));
    } else {
      clearSelection();
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-sand-200">
        <h1 className="text-3xl font-serif font-bold text-ocean-900">Prospects</h1>
        <Button
          variant="primary-outline"
          leftIcon={<Upload className="w-4 h-4" />}
          onClick={() => setImportModalOpen(true)}
        >
          Import Prospects
        </Button>
      </div>

      {/* Filter bar */}
      <div className="flex items-center gap-2 px-6 py-3 border-b border-sand-200 bg-white flex-wrap">
        <div className="w-[240px]">
          <Input
            placeholder="Search prospects..."
            size="sm"
            leftIcon={<Search className="w-4 h-4" />}
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
          />
        </div>
        <div className="w-[160px]">
          <Dropdown
            options={STATUS_OPTIONS}
            value={filters.status}
            onChange={(val) => setFilters({ status: val as ProspectStatus | 'all' })}
            size="sm"
            placeholder="Status"
          />
        </div>
        <div className="w-[150px]">
          <Dropdown
            options={SOURCE_OPTIONS}
            value={sourceFilter}
            onChange={(val) => setSourceFilter(val as string)}
            size="sm"
            placeholder="Source"
          />
        </div>
        <div className="w-[200px]">
          <Dropdown
            options={TAG_OPTIONS}
            value={filters.tags}
            onChange={(val) => setFilters({ tags: val as string[] })}
            multiSelect
            size="sm"
            placeholder="Tags"
          />
        </div>
      </div>

      {/* Bulk action bar */}
      {someSelected && (
        <div className="flex items-center gap-3 px-6 py-2 bg-primary-50 border-b border-primary-200">
          <span className="text-sm font-medium text-primary-700">
            {selectedProspectIds.length} selected
          </span>
          <Button
            variant="primary"
            leftIcon={<CheckCircle className="w-3.5 h-3.5" />}
            onClick={() => bulkUpdateStatus(selectedProspectIds, 'approved')}
          >
            Approve Selected
          </Button>
          <Button
            variant="error"
            leftIcon={<XCircle className="w-3.5 h-3.5" />}
            onClick={() => bulkUpdateStatus(selectedProspectIds, 'rejected')}
          >
            Reject Selected
          </Button>
          <Button variant="tertiary" onClick={clearSelection}>
            Clear
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {displayProspects.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No prospects found"
            description="No prospects match your current filters. Try adjusting your search or import new prospects."
            actionLabel="Import Prospects"
            onAction={() => setImportModalOpen(true)}
          />
        ) : (
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr className="bg-sand-50 border-b border-sand-200">
                <th className="w-[48px] px-4 py-3 text-left">
                  <Checkbox checked={allSelected} onChange={handleSelectAll} />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-sand-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-sand-600">Company</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-sand-600">Title</th>
                <th className="px-3 py-3 text-center text-sm font-semibold text-sand-600 w-[70px]">Score</th>
                <th className="px-3 py-3 text-center text-sm font-semibold text-sand-600 w-[50px]">Ch.</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-sand-600">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-sand-600">Source</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-sand-600">Last Contact</th>
                <th className="w-[50px] px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {displayProspects.map((prospect) => {
                const isSelected = selectedProspectIds.includes(prospect.id);
                const ChIcon = CHANNEL_ICONS[prospect.channelRecommendation ?? 'email'] ?? Mail;
                return (
                  <tr
                    key={prospect.id}
                    onClick={() => openProspectDrawer(prospect.id)}
                    className={cn(
                      'h-[48px] border-b border-sand-200 cursor-pointer transition-colors duration-150',
                      'hover:bg-sand-50',
                      isSelected && 'bg-primary-50'
                    )}
                  >
                    <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={isSelected}
                        onChange={() => toggleProspectSelection(prospect.id)}
                      />
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-sand-800">
                      {prospect.firstName} {prospect.lastName}
                    </td>
                    <td className="px-4 py-2 text-sm text-sand-500">{prospect.company}</td>
                    <td className="px-4 py-2 text-sm text-sand-500">{prospect.title}</td>
                    <td className="px-3 py-2 text-center">
                      <div className="flex justify-center">
                        <ScoreCircle score={prospect.matchScore} />
                      </div>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <ChIcon className="w-4 h-4 text-sand-400 mx-auto" />
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={cn(
                          'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                          STATUS_BADGE_CLASSES[prospect.status]
                        )}
                      >
                        {STATUS_LABELS[prospect.status]}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-sand-400">
                      {prospect.source ?? '—'}
                    </td>
                    <td className="px-4 py-2 text-sm text-sand-500">
                      {formatRelativeTime(prospect.lastContactedAt)}
                    </td>
                    <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="p-1 rounded-sm text-sand-400 hover:text-sand-600 hover:bg-sand-100 transition-colors"
                        aria-label="More actions"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <ProspectDetailDrawer />
      <ProspectImportModal open={importModalOpen} onClose={() => setImportModalOpen(false)} />
    </div>
  );
}
