'use client';

import React, { useRef, useState, useCallback, KeyboardEvent } from 'react';
import { cn } from '@/lib/cn';
import { useIsAiThinking, useChatStore } from '@/stores/useChatStore';
import { handleUserMessage } from '@/lib/mock-ai';
import { Spinner } from '@/components/ui/Spinner';

interface ChatInputProps {
  campaignId: string;
  onSend?: (content: string) => void;
}

export function ChatInput({ campaignId, onSend }: ChatInputProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isThinking = useIsAiThinking(campaignId);
  const addUserMessage = useChatStore((s) => s.addUserMessage);

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    const lineHeight = 22;
    const maxHeight = lineHeight * 6;
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
  }, []);

  const handleSend = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    addUserMessage(campaignId, trimmed);
    onSend?.(trimmed);
    handleUserMessage(campaignId, trimmed);
  }, [value, campaignId, addUserMessage, onSend]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 bg-white border-t border-sand-200 p-4">
      <div className="flex items-end gap-2">
        <button
          type="button"
          className="flex-shrink-0 p-2 text-sand-400 hover:text-sand-600 transition-colors"
          aria-label="Attach file"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </button>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            resizeTextarea();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          rows={1}
          className="w-full border border-sand-200 rounded-md px-3 py-2 text-base resize-none focus:border-primary-700 focus:shadow-glow outline-none"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!value.trim() && !isThinking}
          className={cn(
            'flex-shrink-0 p-2 rounded-sm transition-all',
            isThinking
              ? 'animate-send-glow bg-purple-600 text-white'
              : 'bg-primary-700 text-white hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed'
          )}
          aria-label="Send message"
        >
          {isThinking ? (
            <Spinner size="sm" className="text-white" />
          ) : (
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
