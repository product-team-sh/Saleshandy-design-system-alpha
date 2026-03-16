'use client';

import React from 'react';
import { Divider } from '@/components/ui/Divider';
import { TimelineEventItem } from './TimelineEvent';
import { useEventsForProspect } from '@/stores/useTimelineStore';

interface TimelineFeedProps {
  prospectId: string;
}

function groupEventsByDay(events: { timestamp: string }[]): Record<string, typeof events> {
  const groups: Record<string, typeof events> = {};
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  events.forEach((event) => {
    const date = new Date(event.timestamp).toDateString();
    let label = date;
    if (date === today) label = 'Today';
    else if (date === yesterday) label = 'Yesterday';
    else label = new Date(event.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    if (!groups[label]) groups[label] = [];
    groups[label].push(event);
  });

  return groups;
}

export function TimelineFeed({ prospectId }: TimelineFeedProps) {
  const events = useEventsForProspect(prospectId);

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-16">
        <div className="w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mb-4">
          <span className="text-sand-400 text-xl">⏳</span>
        </div>
        <h3 className="text-xl font-semibold text-sand-800">No activity yet</h3>
        <p className="text-base text-sand-500 mt-2 max-w-sm">
          This prospect has been approved but outreach hasn&apos;t started yet.
        </p>
      </div>
    );
  }

  const grouped = groupEventsByDay(events);

  return (
    <div className="space-y-2">
      {Object.entries(grouped).map(([day, dayEvents]) => (
        <div key={day}>
          <div className="flex items-center gap-3 py-3">
            <div className="flex-1 h-px bg-sand-200" />
            <span className="text-sm font-semibold text-sand-400 shrink-0">{day}</span>
            <div className="flex-1 h-px bg-sand-200" />
          </div>
          {dayEvents.map((event: any) => (
            <TimelineEventItem key={event.id} event={event} />
          ))}
        </div>
      ))}
    </div>
  );
}
