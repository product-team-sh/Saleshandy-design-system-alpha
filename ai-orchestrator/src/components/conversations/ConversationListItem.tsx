'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import type { Conversation } from '@/types/conversation';

const SENTIMENT_COLORS = {
  positive: 'bg-green-500',
  neutral: 'bg-sand-400',
  negative: 'bg-red-500',
  unknown: 'bg-sand-300',
};

const CHANNEL_LABELS: Record<string, string> = {
  email: 'Email',
  linkedin: 'LinkedIn',
  voice: 'Voice',
  sms: 'SMS',
};

function formatTime(ts: string): string {
  const date = new Date(ts);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (diffDays === 0) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

interface ConversationListItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export function ConversationListItem({ conversation: c, isActive, onClick }: ConversationListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-3 border-b border-sand-100 transition-colors duration-fast',
        isActive
          ? 'bg-primary-50 border-l-[3px] border-l-primary-700'
          : 'hover:bg-sand-50 border-l-[3px] border-l-transparent'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <Avatar name={c.prospectName} size="md" />
          {c.isUnread && (
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-primary-700 rounded-full border-2 border-white" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={cn(
              'text-base font-medium truncate',
              isActive ? 'text-primary-700' : 'text-sand-800',
              c.isUnread && 'font-semibold text-sand-900'
            )}>
              {c.prospectName}
            </span>
            <span className="text-xs text-sand-400 shrink-0">{formatTime(c.timestamp)}</span>
          </div>

          <p className="text-sm text-sand-500 truncate">{c.company}</p>

          <div className="flex items-center gap-1.5 mt-1">
            <div className={cn('w-2 h-2 rounded-full shrink-0', SENTIMENT_COLORS[c.sentiment])} />
            <span className="text-sm text-sand-400 truncate flex-1">{c.preview}</span>
          </div>

          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span className="text-xs text-sand-400 bg-sand-100 px-1.5 py-0.5 rounded">
              {CHANNEL_LABELS[c.channel]}
            </span>
            {c.isEscalated && (
              <span className="text-xs font-medium text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                Needs you
              </span>
            )}
            {c.pendingAiReply && (
              <span className="text-xs font-medium text-yellow-700 bg-yellow-50 px-1.5 py-0.5 rounded">
                AI reply ready
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
