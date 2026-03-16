'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/cn';
import { useCampaignStore, useActiveCampaign } from '@/stores/useCampaignStore';
import { useWorkspaceStore, CampaignRightTab } from '@/stores/useWorkspaceStore';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { LiveDashboardView } from '@/components/workspace/views/LiveDashboardView';
import { ProspectDataTable } from '@/components/workspace/ProspectDataTable';
import { SplitPanelResizer } from '@/components/workspace/SplitPanelResizer';
import { Badge } from '@/components/ui/Badge';
import {
  PanelLeftClose, PanelLeftOpen, Sparkles, Play, Pause,
  Mail, Calendar, Users, TrendingUp, Settings2, MoreHorizontal,
  CheckCircle, AlertCircle,
} from 'lucide-react';

const RIGHT_TABS: { key: CampaignRightTab; label: string }[] = [
  { key: 'prospects', label: 'Prospects' },
  { key: 'overview', label: 'Overview' },
  { key: 'meetings', label: 'Meetings' },
  { key: 'settings', label: 'Settings' },
];

const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft', planning: 'Planning', review: 'In Review', approved: 'Approved',
  active: 'Active', paused: 'Paused', completed: 'Completed',
};
const STATUS_VARIANTS: Record<string, string> = {
  draft: 'neutral', planning: 'info', review: 'warning', approved: 'info',
  active: 'success', paused: 'warning', completed: 'neutral',
};

