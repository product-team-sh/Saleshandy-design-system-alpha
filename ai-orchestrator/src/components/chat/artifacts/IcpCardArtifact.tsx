'use client';

import React, { useState } from 'react';
import { useChatStore } from '@/stores/useChatStore';
import { handleUserMessage } from '@/lib/mock-ai';

interface IcpCardArtifactProps {
  campaignId: string;
  title: string;
  companyType: string;
  industries: string[];
  painPoints: string[];
  companySize: string;
}

export function IcpCardArtifact({
  campaignId,
  title,
  companyType,
  industries,
  painPoints,
  companySize,
}: IcpCardArtifactProps) {
  const [confirmed, setConfirmed] = useState(false);
  const addUserMessage = useChatStore((s) => s.addUserMessage);

  const handleAction = (action: string) => {
    addUserMessage(campaignId, action);
    handleUserMessage(campaignId, action);
    if (action === 'This ICP looks right') setConfirmed(true);
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
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
          </svg>
          <span className="text-xs font-semibold text-sand-700">ICP Profile</span>
          {confirmed && (
            <span className="text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
              Confirmed
            </span>
          )}
        </div>
        <span className="text-xs text-sand-400">AI-generated</span>
      </div>

      {/* Profile content */}
      <div className="px-4 py-4 space-y-3">
        <div>
          <p className="text-[11px] font-semibold text-sand-400 uppercase tracking-wide mb-1">
            Target Role
          </p>
          <p className="text-sm font-semibold text-sand-800">{title}</p>
        </div>

        <div>
          <p className="text-[11px] font-semibold text-sand-400 uppercase tracking-wide mb-1">
            Company Type
          </p>
          <p className="text-sm text-sand-700">{companyType}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[11px] font-semibold text-sand-400 uppercase tracking-wide mb-1.5">
              Industries
            </p>
            <div className="flex flex-wrap gap-1">
              {industries.map((i) => (
                <span
                  key={i}
                  className="text-xs bg-ocean-50 text-ocean-500 border border-ocean-100 rounded-full px-2 py-0.5"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold text-sand-400 uppercase tracking-wide mb-1">
              Company Size
            </p>
            <p className="text-sm text-sand-700">{companySize}</p>
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold text-sand-400 uppercase tracking-wide mb-1.5">
            Pain Points
          </p>
          <ul className="space-y-1">
            {painPoints.map((p) => (
              <li key={p} className="flex items-start gap-2 text-xs text-sand-600">
                <span className="text-coral mt-0.5">•</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Actions */}
      {!confirmed && (
        <div className="flex items-center gap-2 px-4 pb-4">
          <button
            onClick={() => handleAction('This ICP looks right')}
            className="flex items-center gap-1.5 bg-ocean-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-ocean-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
            </svg>
            Looks right
          </button>
          <button
            onClick={() => handleAction('Adjust the ICP targeting')}
            className="text-xs font-medium text-sand-600 border border-sand-200 px-3.5 py-2 rounded-lg hover:bg-sand-50 transition-colors"
          >
            Adjust targeting
          </button>
        </div>
      )}
    </div>
  );
}
