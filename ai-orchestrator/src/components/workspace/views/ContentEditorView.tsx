'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { mockPlans } from '@/mock/plans';
import { Channel } from '@/types/campaign';

interface ContentEditorViewProps {
  campaignId: string;
}

const tabs: { key: Channel; label: string }[] = [
  { key: 'email', label: 'Email' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'voice', label: 'Voice' },
];

export function ContentEditorView({ campaignId }: ContentEditorViewProps) {
  const panelData = useWorkspaceStore((s) => s.panelData);
  const planId = panelData.planId ?? 'plan-001';
  const plan = mockPlans[planId];

  const emailStep = plan?.steps.find((s) => s.channel === 'email');
  const linkedinStep = plan?.steps.find((s) => s.channel === 'linkedin');
  const voiceStep = plan?.steps.find((s) => s.channel === 'voice');

  const [activeTab, setActiveTab] = useState<Channel>('email');
  const [emailSubject, setEmailSubject] = useState(emailStep?.subject ?? '');
  const [emailBody, setEmailBody] = useState(emailStep?.content ?? '');
  const [linkedinBody, setLinkedinBody] = useState(linkedinStep?.content ?? '');
  const [voiceScript, setVoiceScript] = useState(voiceStep?.content ?? '');

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b border-sand-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex-1 px-4 py-2.5 text-sm font-medium transition-colors',
              activeTab === tab.key
                ? 'border-b-2 border-primary-700 text-primary-700'
                : 'text-sand-500 hover:text-sand-700'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'email' && (
          <>
            <div>
              <label className="block text-xs font-medium text-sand-600 mb-1">
                Subject line
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full border border-sand-200 rounded-sm px-3 py-2 text-sm focus:border-primary-700 focus:shadow-focused outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-sand-600 mb-1">
                Body
              </label>
              <textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={12}
                className="w-full border border-sand-200 rounded-sm px-3 py-2 text-sm resize-none focus:border-primary-700 focus:shadow-focused outline-none"
              />
            </div>
          </>
        )}

        {activeTab === 'linkedin' && (
          <div>
            <label className="block text-xs font-medium text-sand-600 mb-1">
              Message
            </label>
            <textarea
              value={linkedinBody}
              onChange={(e) => setLinkedinBody(e.target.value)}
              rows={8}
              className="w-full border border-sand-200 rounded-sm px-3 py-2 text-sm resize-none focus:border-primary-700 focus:shadow-focused outline-none"
            />
          </div>
        )}

        {activeTab === 'voice' && (
          <div>
            <label className="block text-xs font-medium text-sand-600 mb-1">
              Call script
            </label>
            <textarea
              value={voiceScript}
              onChange={(e) => setVoiceScript(e.target.value)}
              rows={10}
              className="w-full border border-sand-200 rounded-sm px-3 py-2 text-sm resize-none focus:border-primary-700 focus:shadow-focused outline-none"
            />
          </div>
        )}
      </div>

      <div className="sticky bottom-0 border-t border-sand-200 bg-white px-4 py-3 flex items-center gap-3">
        <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-700 rounded-sm hover:bg-primary-800 transition-colors">
          Save Changes
        </button>
        <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-purple-500 rounded-sm hover:from-purple-700 hover:to-purple-600 transition-all">
          Ask AI to Rewrite
        </button>
      </div>
    </div>
  );
}
