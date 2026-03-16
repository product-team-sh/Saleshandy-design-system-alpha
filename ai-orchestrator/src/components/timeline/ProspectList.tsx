'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Avatar } from '@/components/ui/Avatar';
import { useProspectStore } from '@/stores/useProspectStore';
import { useTimelineStore } from '@/stores/useTimelineStore';
import type { Prospect } from '@/types/prospect';

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'contacted', label: 'Active' },
  { value: 'replied', label: 'Replied' },
  { value: 'meeting_booked', label: 'Meeting Booked' },
  { value: 'snoozed', label: 'Snoozed' },
];

function formatTime(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diffDays === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function ProspectList() {
  const prospects = useProspectStore((s) => Object.values(s.prospects));
  const {
    activeProspectId,
    setActiveProspect,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    events,
  } = useTimelineStore();

  const filtered = prospects
    .filter((p) => filterStatus === 'all' || p.status === filterStatus)
    .filter(
      (p) =>
        searchQuery === '' ||
        `${p.firstName} ${p.lastName} ${p.company}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aLast = events.filter((e) => e.prospectId === a.id).sort((x, y) => new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime())[0];
      const bLast = events.filter((e) => e.prospectId === b.id).sort((x, y) => new Date(y.timestamp).getTime() - new Date(x.timestamp).getTime())[0];
      return (bLast ? new Date(bLast.timestamp).getTime() : 0) - (aLast ? new Date(aLast.timestamp).getTime() : 0);
    });

  const getLastActivity = (p: Prospect) => {
    const prospectEvents = events
      .filter((e) => e.prospectId === p.id)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return prospectEvents[0];
  };

  return (
    <div className="w-[350px] h-full border-r border-sand-200 flex flex-col bg-white shrink-0">
      {/* Search */}
      <div className="p-4 border-b border-sand-200">
        <Input
          placeholder="Search prospects..."
          size="sm"
          leftIcon={<Search className="w-4 h-4" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter */}
      <div className="px-4 py-2 border-b border-sand-200">
        <Dropdown
          options={FILTER_OPTIONS}
          value={filterStatus}
          onChange={(val) => setFilterStatus(val as string)}
          size="sm"
          placeholder="Filter"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((prospect) => {
          const isActive = activeProspectId === prospect.id;
          const lastEvent = getLastActivity(prospect);
          return (
            <button
              key={prospect.id}
              type="button"
              onClick={() => setActiveProspect(prospect.id)}
              className={cn(
                'w-full text-left px-4 py-3 border-b border-sand-100 transition-colors duration-fast',
                isActive
                  ? 'bg-primary-50 border-l-[3px] border-l-primary-700'
                  : 'hover:bg-sand-50 border-l-[3px] border-l-transparent'
              )}
            >
              <div className="flex items-start gap-3">
                <Avatar name={`${prospect.firstName} ${prospect.lastName}`} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={cn('text-base font-medium truncate', isActive ? 'text-primary-700' : 'text-sand-800')}>
                      {prospect.firstName} {prospect.lastName}
                    </span>
                    <span className="text-sm text-sand-400 shrink-0 ml-2">
                      {lastEvent ? formatTime(lastEvent.timestamp) : ''}
                    </span>
                  </div>
                  <p className="text-sm text-sand-500 truncate">
                    {prospect.company} · {prospect.title}
                  </p>
                  {lastEvent && (
                    <p className="text-sm text-sand-400 italic truncate mt-0.5">
                      {lastEvent.title}
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
