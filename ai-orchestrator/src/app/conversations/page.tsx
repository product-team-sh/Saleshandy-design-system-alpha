'use client';

import React, { useState } from 'react';
import { AlertTriangle, MessageSquare, CheckCircle, Cpu, ExternalLink, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { TextArea } from '@/components/ui/TextArea';
import { Divider } from '@/components/ui/Divider';
import { ConversationListItem } from '@/components/conversations/ConversationListItem';
import { ConversationThread } from '@/components/conversations/ConversationThread';
import { AiReplyBanner } from '@/components/conversations/AiReplyBanner';
import {
  useConversationStore,
  useFilteredConversations,
} from '@/stores/useConversationStore';
import type { ConversationStatus } from '@/types/conversation';

const STATUS_TABS: { key: ConversationStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'needs_attention', label: 'Needs Attention' },
  { key: 'escalated', label: 'Escalated' },
  { key: 'ai_handling', label: 'AI Handling' },
  { key: 'resolved', label: 'Resolved' },
];

const SENTIMENT_OPTIONS = [
  { value: 'all', label: 'All Sentiments' },
  { value: 'positive', label: 'Positive' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'negative', label: 'Negative' },
];

const CAMPAIGN_OPTIONS = [
  { value: '', label: 'All Campaigns' },
  { value: 'camp-001', label: 'SaaS Founders Outreach' },
  { value: 'camp-005', label: 'Partner Re-engagement' },
];

const STATUS_BADGE_MAP: Record<ConversationStatus, { variant: string; label: string }> = {
  needs_attention: { variant: 'warning', label: 'Needs Attention' },
  escalated: { variant: 'error', label: 'Escalated' },
  ai_handling: { variant: 'info', label: 'AI Handling' },
  resolved: { variant: 'success', label: 'Resolved' },
};

export default function ConversationsPage() {
  const {
    conversations,
    activeConversationId,
    filters,
    setActiveConversation,
    setFilters,
    sendReply,
    approveAiReply,
    dismissPendingReply,
    snoozeConversation,
    markResolved,
  } = useConversationStore();

  const filtered = useFilteredConversations();
  const [replyText, setReplyText] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConversationId);

  const needsAttentionCount = conversations.filter(
    (c) => c.status === 'needs_attention' || c.status === 'escalated'
  ).length;
  const aiHandlingCount = conversations.filter((c) => c.status === 'ai_handling').length;

  const handleSendReply = () => {
    if (!activeConversationId || !replyText.trim()) return;
    sendReply(activeConversationId, replyText.trim());
    setReplyText('');
    setShowReplyBox(false);
  };

  return (
    <div className="flex h-full bg-white">
      {/* Left panel */}
      <div className="w-[380px] shrink-0 h-full border-r border-sand-200 flex flex-col">
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-sand-200">
          <h1 className="text-xl font-serif text-ocean-900 mb-1">Conversations</h1>
          <p className="text-base text-sand-500">
            Your AI is handling{' '}
            <span className="font-medium text-sand-700">{aiHandlingCount}</span> conversations.{' '}
            {needsAttentionCount > 0 ? (
              <span className="font-medium text-red-600">{needsAttentionCount} need your attention.</span>
            ) : (
              <span className="text-green-600 font-medium">All caught up.</span>
            )}
          </p>
        </div>

        {/* Status tabs */}
        <div className="px-4 border-b border-sand-200 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {STATUS_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilters({ status: tab.key })}
                className={cn(
                  'py-2.5 px-3 text-base font-medium border-b-2 transition-colors duration-150 whitespace-nowrap',
                  filters.status === tab.key
                    ? 'border-primary-700 text-primary-700'
                    : 'border-transparent text-sand-500 hover:text-sand-700'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary filters */}
        <div className="px-4 py-2 border-b border-sand-100 flex gap-2">
          <div className="flex-1">
            <Dropdown
              options={CAMPAIGN_OPTIONS}
              value={filters.campaignId ?? ''}
              onChange={(v) => setFilters({ campaignId: v as string || null })}
              size="sm"
              placeholder="Campaign"
            />
          </div>
          <div className="flex-1">
            <Dropdown
              options={SENTIMENT_OPTIONS}
              value={filters.sentiment}
              onChange={(v) => setFilters({ sentiment: v as any })}
              size="sm"
              placeholder="Sentiment"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 px-6">
              <MessageSquare className="w-10 h-10 text-sand-300 mb-3" />
              <p className="text-base font-medium text-sand-500">No conversations match your filters</p>
              <button
                className="text-sm text-primary-700 mt-2 hover:underline"
                onClick={() => setFilters({ status: 'all', sentiment: 'all', campaignId: null })}
              >
                Clear filters
              </button>
            </div>
          ) : (
            filtered.map((conv) => (
              <ConversationListItem
                key={conv.id}
                conversation={conv}
                isActive={activeConversationId === conv.id}
                onClick={() => {
                  setActiveConversation(conv.id);
                  setShowReplyBox(false);
                  setReplyText('');
                }}
              />
            ))
          )}
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeConv ? (
          <>
            {/* Prospect header */}
            <div className="px-6 py-4 border-b border-sand-200 shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={activeConv.prospectName} size="lg" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-sand-800">{activeConv.prospectName}</h2>
                      <Badge variant={STATUS_BADGE_MAP[activeConv.status].variant as any}>
                        {STATUS_BADGE_MAP[activeConv.status].label}
                      </Badge>
                    </div>
                    <p className="text-sm text-sand-500">
                      {activeConv.prospectTitle} · {activeConv.company}
                    </p>
                    <p className="text-xs text-sand-400 mt-0.5">
                      {activeConv.campaignName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeConv.status === 'escalated' && (
                    <Button
                      variant="primary"
                      onClick={() => markResolved(activeConv.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Mark Resolved
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => snoozeConversation(activeConv.id)}
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    Snooze
                  </Button>
                </div>
              </div>

              {/* Escalation reason */}
              {activeConv.escalationReason && (
                <div className="mt-3 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-base text-red-700">{activeConv.escalationReason}</p>
                </div>
              )}
            </div>

            {/* Thread */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ConversationThread conversation={activeConv} />
            </div>

            {/* Action bar */}
            <div className="px-6 py-4 border-t border-sand-200 space-y-3 shrink-0">
              {/* AI reply banner */}
              {activeConv.pendingAiReply && (
                <AiReplyBanner
                  pendingReply={activeConv.pendingAiReply}
                  reason={activeConv.pendingAiReason}
                  onApprove={() => approveAiReply(activeConv.id)}
                  onDismiss={() => dismissPendingReply(activeConv.id)}
                  onEditAndSend={(text) => sendReply(activeConv.id, text)}
                />
              )}

              {/* Manual reply */}
              {showReplyBox ? (
                <div className="space-y-2">
                  <TextArea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply..."
                    rows={4}
                  />
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                    >
                      Send Reply
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => { setShowReplyBox(false); setReplyText(''); }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  <Button
                    variant="primary"
                    onClick={() => setShowReplyBox(true)}
                  >
                    Reply Manually
                  </Button>
                  {activeConv.status !== 'resolved' && (
                    <Button
                      variant="secondary"
                      onClick={() => snoozeConversation(activeConv.id)}
                    >
                      <Cpu className="w-4 h-4 mr-1" />
                      Let AI Continue
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => markResolved(activeConv.id)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Mark Resolved
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-7 h-7 text-sand-400" />
              </div>
              <h3 className="text-xl font-serif text-ocean-900">Select a conversation</h3>
              <p className="text-base text-sand-500 mt-2 max-w-sm">
                Choose a conversation from the list to view the full thread and take action.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
