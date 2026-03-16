'use client';

import { useEffect } from 'react';
import { useMessagesForCampaign } from '@/stores/useChatStore';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { useActiveCampaign } from '@/stores/useCampaignStore';

export function useChatSync(campaignId: string) {
  const messages = useMessagesForCampaign(campaignId);
  const setPanelView = useWorkspaceStore((s) => s.setPanelView);
  const campaign = useActiveCampaign();

  useEffect(() => {
    const lastAi = [...messages].reverse().find((m) => m.role === 'ai');
    if (!lastAi) return;

    switch (lastAi.contentType) {
      case 'plan_preview':
        setPanelView('plan_review', { planId: lastAi.metadata?.planId });
        break;
      case 'prospect_list':
        setPanelView('prospect_list');
        break;
      case 'status_update':
        if (campaign?.status === 'active') setPanelView('live_dashboard');
        break;
    }
  }, [messages.length]);
}
