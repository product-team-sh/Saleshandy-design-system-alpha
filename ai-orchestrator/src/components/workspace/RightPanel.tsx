'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { useWorkspaceStore } from '@/stores/useWorkspaceStore';
import { RightPanelView } from '@/types/workspace';
import { GuidedStartView } from '@/components/workspace/views/GuidedStartView';
import { PlanReviewView } from '@/components/workspace/views/PlanReviewView';
import { ContentEditorView } from '@/components/workspace/views/ContentEditorView';
import { ProspectListView } from '@/components/workspace/views/ProspectListView';
import { LiveDashboardView } from '@/components/workspace/views/LiveDashboardView';
import { SequenceTimelineView } from '@/components/workspace/views/SequenceTimelineView';
import { SettingsView } from '@/components/workspace/views/SettingsView';

interface RightPanelProps {
  campaignId: string;
}

const viewTitles: Record<RightPanelView, string> = {
  guided_start: 'Get Started',
  plan_review: 'Campaign Plan',
  content_editor: 'Content Editor',
  prospect_list: 'Prospects',
  live_dashboard: 'Live Dashboard',
  sequence_timeline: 'Sequence',
  settings: 'Settings',
};

export function RightPanel({ campaignId }: RightPanelProps) {
  const activePanelView = useWorkspaceStore((s) => s.activePanelView);
  const isPanelCollapsed = useWorkspaceStore((s) => s.isPanelCollapsed);
  const togglePanelCollapsed = useWorkspaceStore((s) => s.togglePanelCollapsed);

  if (isPanelCollapsed) {
    return (
      <div className="flex items-start pt-3 px-2 border-l border-sand-200 bg-white">
        <button
          onClick={togglePanelCollapsed}
          className="p-1.5 rounded-sm text-sand-400 hover:text-sand-600 hover:bg-sand-50 transition-colors"
          aria-label="Expand panel"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M15 3v18" />
            <path d="m10 15-3-3 3-3" />
          </svg>
        </button>
      </div>
    );
  }

  const renderView = () => {
    switch (activePanelView) {
      case 'guided_start':
        return <GuidedStartView campaignId={campaignId} />;
      case 'plan_review':
        return <PlanReviewView campaignId={campaignId} />;
      case 'content_editor':
        return <ContentEditorView campaignId={campaignId} />;
      case 'prospect_list':
        return <ProspectListView campaignId={campaignId} />;
      case 'live_dashboard':
        return <LiveDashboardView campaignId={campaignId} />;
      case 'sequence_timeline':
        return <SequenceTimelineView campaignId={campaignId} />;
      case 'settings':
        return <SettingsView campaignId={campaignId} />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white border-l border-sand-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-sand-200">
        <h2 className="text-sm font-semibold text-sand-800">
          {viewTitles[activePanelView]}
        </h2>
        <button
          onClick={togglePanelCollapsed}
          className="p-1.5 rounded-sm text-sand-400 hover:text-sand-600 hover:bg-sand-50 transition-colors"
          aria-label="Collapse panel"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M15 3v18" />
            <path d="m8 9 3 3-3 3" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div key={activePanelView} className={cn('animate-panel-slide')}>
          {renderView()}
        </div>
      </div>
    </div>
  );
}
