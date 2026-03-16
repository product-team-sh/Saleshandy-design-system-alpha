'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useContextStore } from '@/stores/useContextStore';
import { useCampaignStore } from '@/stores/useCampaignStore';
import { Spinner } from '@/components/ui/Spinner';

export default function NewCampaignPage() {
  const router = useRouter();
  const activeContextId = useContextStore((s) => s.activeContextId);
  const createCampaign = useCampaignStore((s) => s.createCampaign);
  const hasCreated = useRef(false);

  useEffect(() => {
    if (hasCreated.current) return;
    hasCreated.current = true;

    const campaign = createCampaign(activeContextId);
    router.replace(`/campaigns/${campaign.id}`);
  }, [activeContextId, createCampaign, router]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" className="text-primary-700" />
        <p className="text-sm text-sand-500">Creating campaign...</p>
      </div>
    </div>
  );
}
