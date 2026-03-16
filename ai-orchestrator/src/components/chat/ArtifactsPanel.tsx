'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { ChatMessage, MessageContentType } from '@/types/chat';

interface ArtifactsPanelProps {
  onClose: () => void;
  messages: ChatMessage[];
}

const ARTIFACT_TYPES: MessageContentType[] = [
  'email_preview',
  'icp_card',
  'lead_table',
  'sequence_overview',
  'email_accounts_health',
  'campaign_summary',
  'brain_card',
];

const TYPE_LABELS: Record<string, string> = {
  email_preview: 'Emails',
  icp_card: 'ICP',
  lead_table: 'Leads',
  sequence_overview: 'Sequences',
  email_accounts_health: 'Accounts',
  campaign_summary: 'Campaigns',
  brain_card: 'Brain',
};

const TYPE_ICONS: Record<string, string> = {
  email_preview: '✉️',
  icp_card: '👤',
  lead_table: '🔍',
  sequence_overview: '📋',
  email_accounts_health: '📬',
  campaign_summary: '🚀',
  brain_card: '🧠',
};

const TYPE_COLORS: Record<string, string> = {
  email_preview: 'bg-ocean-50 border-purple-200 text-ocean-600',
  icp_card: 'bg-pink-50 border-pink-200 text-pink-700',
  lead_table: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  sequence_overview: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  email_accounts_health: 'bg-blue-50 border-blue-200 text-blue-700',
  campaign_summary: 'bg-orange-50 border-orange-200 text-orange-700',
  brain_card: 'bg-amber-50 border-amber-200 text-amber-700',
};

function ArtifactCard({ message }: { message: ChatMessage }) {
  const icon = TYPE_ICONS[message.contentType] ?? '📄';
  const color = TYPE_COLORS[message.contentType] ?? 'bg-sand-100 border-sand-200 text-sand-700';
  const label = TYPE_LABELS[message.contentType] ?? 'Artifact';

  let title = '';
  let subtitle = '';

  switch (message.contentType) {
    case 'email_preview':
      title = message.metadata?.emailSubject ?? 'Email Draft';
      subtitle = `To: ${message.metadata?.emailTo ?? '—'}`;
      break;
    case 'icp_card':
      title = message.metadata?.icpTitle ?? 'ICP Profile';
      subtitle = message.metadata?.icpCompanyType ?? '';
      break;
    case 'lead_table':
      title = `${message.metadata?.leads?.length ?? 0} Leads Found`;
      subtitle = 'ICP-matched prospects';
      break;
    case 'sequence_overview':
      title = message.metadata?.sequenceName ?? 'Sequence';
      subtitle = `${message.metadata?.sequenceSteps?.length ?? 0} steps`;
      break;
    case 'email_accounts_health':
      title = 'Email Accounts';
      subtitle = `${message.metadata?.emailAccounts?.length ?? 0} accounts`;
      break;
    case 'campaign_summary':
      title = 'Campaign Summary';
      subtitle = message.metadata?.channel ?? 'Email';
      break;
    case 'brain_card':
      title = 'Brain Update';
      subtitle = message.metadata?.brainTopic ?? '';
      break;
    default:
      title = label;
  }

  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className={cn(
        'rounded-xl border p-3 transition-all duration-200',
        'hover:-translate-y-[1px] hover:shadow-sm cursor-default',
        color
      )}
    >
      <div className="flex items-start gap-2">
        <span className="text-base flex-shrink-0">{icon}</span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold truncate">{title}</p>
          {subtitle && <p className="text-[10px] opacity-70 truncate mt-0.5">{subtitle}</p>}
        </div>
        <span className="text-[10px] opacity-50 flex-shrink-0">{time}</span>
      </div>
    </div>
  );
}

export function ArtifactsPanel({ onClose, messages }: ArtifactsPanelProps) {
  const [filter, setFilter] = useState<string | null>(null);

  const artifacts = messages.filter(
    (m) => m.role === 'ai' && ARTIFACT_TYPES.includes(m.contentType as MessageContentType)
  );

  const availableTypes = [...new Set(artifacts.map((m) => m.contentType))];
  const filtered = filter ? artifacts.filter((m) => m.contentType === filter) : artifacts;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-30 bg-black/20 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed left-16 top-0 bottom-0 z-40 w-72 flex flex-col bg-white border-r-2 border-sand-300 shadow-lg"
        style={{
          animation: 'slideInLeft 280ms cubic-bezier(0.34, 1.3, 0.64, 1) both',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2 border-sand-200 bg-sand-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-soft border border-yellow-300 flex items-center justify-center text-sm">
              🗂️
            </div>
            <span className="text-sm font-bold text-sand-700">Artifacts</span>
            {artifacts.length > 0 && (
              <span className="text-xs font-bold bg-ocean-500 text-white rounded-full px-1.5 py-0.5 min-w-[20px] text-center">
                {artifacts.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-sand-200 transition-colors text-sand-500 hover:text-sand-700"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filters */}
        {availableTypes.length > 1 && (
          <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-sand-200 overflow-x-auto">
            <button
              onClick={() => setFilter(null)}
              className={cn(
                'text-[10px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 transition-all',
                !filter
                  ? 'bg-ocean-500 text-white border-purple-600'
                  : 'bg-white border-sand-200 text-sand-500 hover:border-sand-300'
              )}
            >
              All
            </button>
            {availableTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type === filter ? null : type)}
                className={cn(
                  'text-[10px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 transition-all',
                  filter === type
                    ? 'bg-ocean-500 text-white border-purple-600'
                    : 'bg-white border-sand-200 text-sand-500 hover:border-sand-300'
                )}
              >
                {TYPE_ICONS[type]} {TYPE_LABELS[type] ?? type}
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <span className="text-3xl mb-3">🗂️</span>
              <p className="text-xs font-semibold text-sand-500">No artifacts yet</p>
              <p className="text-[11px] text-sand-500 mt-1 max-w-[160px]">
                Artifacts appear here as the conversation builds — emails, leads, sequences and more.
              </p>
            </div>
          ) : (
            filtered.map((msg) => <ArtifactCard key={msg.id} message={msg} />)
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from { transform: translateX(-24px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
