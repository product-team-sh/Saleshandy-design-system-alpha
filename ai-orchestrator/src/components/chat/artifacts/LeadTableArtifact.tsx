'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { useChatStore } from '@/stores/useChatStore';
import { handleUserMessage } from '@/lib/mock-ai';

interface Lead {
  name: string;
  company: string;
  title: string;
  icpScore: number;
  location: string;
}

interface LeadTableArtifactProps {
  campaignId: string;
  leads: Lead[];
}

function IcpScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? 'bg-green-50 text-green-700 border-green-200'
      : score >= 60
      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
      : 'bg-sand-100 text-sand-600 border-sand-200';
  return (
    <span className={cn('text-xs font-semibold border rounded px-1.5 py-0.5', color)}>
      {score}
    </span>
  );
}

export function LeadTableArtifact({ campaignId, leads }: LeadTableArtifactProps) {
  const [confirmed, setConfirmed] = useState(false);
  const addUserMessage = useChatStore((s) => s.addUserMessage);

  const handleAction = (action: string) => {
    addUserMessage(campaignId, action);
    handleUserMessage(campaignId, action);
    if (action === 'These leads look right') setConfirmed(true);
  };

  return (
    <div className="mt-3 rounded-xl border border-sand-200 bg-[#FAFAF9] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-sand-100 bg-white">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-ocean-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span className="text-xs font-semibold text-sand-700">
            Sample Prospects
          </span>
          {confirmed && (
            <span className="text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
              Confirmed
            </span>
          )}
        </div>
        <span className="text-xs text-sand-400">{leads.length} preview leads</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-sand-50 border-b border-sand-100">
              <th className="text-left px-4 py-2 text-sand-400 font-semibold uppercase tracking-wide">
                Name
              </th>
              <th className="text-left px-4 py-2 text-sand-400 font-semibold uppercase tracking-wide">
                Company
              </th>
              <th className="text-left px-4 py-2 text-sand-400 font-semibold uppercase tracking-wide">
                Title
              </th>
              <th className="text-center px-4 py-2 text-sand-400 font-semibold uppercase tracking-wide">
                ICP
              </th>
              <th className="text-left px-4 py-2 text-sand-400 font-semibold uppercase tracking-wide hidden sm:table-cell">
                Location
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, i) => (
              <tr
                key={lead.name}
                className={cn(
                  'border-b border-sand-100 last:border-0',
                  i % 2 === 0 ? 'bg-white' : 'bg-[#FAFAF9]'
                )}
              >
                <td className="px-4 py-2.5 font-medium text-sand-800">{lead.name}</td>
                <td className="px-4 py-2.5 text-sand-600">{lead.company}</td>
                <td className="px-4 py-2.5 text-sand-500">{lead.title}</td>
                <td className="px-4 py-2.5 text-center">
                  <IcpScoreBadge score={lead.icpScore} />
                </td>
                <td className="px-4 py-2.5 text-sand-400 hidden sm:table-cell">
                  {lead.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      {!confirmed && (
        <div className="flex items-center gap-2 px-4 py-3 border-t border-sand-100 bg-white">
          <button
            onClick={() => handleAction('These leads look right')}
            className="flex items-center gap-1.5 bg-ocean-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-ocean-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
            </svg>
            Looks right
          </button>
          <button
            onClick={() => handleAction('Adjust targeting to find better leads')}
            className="text-xs font-medium text-sand-600 border border-sand-200 px-3.5 py-2 rounded-lg hover:bg-sand-50 transition-colors"
          >
            Adjust targeting
          </button>
          <span className="ml-auto text-xs text-sand-400">
            Full list sourced after approval
          </span>
        </div>
      )}
    </div>
  );
}
