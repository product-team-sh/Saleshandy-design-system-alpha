'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { useChatStore } from '@/stores/useChatStore';
import { handleUserMessage } from '@/lib/mock-ai';

interface GuidedStartViewProps {
  campaignId: string;
}

const templates = [
  {
    type: 'lead_gen',
    label: 'Lead Generation',
    description: 'Find and reach new prospects matching your ideal customer profile',
    color: 'text-purple-600',
    icon: (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    type: 'retargeting',
    label: 'Retargeting',
    description: 'Re-engage prospects who showed interest but did not convert',
    color: 'text-purple-600',
    icon: (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
      </svg>
    ),
  },
  {
    type: 'abm',
    label: 'ABM',
    description: 'Focus outreach on high-value target accounts',
    color: 'text-purple-600',
    icon: (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    type: 'custom',
    label: 'Custom',
    description: 'Build a campaign from scratch with AI guidance',
    color: 'text-purple-600',
    icon: (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
      </svg>
    ),
  },
];

export function GuidedStartView({ campaignId }: GuidedStartViewProps) {
  const addUserMessage = useChatStore((s) => s.addUserMessage);

  const handleCardClick = (type: string, label: string) => {
    const content = `I want to create a ${label.toLowerCase()} campaign`;
    addUserMessage(campaignId, content);
    handleUserMessage(campaignId, content);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-6">
      {templates.map((t) => (
        <button
          key={t.type}
          onClick={() => handleCardClick(t.type, t.label)}
          className={cn(
            'border border-sand-200 rounded-lg p-6 text-left',
            'hover:border-primary-700 hover:bg-primary-50',
            'cursor-pointer transition-all duration-150'
          )}
        >
          <div className={cn('mb-3', t.color)}>{t.icon}</div>
          <h3 className="text-sm font-semibold text-sand-800 mb-1">
            {t.label}
          </h3>
          <p className="text-xs text-sand-500 leading-relaxed">
            {t.description}
          </p>
        </button>
      ))}
    </div>
  );
}
