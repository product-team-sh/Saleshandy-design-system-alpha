'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { Cpu } from 'lucide-react';
import type { Conversation, ConversationMessage } from '@/types/conversation';

const CHANNEL_ICONS: Record<string, string> = {
  email: '✉',
  linkedin: 'in',
  voice: '📞',
  sms: '💬',
};

function groupMessagesByDay(messages: ConversationMessage[]) {
  const groups: { day: string; messages: ConversationMessage[] }[] = [];
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  messages.forEach((msg) => {
    const date = new Date(msg.timestamp);
    let label = date.toDateString();
    if (label === today) label = 'Today';
    else if (label === yesterday) label = 'Yesterday';
    else label = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const last = groups[groups.length - 1];
    if (last && last.day === label) {
      last.messages.push(msg);
    } else {
      groups.push({ day: label, messages: [msg] });
    }
  });
  return groups;
}

interface ConversationThreadProps {
  conversation: Conversation;
}

export function ConversationThread({ conversation }: ConversationThreadProps) {
  const groups = groupMessagesByDay(conversation.messages);

  return (
    <div className="space-y-4">
      {groups.map(({ day, messages }) => (
        <div key={day}>
          {/* Day separator */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-sand-200" />
            <span className="text-xs font-semibold text-sand-400 shrink-0">{day}</span>
            <div className="flex-1 h-px bg-sand-200" />
          </div>

          {messages.map((msg) => {
            const isOutbound = msg.direction === 'outbound';
            const isVoiceLog = msg.channel === 'voice' && isOutbound;

            if (isVoiceLog) {
              return (
                <div key={msg.id} className="flex items-center gap-2 py-2 px-3 bg-lavender-soft border border-lavender rounded-md text-sm text-lavender-dark my-2">
                  <span>📞</span>
                  <span>{msg.content}</span>
                  {msg.aiGenerated && <Cpu className="w-3 h-3 text-purple-400 ml-auto shrink-0" />}
                </div>
              );
            }

            return (
              <div
                key={msg.id}
                className={cn(
                  'flex flex-col max-w-[80%] mb-3',
                  isOutbound ? 'ml-auto items-end' : 'items-start'
                )}
              >
                {msg.subject && (
                  <span className="text-xs text-sand-400 mb-1 px-1">
                    {isOutbound ? '→' : '←'} {msg.subject}
                  </span>
                )}
                <div
                  className={cn(
                    'rounded-md px-4 py-3 text-sm leading-relaxed',
                    isOutbound
                      ? 'bg-primary-700 text-white rounded-lg rounded-tr-sm'
                      : 'bg-sand-100 text-sand-800 rounded-lg rounded-tl-sm'
                  )}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
                <div className="flex items-center gap-1 mt-1 px-1">
                  {msg.aiGenerated && isOutbound && (
                    <Cpu className="w-3 h-3 text-sand-400" />
                  )}
                  <span className="text-xs text-sand-400">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
