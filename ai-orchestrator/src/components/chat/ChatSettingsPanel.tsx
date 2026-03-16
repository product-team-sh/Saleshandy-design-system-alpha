'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';
import { useUiStore } from '@/stores/useUiStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import {
  X, Bot, Sliders, Shield, Mail, Linkedin, Phone, Calendar,
  Globe, MessageSquare, AlertTriangle, ArrowRight, ChevronDown,
  ChevronRight, Eye, Zap, Pause, BrainCircuit, Clock,
} from 'lucide-react';
import type { AgentPreset } from '@/types/settings';

/* ─── Toggle ─── */
function Toggle({ enabled, onChange, size = 'md' }: { enabled: boolean; onChange: () => void; size?: 'sm' | 'md' }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'relative rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0',
        size === 'sm' ? 'w-8 h-4' : 'w-10 h-5',
        enabled ? 'bg-primary-700' : 'bg-sand-300'
      )}
    >
      <span className={cn(
        'absolute top-0.5 rounded-full bg-white shadow transition-transform duration-200',
        size === 'sm' ? 'w-3 h-3 left-0.5' : 'w-4 h-4 left-0.5',
        enabled && (size === 'sm' ? 'translate-x-4' : 'translate-x-5')
      )} />
    </button>
  );
}

/* ─── Collapsible Section ─── */
function Section({ title, icon: Icon, children, defaultOpen = true }: {
  title: string; icon: React.ElementType; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-sand-100 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-5 py-3 hover:bg-sand-50/60 transition-colors text-left"
      >
        <Icon className="w-4 h-4 text-sand-400 flex-shrink-0" />
        <span className="text-xs font-semibold text-sand-800 flex-1">{title}</span>
        {open
          ? <ChevronDown className="w-3.5 h-3.5 text-sand-300" />
          : <ChevronRight className="w-3.5 h-3.5 text-sand-300" />
        }
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
}

/* ─── Agent Mode Card ─── */
type AgentMode = 'autonomous' | 'supervised' | 'paused';

const AGENT_MODES: {
  key: AgentMode;
  icon: React.ElementType;
  label: string;
  desc: string;
  activeColor: string;
  dotColor: string;
}[] = [
  {
    key: 'supervised',
    icon: Eye,
    label: 'Supervised',
    desc: 'AI drafts actions for your review',
    activeColor: 'border-amber-400 bg-amber-50',
    dotColor: 'bg-amber-500',
  },
  {
    key: 'autonomous',
    icon: Zap,
    label: 'Autonomous',
    desc: 'AI acts independently',
    activeColor: 'border-green-400 bg-green-50',
    dotColor: 'bg-green-500',
  },
  {
    key: 'paused',
    icon: Pause,
    label: 'Paused',
    desc: 'No new actions taken',
    activeColor: 'border-sand-400 bg-sand-50',
    dotColor: 'bg-sand-400',
  },
];

/* ─── Tool configs ─── */
interface ToolConfig {
  id: string;
  label: string;
  icon: React.ElementType;
  risk: 'low' | 'medium' | 'high';
}

const TOOLS: ToolConfig[] = [
  { id: 'email', label: 'Send Emails', icon: Mail, risk: 'medium' },
  { id: 'linkedin', label: 'LinkedIn Messages', icon: Linkedin, risk: 'medium' },
  { id: 'voice', label: 'Voice Calls', icon: Phone, risk: 'high' },
  { id: 'calendar', label: 'Book Meetings', icon: Calendar, risk: 'low' },
  { id: 'web', label: 'Web Research', icon: Globe, risk: 'low' },
  { id: 'replies', label: 'Handle Replies', icon: MessageSquare, risk: 'medium' },
];

const RISK_STYLES = {
  low: 'text-green-600 bg-green-50',
  medium: 'text-amber-600 bg-amber-50',
  high: 'text-red-600 bg-red-50',
};

/* ─── Escalation rules ─── */
const ESCALATION_RULES = [
  { id: 'e1', trigger: 'Prospect mentions pricing', action: 'Escalate + pause', enabled: true },
  { id: 'e2', trigger: 'Negative sentiment detected', action: 'Pause + notify', enabled: true },
  { id: 'e3', trigger: 'Human requested', action: 'Route immediately', enabled: true },
  { id: 'e4', trigger: 'Bounce rate > 5%', action: 'Pause campaign', enabled: true },
  { id: 'e5', trigger: 'Legal keywords detected', action: 'Block + flag', enabled: true },
];

/* ─── Preset descriptions ─── */
const PRESET_INFO: Record<AgentPreset, { label: string; desc: string; tag?: string }> = {
  balanced: { label: 'Balanced Outreach', desc: 'Email + LinkedIn, 3 follow-ups', tag: 'Recommended' },
  email_first: { label: 'Email-First', desc: 'Email primary, fallback channels' },
  multi_channel_blitz: { label: 'Multi-Channel Blitz', desc: 'All channels max volume' },
  warm_steady: { label: 'Warm & Steady', desc: 'Slower cadence, more personal' },
};

/* ─── Main Panel ─── */
export function ChatSettingsPanel() {
  const { chatSettingsOpen, setChatSettingsOpen } = useUiStore();
  const { agentPreset, setAgentPreset } = useSettingsStore();

  const [agentMode, setAgentMode] = useState<AgentMode>('supervised');
  const [toolStates, setToolStates] = useState<Record<string, boolean>>({
    email: true, linkedin: true, voice: false, calendar: true, web: true, replies: true,
  });
  const [escalationStates, setEscalationStates] = useState<Record<string, boolean>>({
    e1: true, e2: true, e3: true, e4: true, e5: true,
  });
  const [dailyLimit, setDailyLimit] = useState(50);
  const [followUpDays, setFollowUpDays] = useState(3);
  const [maxFollowUps, setMaxFollowUps] = useState(4);

  if (!chatSettingsOpen) return null;

  const enabledTools = Object.values(toolStates).filter(Boolean).length;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[1px]"
        onClick={() => setChatSettingsOpen(false)}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-[380px] flex flex-col bg-white border-l border-sand-200 shadow-xl"
        style={{ animation: 'slideInRight 280ms cubic-bezier(0.34, 1.3, 0.64, 1) both' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-sand-200 bg-sand-50/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-sm">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-sand-900">Agent Settings</h2>
              <p className="text-[11px] text-sand-400">Configure AI behavior</p>
            </div>
          </div>
          <button
            onClick={() => setChatSettingsOpen(false)}
            className="w-7 h-7 rounded-lg hover:bg-sand-200 transition-colors flex items-center justify-center text-sand-400 hover:text-sand-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">

          {/* ── Agent Mode ── */}
          <Section title="Agent Mode" icon={Shield} defaultOpen={true}>
            <div className="space-y-2">
              {AGENT_MODES.map((m) => {
                const isActive = agentMode === m.key;
                const Icon = m.icon;
                return (
                  <button
                    key={m.key}
                    onClick={() => setAgentMode(m.key)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-150 text-left',
                      isActive ? m.activeColor : 'border-sand-200 hover:border-sand-300'
                    )}
                  >
                    <div className={cn(
                      'w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0',
                      isActive ? 'bg-white/80' : 'bg-sand-100'
                    )}>
                      <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-sand-700' : 'text-sand-400')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-sand-800">{m.label}</span>
                        {isActive && <span className={cn('w-1.5 h-1.5 rounded-full', m.dotColor)} />}
                      </div>
                      <p className="text-[11px] text-sand-400 mt-0.5">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Section>

          {/* ── Behavior Preset ── */}
          <Section title="Behavior Preset" icon={Sliders} defaultOpen={true}>
            <div className="space-y-2">
              {(Object.entries(PRESET_INFO) as [AgentPreset, typeof PRESET_INFO[AgentPreset]][]).map(([key, info]) => {
                const isActive = agentPreset === key;
                return (
                  <button
                    key={key}
                    onClick={() => setAgentPreset(key)}
                    className={cn(
                      'w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-150 text-left',
                      isActive
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-sand-200 hover:border-sand-300'
                    )}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className={cn('text-xs font-semibold', isActive ? 'text-primary-700' : 'text-sand-800')}>{info.label}</span>
                        {info.tag && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary-100 text-primary-700">{info.tag}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-sand-400 mt-0.5">{info.desc}</p>
                    </div>
                    {isActive && (
                      <div className="w-4 h-4 rounded-full bg-primary-700 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Section>

          {/* ── Tool Permissions ── */}
          <Section title={`Tool Permissions (${enabledTools}/${TOOLS.length})`} icon={Bot} defaultOpen={false}>
            <div className="space-y-2.5">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                const enabled = toolStates[tool.id];
                return (
                  <div key={tool.id} className="flex items-center gap-2.5">
                    <div className={cn(
                      'w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0',
                      enabled ? 'bg-primary-50' : 'bg-sand-100'
                    )}>
                      <Icon className={cn('w-3.5 h-3.5', enabled ? 'text-primary-600' : 'text-sand-400')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-sand-800">{tool.label}</span>
                        <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full', RISK_STYLES[tool.risk])}>
                          {tool.risk}
                        </span>
                      </div>
                    </div>
                    <Toggle enabled={enabled} onChange={() => setToolStates((s) => ({ ...s, [tool.id]: !s[tool.id] }))} size="sm" />
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ── Behavior Limits ── */}
          <Section title="Behavior Limits" icon={Clock} defaultOpen={false}>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-sand-700">Daily email limit</label>
                  <span className="text-xs font-bold text-primary-700 tabular-nums">{dailyLimit}/day</span>
                </div>
                <input
                  type="range" min={10} max={200} step={5}
                  value={dailyLimit}
                  onChange={(e) => setDailyLimit(+e.target.value)}
                  className="w-full accent-primary-700 h-1.5"
                />
                <div className="flex justify-between text-[10px] text-sand-300 mt-0.5">
                  <span>Conservative</span><span>Aggressive</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-sand-700">Days between follow-ups</label>
                  <span className="text-xs font-bold text-primary-700">{followUpDays} days</span>
                </div>
                <input
                  type="range" min={1} max={14} step={1}
                  value={followUpDays}
                  onChange={(e) => setFollowUpDays(+e.target.value)}
                  className="w-full accent-primary-700 h-1.5"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-sand-700">Max follow-ups per prospect</label>
                  <span className="text-xs font-bold text-primary-700">{maxFollowUps}</span>
                </div>
                <input
                  type="range" min={1} max={10} step={1}
                  value={maxFollowUps}
                  onChange={(e) => setMaxFollowUps(+e.target.value)}
                  className="w-full accent-primary-700 h-1.5"
                />
              </div>
            </div>
          </Section>

          {/* ── Escalation Rules ── */}
          <Section title="Escalation Rules" icon={AlertTriangle} defaultOpen={false}>
            <div className="space-y-2">
              {ESCALATION_RULES.map((rule) => {
                const enabled = escalationStates[rule.id];
                return (
                  <div key={rule.id} className="flex items-start gap-2.5 py-1.5">
                    <AlertTriangle className={cn('w-3.5 h-3.5 mt-0.5 shrink-0', enabled ? 'text-amber-500' : 'text-sand-300')} />
                    <div className="flex-1 min-w-0">
                      <p className={cn('text-xs font-medium', enabled ? 'text-sand-800' : 'text-sand-400')}>{rule.trigger}</p>
                      <p className="text-[10px] text-sand-400 flex items-center gap-1 mt-0.5">
                        <ArrowRight className="w-2.5 h-2.5" />
                        {rule.action}
                      </p>
                    </div>
                    <Toggle
                      enabled={enabled}
                      onChange={() => setEscalationStates((s) => ({ ...s, [rule.id]: !s[rule.id] }))}
                      size="sm"
                    />
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ── Brain Status ── */}
          <Section title="AI Brain" icon={BrainCircuit} defaultOpen={false}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-sand-600">Knowledge health</span>
                <span className="text-xs font-bold text-green-600">72/100</span>
              </div>
              <div className="h-2 bg-sand-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '72%' }} />
              </div>
              <div className="space-y-1.5">
                {[
                  { label: 'Company context', done: true },
                  { label: 'ICP defined', done: true },
                  { label: 'Product details', done: true },
                  { label: 'Objection handlers', done: false },
                  { label: 'Case studies', done: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={cn(
                      'w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0',
                      item.done ? 'bg-green-500' : 'bg-sand-200'
                    )}>
                      {item.done && (
                        <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={cn('text-xs', item.done ? 'text-sand-700' : 'text-sand-400')}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        </div>

        {/* Footer */}
        <div className="border-t border-sand-200 px-5 py-3 bg-sand-50/60">
          <button
            onClick={() => setChatSettingsOpen(false)}
            className="w-full text-xs font-medium text-primary-700 hover:text-primary-800 py-2 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Done — Return to Chat
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(24px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
