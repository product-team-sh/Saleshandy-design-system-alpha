'use client';

import React, { useState } from 'react';
import {
  Mail, MailOpen, Reply, Phone, PhoneMissed, Voicemail,
  Linkedin, MessageSquare, CalendarCheck, UserPlus, Cpu,
  CheckCircle, Clock, Shuffle,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import type { TimelineEvent as TEvent } from '@/types/timeline';

const EVENT_CONFIG: Record<string, { icon: React.ElementType; iconColor: string; iconBg: string }> = {
  email_sent: { icon: Mail, iconColor: 'text-primary-700', iconBg: 'bg-primary-50' },
  email_opened: { icon: MailOpen, iconColor: 'text-primary-600', iconBg: 'bg-primary-100' },
  reply_received: { icon: Reply, iconColor: 'text-green-600', iconBg: 'bg-green-50' },
  voice_call: { icon: Phone, iconColor: 'text-purple-600', iconBg: 'bg-purple-50' },
  voice_no_answer: { icon: PhoneMissed, iconColor: 'text-sand-400', iconBg: 'bg-sand-100' },
  voicemail_left: { icon: Voicemail, iconColor: 'text-purple-600', iconBg: 'bg-purple-50' },
  linkedin_dm_sent: { icon: Linkedin, iconColor: 'text-blue-600', iconBg: 'bg-blue-50' },
  linkedin_reply: { icon: Linkedin, iconColor: 'text-green-600', iconBg: 'bg-green-50' },
  sms_sent: { icon: MessageSquare, iconColor: 'text-sand-500', iconBg: 'bg-sand-100' },
  meeting_booked: { icon: CalendarCheck, iconColor: 'text-green-600', iconBg: 'bg-green-50' },
  human_handoff: { icon: UserPlus, iconColor: 'text-yellow-600', iconBg: 'bg-yellow-50' },
  ai_decision: { icon: Cpu, iconColor: 'text-sand-400', iconBg: 'bg-sand-100' },
  prospect_approved: { icon: CheckCircle, iconColor: 'text-green-600', iconBg: 'bg-green-50' },
  prospect_snoozed: { icon: Clock, iconColor: 'text-sand-400', iconBg: 'bg-sand-100' },
  channel_switch: { icon: Shuffle, iconColor: 'text-sand-500', iconBg: 'bg-sand-100' },
};

interface TimelineEventProps {
  event: TEvent;
}

export function TimelineEventItem({ event }: TimelineEventProps) {
  const [expanded, setExpanded] = useState(false);
  const config = EVENT_CONFIG[event.type] ?? EVENT_CONFIG.ai_decision;
  const Icon = config.icon;
  const isAiDecision = event.type === 'ai_decision';
  const time = new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex gap-4 py-3">
      {/* Timeline dot */}
      <div className="flex flex-col items-center shrink-0">
        <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', config.iconBg)}>
          <Icon className={cn('w-4 h-4', config.iconColor)} />
        </div>
        <div className="w-0.5 flex-1 bg-sand-200 mt-1" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-2">
        <div className="flex items-center justify-between">
          <p className={cn('text-base font-medium', isAiDecision ? 'text-sand-400 italic' : 'text-sand-800')}>
            {event.title}
          </p>
          <span className="text-sm text-sand-400 shrink-0 ml-2">{time}</span>
        </div>

        {event.detail && (
          <>
            <p className={cn('text-sm text-sand-500 mt-1', !expanded && 'line-clamp-2')}>
              {event.detail}
            </p>
            {event.detail.length > 120 && (
              <Button
                variant="primary-text"
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="mt-1 px-0"
              >
                {expanded ? 'Show less' : 'Show more'}
              </Button>
            )}
          </>
        )}

        {event.metadata?.duration && (
          <span className="text-sm text-sand-400 mt-1 inline-block">Duration: {event.metadata.duration}</span>
        )}
      </div>
    </div>
  );
}
