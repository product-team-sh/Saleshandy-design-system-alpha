'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { useChatStore } from '@/stores/useChatStore';
import { handleUserMessage } from '@/lib/mock-ai';

interface EmailPreviewArtifactProps {
  campaignId: string;
  subject: string;
  body: string;
  from?: string;
  to?: string;
  highlights?: string[];
  stepNumber?: number;
  totalSteps?: number;
}

export function EmailPreviewArtifact({
  campaignId,
  subject,
  body,
  from = 'you@company.com',
  to = 'Sarah Chen <sarah@acme.com>',
  highlights = [],
  stepNumber,
  totalSteps,
}: EmailPreviewArtifactProps) {
  const [approved, setApproved] = useState(false);
  const addUserMessage = useChatStore((s) => s.addUserMessage);

  const handleAction = (action: string) => {
    addUserMessage(campaignId, action);
    handleUserMessage(campaignId, action);
    if (action === 'Approve this email') setApproved(true);
  };

  return (
    <div
      className={cn(
        'mt-3 rounded-xl border bg-[#FAFAF9] overflow-hidden transition-all duration-300',
        approved ? 'border-green-200' : 'border-sand-200'
      )}
    >
      {/* Artifact header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-sand-100 bg-white">
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-ocean-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="text-xs font-semibold text-sand-700">Email Preview</span>
          {approved && (
            <span className="text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
              Approved
            </span>
          )}
        </div>
        {stepNumber && totalSteps && (
          <span className="text-xs font-medium text-sand-500">Step {stepNumber} of {totalSteps}</span>
        )}
      </div>

      {/* Email meta */}
      <div className="px-4 py-3 space-y-1.5 bg-white border-b border-sand-100">
        <div className="flex gap-2 text-xs">
          <span className="text-sand-400 w-8">From</span>
          <span className="text-sand-600">{from}</span>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="text-sand-400 w-8">To</span>
          <span className="text-sand-600">{to}</span>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="text-sand-400 w-8">Subj</span>
          <span className="text-sand-800 font-medium">{subject}</span>
        </div>
      </div>

      {/* Email body */}
      <div className="px-4 py-4">
        <div className="text-sm text-sand-700 leading-relaxed whitespace-pre-line">
          {body}
        </div>

        {/* Personalization highlights */}
        {highlights.length > 0 && (
          <div className="mt-3 pt-3 border-t border-sand-100">
            <p className="text-[11px] font-semibold text-sand-400 uppercase tracking-wide mb-2">
              Personalized from
            </p>
            <div className="flex flex-wrap gap-1.5">
              {highlights.map((h) => (
                <span
                  key={h}
                  className="text-xs bg-ocean-50 text-ocean-500 border border-ocean-100 rounded-full px-2.5 py-0.5"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {!approved && (
        <div className="flex items-center gap-2 px-4 pb-4">
          <button
            onClick={() => handleAction('Approve this email')}
            className="flex items-center gap-1.5 bg-ocean-500 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-ocean-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
            </svg>
            Approve
          </button>
          <button
            onClick={() => handleAction('Edit this email')}
            className="text-xs font-medium text-sand-600 border border-sand-200 px-3.5 py-2 rounded-lg hover:bg-sand-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => handleAction('Regenerate this email with a different angle')}
            className="text-xs font-medium text-sand-600 border border-sand-200 px-3.5 py-2 rounded-lg hover:bg-sand-50 transition-colors"
          >
            Regenerate
          </button>
        </div>
      )}
    </div>
  );
}