export default function CampaignWorkspacePage() {
  const params = useParams();
  const campaignId = params.campaignId as string;
  const splitRef = useRef<HTMLDivElement>(null);

  const setActiveCampaign = useCampaignStore((s) => s.setActiveCampaign);
  const updateCampaign = useCampaignStore((s) => s.updateCampaign);
  const campaign = useActiveCampaign();

  const chatPanelWidth = useWorkspaceStore((s) => s.chatPanelWidth);
  const chatPanelCollapsed = useWorkspaceStore((s) => s.chatPanelCollapsed);
  const activeRightTab = useWorkspaceStore((s) => s.activeRightTab);
  const setChatPanelWidth = useWorkspaceStore((s) => s.setChatPanelWidth);
  const toggleChatPanel = useWorkspaceStore((s) => s.toggleChatPanel);
  const setActiveRightTab = useWorkspaceStore((s) => s.setActiveRightTab);

  useEffect(() => { setActiveCampaign(campaignId); }, [campaignId, setActiveCampaign]);

  function toggleCampaignStatus() {
    if (!campaign) return;
    const newStatus = campaign.status === 'active' ? 'paused' : 'active';
    updateCampaign(campaignId, { status: newStatus });
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── Campaign Header ── */}
      <div className="bg-white border-b border-sand-200 shrink-0">
        <div className="px-3 py-2 flex items-center gap-2">
          {/* Toggle chat panel */}
          <button
            onClick={toggleChatPanel}
            className="p-1.5 rounded-md text-sand-400 hover:text-sand-700 hover:bg-sand-100 transition-colors shrink-0"
            title={chatPanelCollapsed ? 'Show AI Chat' : 'Hide AI Chat'}
          >
            {chatPanelCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          {/* Campaign name + status */}
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-sm font-semibold text-sand-900 truncate">{campaign?.name ?? 'Campaign'}</h2>
            {campaign?.status && (
              <Badge variant={STATUS_VARIANTS[campaign.status] as any} className="shrink-0">
                {STATUS_LABELS[campaign.status]}
              </Badge>
            )}
          </div>

          {/* AI agent status */}
          {campaign?.metrics?.aiActionsInProgress != null && campaign.metrics.aiActionsInProgress > 0 && (
            <div className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-full bg-primary-50 border border-primary-100 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-medium text-primary-700">
                Agent: {campaign.metrics.aiActionsInProgress} actions running
              </span>
            </div>
          )}

          {/* Metrics */}
          {campaign?.metrics && (
            <div className="hidden lg:flex items-center gap-4 ml-auto">
              {[
                { icon: Mail,     value: campaign.metrics.sent,     label: 'sent',    color: 'text-sand-600' },
                { icon: TrendingUp, value: campaign.metrics.replied, label: 'replied', color: 'text-green-600' },
                { icon: Calendar, value: campaign.metrics.meetings,  label: 'meetings',color: 'text-mint font-bold' },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-1.5 text-xs">
                  <m.icon className={cn('w-3.5 h-3.5', m.color)} />
                  <span className={cn('font-semibold tabular-nums', m.color)}>{m.value}</span>
                  <span className="text-sand-400">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-1 ml-auto lg:ml-0">
            {(campaign?.status === 'active' || campaign?.status === 'paused') && (
              <button
                onClick={toggleCampaignStatus}
                className={cn(
                  'inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-medium transition-colors',
                  campaign.status === 'active'
                    ? 'bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200'
                    : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                )}
              >
                {campaign.status === 'active'
                  ? <><Pause className="w-3 h-3" />Pause</>
                  : <><Play className="w-3 h-3" />Resume</>
                }
              </button>
            )}
            <button className="p-1.5 rounded-md text-sand-400 hover:text-sand-700 hover:bg-sand-100 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Split-screen body ── */}
      <div ref={splitRef} className="flex-1 flex overflow-hidden">
        {/* Left: AI Chat Panel */}
        {!chatPanelCollapsed && (
          <>
            <div
              className="flex-shrink-0 flex flex-col h-full border-r border-sand-200"
              style={{ width: chatPanelWidth }}
            >
              <ChatContainer campaignId={campaignId} compact />
            </div>
            <SplitPanelResizer onResize={setChatPanelWidth} panelRef={splitRef} />
          </>
        )}

        {/* Right: Tab panel */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tab bar */}
          <div className="bg-white border-b border-sand-200 px-4 flex items-center gap-0 shrink-0">
            {RIGHT_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveRightTab(tab.key)}
                className={cn(
                  'py-2.5 px-1 mr-4 text-xs font-medium border-b-2 transition-colors duration-150',
                  activeRightTab === tab.key
                    ? 'border-primary-700 text-primary-700'
                    : 'border-transparent text-sand-500 hover:text-sand-700'
                )}
              >
                {tab.label}
                {tab.key === 'meetings' && campaign?.metrics?.meetings ? (
                  <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-mint/20 text-mint text-[10px] font-bold">
                    {campaign.metrics.meetings}
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-hidden">
            {activeRightTab === 'prospects' && <ProspectDataTable campaignId={campaignId} />}
            {activeRightTab === 'overview' && (
              <div className="h-full overflow-y-auto"><LiveDashboardView campaignId={campaignId} /></div>
            )}
            {activeRightTab === 'meetings' && (
              <div className="h-full overflow-y-auto p-6"><MeetingsTab /></div>
            )}
            {activeRightTab === 'settings' && (
              <div className="h-full overflow-y-auto p-6"><CampaignSettingsTab /></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MeetingsTab() {
  const [meetings, setMeetings] = useState([
    { id: '1', name: 'Sarah Chen',     company: 'Vantage CRM',      date: 'Mar 6, 2026', time: '2:00 PM EST',  status: 'confirmed', briefReady: true  },
    { id: '2', name: "James O'Brien",  company: 'NexGen Analytics', date: 'Mar 7, 2026', time: '11:00 AM EST', status: 'confirmed', briefReady: false },
    { id: '3', name: 'Alicia Moreno',  company: 'Brightline SaaS',  date: 'Mar 8, 2026', time: '3:00 PM EST',  status: 'pending',   briefReady: false },
  ]);
  const [openBrief, setOpenBrief] = useState<string | null>(null);

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-sand-900">Upcoming Meetings</h2>
          <p className="text-xs text-sand-400 mt-0.5">AI-booked and AI-briefed</p>
        </div>
        <span className="text-sm text-sand-500">{meetings.filter(m => m.status === 'confirmed').length} confirmed</span>
      </div>
      <div className="space-y-2">
        {meetings.map((m) => (
          <div key={m.id}>
            <div className="bg-white border border-sand-200 rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-sand-900">{m.name}</p>
                  <span className={cn(
                    'text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
                    m.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  )}>
                    {m.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                  </span>
                </div>
                <p className="text-xs text-sand-500">{m.company} · {m.date} · {m.time}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setOpenBrief(openBrief === m.id ? null : m.id)}
                  className={cn(
                    'inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg font-medium transition-colors',
                    openBrief === m.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'border border-sand-200 text-sand-600 hover:bg-sand-50'
                  )}
                >
                  <Sparkles className="w-3 h-3" />
                  AI Brief
                </button>
              </div>
            </div>
            {openBrief === m.id && (
              <div className="bg-primary-50 border border-primary-200 border-t-0 rounded-b-xl px-5 py-4">
                <p className="text-[11px] font-semibold text-primary-700 uppercase tracking-wide mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />AI Meeting Brief
                </p>
                <div className="space-y-2 text-xs text-primary-900">
                  <p><strong>Context:</strong> {m.name} replied positively after follow-up #2. They mentioned "budget approval in Q2" — high intent signal.</p>
                  <p><strong>Company news:</strong> {m.company} raised Series B in Jan 2026. Growing sales team fast.</p>
                  <p><strong>Talking points:</strong> Lead with ROI case study from a similar company. Address scalability early. They'll likely ask about onboarding timeline.</p>
                  <p><strong>Objection prep:</strong> If they ask about pricing, reference the SMB tier. If they mention current tooling, use the migration argument.</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CampaignSettingsTab() {
  const [settings, setSettings] = useState([
    { id: 'daily_limit',  label: 'Daily email limit',      value: '50',               unit: 'emails/day', note: 'Global default' },
    { id: 'followup_gap', label: 'Days between follow-ups', value: '3',               unit: 'days',       note: 'Global default' },
    { id: 'max_followups',label: 'Max follow-ups',          value: '4',               unit: '',           note: 'Global default' },
    { id: 'booking_mode', label: 'Booking mode',            value: 'Auto-book',       unit: '',           note: 'When positive reply' },
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="max-w-2xl space-y-4">
      <div>
        <h2 className="text-lg font-bold text-sand-900">Campaign Settings</h2>
        <p className="text-xs text-sand-400 mt-0.5">Overrides global agent defaults for this campaign only</p>
      </div>
      <div className="bg-white border border-sand-200 rounded-xl overflow-hidden">
        {settings.map((s, i) => (
          <div key={s.id} className={cn(
            'flex items-center gap-4 px-5 py-3.5',
            i < settings.length - 1 && 'border-b border-sand-100'
          )}>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sand-800">{s.label}</p>
              <p className="text-xs text-sand-400">{s.note}</p>
            </div>
            {editingId === s.id ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  defaultValue={s.value}
                  className="w-20 text-xs border border-primary-300 rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary-500"
                  onBlur={(e) => {
                    setSettings((prev) => prev.map((x) => x.id === s.id ? { ...x, value: e.target.value } : x));
                    setEditingId(null);
                  }}
                  autoFocus
                />
                <span className="text-xs text-sand-400">{s.unit}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-sand-700">
                  {s.value}{s.unit ? ` ${s.unit}` : ''}
                </span>
                <button
                  onClick={() => setEditingId(s.id)}
                  className="text-xs text-primary-600 hover:text-primary-800 font-medium hover:underline"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-amber-800">Changing settings mid-campaign</p>
          <p className="text-xs text-amber-700 mt-0.5">New limits apply to future sends only. Prospects already in the queue won't be affected.</p>
        </div>
      </div>
    </div>
  );
}
