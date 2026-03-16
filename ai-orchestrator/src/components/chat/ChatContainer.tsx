'use client';

import React, { useEffect, useRef } from 'react';
import { useMessagesForCampaign, useIsAiThinking, useChatStore } from '@/stores/useChatStore';
import { useActiveCampaign } from '@/stores/useCampaignStore';
import { handleUserMessage } from '@/lib/mock-ai';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { AiThinkingIndicator } from '@/components/chat/AiThinkingIndicator';
import { AiSuggestionChips } from '@/components/chat/AiSuggestionChips';
import { cn } from '@/lib/cn';

const RECIPES = [
  {
    type: 'lead_gen',
    label: 'Lead Generation',
    description: 'Find and reach new prospects matching your ICP',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    prompt: 'I want to create a lead generation campaign targeting SaaS companies with 50-500 employees',
  },
  {
    type: 'retargeting',
    label: 'Re-engage Prospects',
    description: 'Warm up leads who showed interest but went cold',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
      </svg>
    ),
    prompt: 'I want to re-engage prospects who opened my emails but never replied in the last 90 days',
  },
  {
    type: 'abm',
    label: 'Account-Based',
    description: 'Go deep on a short list of high-value target accounts',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    prompt: 'I want to run an ABM campaign targeting 20 specific enterprise accounts in fintech',
  },
  {
    type: 'custom',
    label: 'Custom Campaign',
    description: 'Describe your goal and AI will build the plan',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
      </svg>
    ),
    prompt: 'I want to create a custom outreach campaign',
  },
];

interface ChatContainerProps {
  campaignId: string;
  compact?: boolean;
}

export function ChatContainer({ campaignId, compact }: ChatContainerProps) {
  const messages = useMessagesForCampaign(campaignId);
  const isThinking = useIsAiThinking(campaignId);
  const addUserMessage = useChatStore((s) => s.addUserMessage);
  const campaign = useActiveCampaign();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleRecipe = (prompt: string) => {
    addUserMessage(campaignId, prompt);
    handleUserMessage(campaignId, prompt);
  };

  const handleSuggestion = (suggestion: string) => {
    addUserMessage(campaignId, suggestion);
    handleUserMessage(campaignId, suggestion);
  };

  return (
    <div className="flex flex-col h-full">
      {compact && (
        <div className="px-3 py-2 border-b border-sand-200 bg-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary-700 flex items-center justify-center">
              <span className="text-xs leading-none">🐙</span>
            </div>
            <span className="text-sm font-semibold text-sand-800">AI Assistant</span>
          </div>
        </div>
      )}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-sand-50">
        {messages.length === 0 ? (
          <div className={cn(
            'flex flex-col items-center justify-center h-full pb-8',
            compact ? 'px-3' : 'px-6'
          )}>
            <div className="text-center mb-6">
              {!compact && (
                <div className="w-12 h-12 rounded-xl bg-primary-700 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-2xl leading-none">🐙</span>
                </div>
              )}
              <h2 className={cn(
                'font-semibold text-sand-900 mb-2',
                compact ? 'text-base' : 'text-2xl'
              )}>
                What is your outreach goal?
              </h2>
              <p className={cn('text-sand-500', compact ? 'text-xs' : 'text-base max-w-md')}>
                Pick a recipe or describe your campaign below.
              </p>
            </div>
            <div className={cn(
              'gap-2 w-full',
              compact ? 'flex flex-col' : 'grid grid-cols-2 gap-3 max-w-2xl'
            )}>
              {RECIPES.map((r) => (
                <button
                  key={r.type}
                  onClick={() => handleRecipe(r.prompt)}
                  className={cn(
                    'bg-white border border-sand-200 rounded-lg text-left group',
                    'hover:border-primary-700 hover:shadow-sm transition-all duration-150',
                    compact ? 'p-3 flex items-center gap-3' : 'p-4'
                  )}
                >
                  <div className={cn(
                    'rounded-md bg-primary-50 text-primary-700 flex items-center justify-center group-hover:bg-primary-100 transition-colors flex-shrink-0',
                    compact ? 'w-7 h-7' : 'w-8 h-8 mb-3'
                  )}>
                    {r.icon}
                  </div>
                  <div className={compact ? 'min-w-0' : ''}>
                    <p className={cn('font-semibold text-sand-800', compact ? 'text-xs' : 'text-sm mb-1')}>{r.label}</p>
                    {!compact && <p className="text-xs text-sand-500 leading-relaxed">{r.description}</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className={cn('p-4 space-y-4 w-full', !compact && 'max-w-3xl mx-auto')}>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isThinking && <AiThinkingIndicator />}
          </div>
        )}
      </div>
      <div className={cn('w-full', !compact && 'max-w-3xl mx-auto')}>
        {messages.length > 0 && (
          <AiSuggestionChips campaignStatus={campaign?.status} onSelect={handleSuggestion} />
        )}
        <ChatInput campaignId={campaignId} />
      </div>
    </div>
  );
}
