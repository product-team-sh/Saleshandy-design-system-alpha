'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { useCampaignStore } from '@/stores/useCampaignStore';
import { useChatStore } from '@/stores/useChatStore';
import { mockPlans } from '@/mock/plans';
import { Channel } from '@/types/campaign';

interface PlanReviewViewProps {
  campaignId: string;
}

const channelAccentColors: Record<Channel, string> = {
  email: 'bg-primary-500',
  linkedin: 'bg-purple-500',
  voice: 'bg-green-500',
};

const channelBadgeStyles: Record<Channel, string> = {
  email: 'bg-primary-50 text-primary-700',
  linkedin: 'bg-purple-50 text-purple-700',
  voice: 'bg-green-50 text-green-700',
};

const channelLabels: Record<Channel, string> = {
  email: 'Email',
  linkedin: 'LinkedIn',
  voice: 'Voice',
};

export function PlanReviewView({ campaignId }: PlanReviewViewProps) {
  const panelData = useWorkspaceStore((s) => s.panelData);
  const setPanelView = useWorkspaceStore((s) => s.setPanelView);
  const updateCampaign = useCampaignStore((s) => s.updateCampaign);
  const addAiMessage = useChatStore((s) => s.addAiMessage);

  const planId = panelData.planId ?? 'plan-001';
  const plan = mockPlans[planId];

  if (!plan) {
    return (
      <div className="p-6 text-center text-sand-500 text-sm">
        No plan found.
      </div>
    );
  }

  const handleApprove = () => {
    updateCampaign(campaignId, { status: 'approved' });
    updateCampaign(campaignId, { status: 'active' });
    addAiMessage(campaignId, {
      contentType: 'status_update',
      content:
        'Campaign approved and launched. Your AI orchestrator is now sending outreach to prospects. Monitor progress on the live dashboard.',
    });
    setPanelView('live_dashboard');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-sand-500">
            {plan.steps.length} steps &middot; {plan.estimatedDuration} &middot;{' '}
            {plan.totalProspects} prospects
          </p>
        </div>
        {plan.steps.map((step) => (
          <div
            key={step.index}
            className="flex border border-sand-200 rounded-sm overflow-hidden"
          >
            <div
              className={cn('w-[3px] flex-shrink-0', channelAccentColors[step.channel])}
            />
            <div className="flex-1 p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-sand-100 text-xs font-medium text-sand-600">
                  {step.index + 1}
                </span>
                <span
                  className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-medium',
                    channelBadgeStyles[step.channel]
                  )}
                >
                  {channelLabels[step.channel]}
                </span>
              </div>
              <p className="text-sm font-medium text-sand-800 mb-1">
                {step.action}
              </p>
              {step.delayDays > 0 && (
                <p className="text-xs text-sand-400 mb-1">
                  Wait {step.delayDays} day{step.delayDays > 1 ? 's' : ''}
                </p>
              )}
              <p className="text-xs text-sand-500 line-clamp-2">
                {step.content.substring(0, 100)}
                {step.content.length > 100 ? '...' : ''}
              </p>
              {step.conditions && (
                <p className="text-xs italic text-sand-400 mt-1">
                  {step.conditions}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="sticky bottom-0 border-t border-sand-200 bg-white px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setPanelView('content_editor')}
          className="flex-1 px-4 py-2 text-sm font-medium text-sand-700 border border-sand-200 rounded-sm hover:bg-sand-50 transition-colors"
        >
          Edit Plan
        </button>
        <button
          onClick={handleApprove}
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-primary-700 rounded-sm hover:bg-primary-800 transition-colors"
        >
          Approve Plan
        </button>
      </div>
    </div>
  );
}
