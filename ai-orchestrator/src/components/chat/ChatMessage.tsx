'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { MessageRenderer } from '@/components/chat/MessageRenderer';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const isAi = message.role === 'ai';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center py-1">
        <div className="text-xs font-medium text-sand-400 bg-sand-100 border border-sand-200 rounded-full px-3 py-1">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex gap-3 animate-message', isUser ? 'justify-end' : 'justify-start')}>
      {/* AI avatar — ocean-500 → mint gradient */}
      {isAi && (
        <div
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base shadow-sm"
          style={{ background: 'linear-gradient(135deg, #2563EB 0%, #3CCBA0 100%)' }}
          aria-label="Outbound Octopus AI"
        >
          🐙
        </div>
      )}

      <div className={cn('flex flex-col', isUser ? 'items-end' : 'items-start', 'max-w-[76%]')}>
        {/* Bubble */}
        <div
          className={cn(
            'px-4 py-3 text-sm leading-relaxed',
            isUser && 'bg-ocean-500 text-white rounded-[16px] rounded-tr-sm shadow-sm',
            isAi && 'bg-white text-sand-700 border border-sand-200 rounded-[16px] rounded-tl-sm shadow-xs'
          )}
        >
          <MessageRenderer message={message} />
        </div>

        {/* Timestamp — AI only */}
        {isAi && (
          <span className="font-mono text-[10px] text-sand-400 mt-1 ml-0.5">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        )}
      </div>

      {/* Spacer for user messages */}
      {isUser && <div className="w-9 flex-shrink-0" />}
    </div>
  );
}
