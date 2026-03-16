'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { useCampaignsForContext } from '@/stores/useCampaignStore';
import { useContextStore } from '@/stores/useContextStore';
import { useChatStore } from '@/stores/useChatStore';
import { Campaign, CampaignStatus } from '@/types/campaign';

const statusColors: Record<CampaignStatus, string> = {
  draft: 'bg-sand-300',
  planning: 'bg-sand-400',
  review: 'bg-amber',
  approved: 'bg-primary-400',
  active: 'bg-mint',
  paused: 'bg-amber opacity-60',
  completed: 'bg-sand-300',
};

function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'now';
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d`;
}

interface SidebarThreadListProps {
  activeCampaignId: string | null;
}

export function SidebarThreadList({ activeCampaignId }: SidebarThreadListProps) {
  const activeContextId = useContextStore((s) => s.activeContextId);
  const campaigns = useCampaignsForContext(activeContextId);
  const messagesByCampaign = useChatStore((s) => s.messagesByCampaign);

  return (
    <div className="flex-1 overflow-y-auto py-1">
      {campaigns.map((campaign) => {
        const messages = messagesByCampaign[campaign.id] ?? [];
        const lastMessage = messages[messages.length - 1];
        const isActive = campaign.id === activeCampaignId;

        return (
          <Link
            key={campaign.id}
            href={`/campaigns/${campaign.id}`}
            className={cn(
              'flex items-start gap-3 px-4 py-3 border-l-2 transition-colors duration-fast',
              isActive
                ? 'bg-primary-50 border-primary-700'
                : 'border-transparent hover:bg-sand-50'
            )}
          >
            <span
              className={cn(
                'w-2 h-2 rounded-full mt-1.5 flex-shrink-0',
                statusColors[campaign.status],
                campaign.status === 'active' && 'animate-ocean-pulse'
              )}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className={cn(
                  'text-base font-medium truncate',
                  isActive ? 'text-primary-700' : 'text-sand-700'
                )}>
                  {campaign.name}
                </span>
                {campaign.hasUnreadAiUpdate && (
                  <span className="w-2 h-2 rounded-full bg-mint flex-shrink-0" />
                )}
              </div>
              {lastMessage && (
                <p className="text-sm text-sand-400 truncate mt-0.5">
                  {lastMessage.content.slice(0, 50)}
                </p>
              )}
              <span className="text-xs text-sand-400 mt-0.5 block">
                {getRelativeTime(campaign.updatedAt)}
              </span>
            </div>
          </Link>
        );
      })}

      {campaigns.length === 0 && (
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-sand-400">No campaigns yet</p>
        </div>
      )}
    </div>
  );
}
