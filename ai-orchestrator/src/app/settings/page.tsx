'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { GlobalDefaultsSection } from '@/components/settings/GlobalDefaultsSection';
import { AgentConfigSection } from '@/components/settings/AgentConfigSection';
import { EmailInfraSection } from '@/components/settings/EmailInfraSection';
import { ChannelAccountsSection } from '@/components/settings/ChannelAccountsSection';
import { IntegrationsSection } from '@/components/settings/IntegrationsSection';
import { BrainSection } from '@/components/settings/BrainSection';
import {
  BrainCircuit, Settings2, Bot, Mail, Radio, Puzzle,
  AlertTriangle, Users, ChevronDown, ChevronRight,
  Eye, Zap, Pause, Shield, Clock, Globe,
  Linkedin, Phone, Calendar, MessageSquare, ArrowRight,
} from 'lucide-react';

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

/* ─── Section Card ─── */
function SectionCard({ id, title, description, icon: Icon, iconColor, children, defaultOpen = false }: {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  iconColor?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section id={id} className="bg-white border border-sand-200 rounded-xl overflow-hidden transition-shadow duration-200 hover:shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3.5 px-5 py-4 hover:bg-sand-50/40 transition-colors text-left"
      >
        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', iconColor || 'bg-primary-50')}>
          <Icon className={cn('w-4.5 h-4.5', iconColor ? 'text-white' : 'text-primary-600')} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-sand-900">{title}</h3>
          <p className="text-xs text-sand-400 mt-0.5">{description}</p>
        </div>
        {open
          ? <ChevronDown className="w-4 h-4 text-sand-300 flex-shrink-0" />
          : <ChevronRight className="w-4 h-4 text-sand-300 flex-shrink-0" />
        }
      </button>
      {open && <div className="px-5 pb-5 border-t border-sand-100">{children}</div>}
    </section>
  );
}

/* ─── Section nav items ─── */
const SECTIONS = [
  { id: 'brain', label: 'AI Brain', icon: BrainCircuit },
  { id: 'defaults', label: 'Global Defaults', icon: Settings2 },
  { id: 'agent-mode', label: 'Agent Mode', icon: Shield },
  { id: 'agents', label: 'Agent Preset', icon: Bot },
  { id: 'agent-tools', label: 'Tool Permissions', icon: Zap },
  { id: 'agent-limits', label: 'Behavior Limits', icon: Clock },
  { id: 'email-infra', label: 'Email Infrastructure', icon: Mail },
  { id: 'channels', label: 'Channel Accounts', icon: Radio },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
  { id: 'escalation', label: 'Escalation', icon: AlertTriangle },
  { id: 'team', label: 'Team', icon: Users },
];

/* ─── Agent mode types ─── */
type AgentMode = 'autonomous' | 'supervised' | 'paused';

const AGENT_MODES: {
  key: AgentMode;
  icon: React.ElementType;
  label: string;
  desc: string;
  tag?: string;
  activeColor: string;
  dotColor: string;
}[] = [
  {
    key: 'supervised',
    icon: Eye,
    label: 'Supervised',
    desc: 'AI drafts and queues actions for your approval. Nothing sends without review.',
    tag: 'Recommended',
    activeColor: 'border-amber-400 bg-amber-50',
    dotColor: 'bg-amber-500',
  },
  {
    key: 'autonomous',
    icon: Zap,
    label: 'Autonomous',
    desc: 'AI executes outreach independently. You only see escalations.',
    tag: 'Advanced',
    activeColor: 'border-green-400 bg-green-50',
    dotColor: 'bg-green-500',
  },
  {
    key: 'paused',
    icon: Pause,
    label: 'Paused',
    desc: 'Agent is inactive. No new actions will be taken on any campaign.',
    activeColor: 'border-sand-400 bg-sand-50',
    dotColor: 'bg-sand-400',
  },
];

const TOOLS = [
  { id: 'email', label: 'Send Emails', desc: 'Compose and send outreach emails', icon: Mail, risk: 'medium' as const },
  { id: 'linkedin', label: 'LinkedIn Messages', desc: 'Send connection requests and messages', icon: Linkedin, risk: 'medium' as const },
  { id: 'voice', label: 'Voice Calls', desc: 'Place AI-guided voice calls', icon: Phone, risk: 'high' as const },
  { id: 'calendar', label: 'Book Meetings', desc: 'Auto-book meetings on agreement', icon: Calendar, risk: 'low' as const },
  { id: 'web', label: 'Web Research', desc: 'Research prospect company and news', icon: Globe, risk: 'low' as const },
  { id: 'replies', label: 'Handle Replies', desc: 'Read and respond to prospect replies', icon: MessageSquare, risk: 'medium' as const },
];

const RISK_STYLES = {
  low: 'text-green-600 bg-green-50',
  medium: 'text-amber-600 bg-amber-50',
  high: 'text-red-600 bg-red-50',
};

const ESCALATION_RULES = [
  { id: 'e1', trigger: 'Prospect mentions pricing or budget', action: 'Escalate to human + pause sequence', enabled: true },
  { id: 'e2', trigger: 'Negative sentiment detected in reply', action: 'Pause and notify immediately', enabled: true },
  { id: 'e3', trigger: 'Prospect asks to speak with a human', action: 'Immediately route to human', enabled: true },
  { id: 'e4', trigger: 'Bounce rate exceeds 5% in a campaign', action: 'Pause campaign + alert', enabled: true },
  { id: 'e5', trigger: 'Legal or compliance keywords detected', action: 'Block send + flag for review', enabled: true },
];

/* ─── Main Page ─── */
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('brain');
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
  const [workingHours, setWorkingHours] = useState('9am–6pm');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const enabledTools = Object.values(toolStates).filter(Boolean).length;
  const enabledEscalations = Object.values(escalationStates).filter(Boolean).length;

  return (
    <div className="h-full flex bg-sand-50">
      {/* Left nav */}
      <div className="w-56 shrink-0 bg-white border-r border-sand-200 flex flex-col py-4 overflow-y-auto">
        <h2 className="text-xs font-semibold text-sand-400 uppercase tracking-wider px-4 mb-3">Settings</h2>
        <nav className="space-y-0.5 px-2">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollTo(s.id)}
                className={cn(
                  'w-full flex items-center gap-2.5 text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-fast',
                  activeSection === s.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-sand-500 hover:bg-sand-50 hover:text-sand-800'
                )}
              >
                <Icon className={cn('w-3.5 h-3.5 flex-shrink-0', activeSection === s.id ? 'text-primary-600' : 'text-sand-400')} />
                {s.label}
              </button>
            );
          })}
        </nav>

        {/* Agent status summary */}
        <div className="mt-auto mx-3 p-3 rounded-lg bg-sand-50 border border-sand-200">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-3.5 h-3.5 text-primary-600" />
            <span className="text-[11px] font-semibold text-sand-700">Agent Status</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-sand-500">Mode</span>
              <span className={cn(
                'inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-full',
                agentMode === 'supervised' ? 'bg-amber-100 text-amber-700' :
                agentMode === 'autonomous' ? 'bg-green-100 text-green-700' :
                'bg-sand-100 text-sand-500'
              )}>
                <span className={cn('w-1 h-1 rounded-full', agentMode === 'supervised' ? 'bg-amber-500' : agentMode === 'autonomous' ? 'bg-green-500 animate-pulse' : 'bg-sand-400')} />
                {agentMode}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-sand-500">Tools</span>
              <span className="text-[10px] font-semibold text-sand-700">{enabledTools}/{TOOLS.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-sand-500">Rules</span>
              <span className="text-[10px] font-semibold text-sand-700">{enabledEscalations} active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-[840px] mx-auto px-8 py-8 space-y-4">

          {/* Page header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-sm">
              <Settings2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sand-900">Settings</h1>
              <p className="text-sm text-sand-500 mt-0.5">Configure your workspace, AI agent, and integrations</p>
            </div>
          </div>

          {/* ── AI Brain ── */}
          <SectionCard id="brain" title="AI Brain" description="Knowledge base that powers your AI's intelligence" icon={BrainCircuit} iconColor="bg-lavender" defaultOpen={true}>
            <div className="pt-3">
              <BrainSection />
            </div>
          </SectionCard>

          {/* ── Global Defaults ── */}
          <SectionCard id="defaults" title="Global Defaults" description="Organization-wide defaults for campaigns and outreach" icon={Settings2} iconColor="bg-sand-600">
            <div className="pt-3">
              <GlobalDefaultsSection />
            </div>
          </SectionCard>

          {/* ── Agent Mode ── */}
          <SectionCard id="agent-mode" title="Agent Mode" description="How much autonomy the agent has over outreach decisions" icon={Shield} iconColor="bg-amber-500" defaultOpen={true}>
            <div className="space-y-2.5 pt-3">
              {AGENT_MODES.map((m) => {
                const isActive = agentMode === m.key;
                const Icon = m.icon;
                return (
                  <button
                    key={m.key}
                    onClick={() => setAgentMode(m.key)}
                    className={cn(
                      'w-full flex items-center gap-3.5 p-4 rounded-xl border-2 transition-all duration-150 text-left',
                      isActive ? cn(m.activeColor, 'shadow-sm') : 'border-sand-200 hover:border-sand-300'
                    )}
                  >
                    <div className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                      isActive ? 'bg-white/80' : 'bg-sand-100'
                    )}>
                      <Icon className={cn('w-4 h-4', isActive ? 'text-sand-700' : 'text-sand-400')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-semibold text-sand-900">{m.label}</span>
                        {m.tag && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary-100 text-primary-700">{m.tag}</span>
                        )}
                        {isActive && <span className={cn('w-1.5 h-1.5 rounded-full ml-auto', m.dotColor)} />}
                      </div>
                      <p className="text-xs text-sand-500">{m.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </SectionCard>

          {/* ── Agent Preset ── */}
          <SectionCard id="agents" title="Agent Preset" description="Choose how your AI behaves across campaigns" icon={Bot} iconColor="bg-primary-700">
            <div className="pt-3">
              <AgentConfigSection />
            </div>
          </SectionCard>

          {/* ── Tool Permissions ── */}
          <SectionCard id="agent-tools" title={`Tool Permissions`} description={`${enabledTools} of ${TOOLS.length} tools active — control what the agent can do`} icon={Zap} iconColor="bg-green-600">
            <div className="space-y-3 pt-3">
              {TOOLS.map((tool) => {
                const Icon = tool.icon;
                const enabled = toolStates[tool.id];
                return (
                  <div key={tool.id} className="flex items-start gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                      enabled ? 'bg-primary-50' : 'bg-sand-100'
                    )}>
                      <Icon className={cn('w-4 h-4', enabled ? 'text-primary-600' : 'text-sand-400')} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-sand-800">{tool.label}</span>
                        <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full', RISK_STYLES[tool.risk])}>
                          {tool.risk} risk
                        </span>
                      </div>
                      <p className="text-[11px] text-sand-400 mt-0.5">{tool.desc}</p>
                    </div>
                    <Toggle enabled={enabled} onChange={() => setToolStates((s) => ({ ...s, [tool.id]: !s[tool.id] }))} />
                  </div>
                );
              })}
            </div>
          </SectionCard>

          {/* ── Behavior Limits ── */}
          <SectionCard id="agent-limits" title="Behavior Limits" description="Set boundaries on how the agent behaves across campaigns" icon={Clock} iconColor="bg-ocean-500">
            <div className="space-y-5 pt-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-sand-700">Daily email limit</label>
                  <span className="text-xs font-bold text-primary-700 tabular-nums">{dailyLimit}/day</span>
                </div>
                <input type="range" min={10} max={200} step={5} value={dailyLimit} onChange={(e) => setDailyLimit(+e.target.value)} className="w-full accent-primary-700 h-1.5" />
                <div className="flex justify-between text-[10px] text-sand-300 mt-0.5">
                  <span>Conservative (10)</span><span>Aggressive (200)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-sand-700">Days between follow-ups</label>
                  <span className="text-xs font-bold text-primary-700">{followUpDays} days</span>
                </div>
                <input type="range" min={1} max={14} step={1} value={followUpDays} onChange={(e) => setFollowUpDays(+e.target.value)} className="w-full accent-primary-700 h-1.5" />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-sand-700">Max follow-ups per prospect</label>
                  <span className="text-xs font-bold text-primary-700">{maxFollowUps}</span>
                </div>
                <input type="range" min={1} max={10} step={1} value={maxFollowUps} onChange={(e) => setMaxFollowUps(+e.target.value)} className="w-full accent-primary-700 h-1.5" />
              </div>

              <div>
                <label className="text-xs font-medium text-sand-700 block mb-1.5">Working hours (sends only within)</label>
                <select value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} className="w-full text-xs border border-sand-200 rounded-lg px-3 py-2.5 text-sand-700 focus:border-primary-500 outline-none bg-white">
                  <option value="9am–5pm">9am – 5pm</option>
                  <option value="9am–6pm">9am – 6pm</option>
                  <option value="8am–8pm">8am – 8pm</option>
                  <option value="always">24/7 (not recommended)</option>
                </select>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-sand-100">
                <div>
                  <p className="text-xs font-medium text-sand-700">Send in prospect's timezone</p>
                  <p className="text-[11px] text-sand-400">AI detects timezone from IP and LinkedIn</p>
                </div>
                <Toggle enabled={true} onChange={() => {}} />
              </div>

              <div className="flex items-center justify-between py-3 border-t border-sand-100">
                <div>
                  <p className="text-xs font-medium text-sand-700">Skip weekends</p>
                  <p className="text-[11px] text-sand-400">No outreach on Saturday or Sunday</p>
                </div>
                <Toggle enabled={true} onChange={() => {}} />
              </div>
            </div>
          </SectionCard>

          {/* ── Email Infrastructure ── */}
          <SectionCard id="email-infra" title="Email Infrastructure" description="Mailbox health, warmup, and deliverability settings" icon={Mail} iconColor="bg-coral">
            <div className="pt-3">
              <EmailInfraSection />
            </div>
          </SectionCard>

          {/* ── Channel Accounts ── */}
          <SectionCard id="channels" title="Channel Accounts" description="Connected email, LinkedIn, and voice accounts" icon={Radio} iconColor="bg-mint">
            <div className="pt-3">
              <ChannelAccountsSection />
            </div>
          </SectionCard>

          {/* ── Integrations ── */}
          <SectionCard id="integrations" title="Integrations" description="Connect external tools and services" icon={Puzzle} iconColor="bg-ocean-500">
            <div className="pt-3">
              <IntegrationsSection />
            </div>
          </SectionCard>

          {/* ── Escalation Preferences ── */}
          <SectionCard id="escalation" title="Escalation Rules" description={`${enabledEscalations} active rules — when the agent hands control to you`} icon={AlertTriangle} iconColor="bg-amber-500">
            <div className="pt-3 space-y-4">
              {/* Trigger-based rules */}
              <div className="divide-y divide-sand-100">
                {ESCALATION_RULES.map((rule) => {
                  const enabled = escalationStates[rule.id];
                  return (
                    <div key={rule.id} className="flex items-start gap-3 py-3">
                      <AlertTriangle className={cn('w-4 h-4 mt-0.5 shrink-0', enabled ? 'text-amber-500' : 'text-sand-300')} />
                      <div className="flex-1 min-w-0">
                        <p className={cn('text-xs font-medium', enabled ? 'text-sand-800' : 'text-sand-400')}>{rule.trigger}</p>
                        <p className="text-[11px] text-sand-400 mt-0.5 flex items-center gap-1">
                          <ArrowRight className="w-2.5 h-2.5" />
                          {rule.action}
                        </p>
                      </div>
                      <Toggle enabled={enabled} onChange={() => setEscalationStates((s) => ({ ...s, [rule.id]: !s[rule.id] }))} size="sm" />
                    </div>
                  );
                })}
              </div>

              {/* Delivery channels */}
              <div className="border-t border-sand-200 pt-4">
                <p className="text-xs font-semibold text-sand-700 mb-3">Delivery channels</p>
                <div className="space-y-3">
                  {[
                    { id: 'in_app', label: 'In-App', desc: 'Bell icon + conversation highlighting', defaultChecked: true },
                    { id: 'slack', label: 'Slack', desc: 'Rich messages with Approve/Edit/Skip buttons', defaultChecked: true },
                    { id: 'email_notify', label: 'Email', desc: 'Critical escalations only, with direct link', defaultChecked: false },
                  ].map((ch) => (
                    <div key={ch.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-sand-800">{ch.label}</p>
                        <p className="text-[11px] text-sand-400">{ch.desc}</p>
                      </div>
                      <input type="checkbox" defaultChecked={ch.defaultChecked} className="w-4 h-4 accent-primary-700 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ── Team Management ── */}
          <SectionCard id="team" title="Team Management" description="Invite teammates and manage permissions" icon={Users} iconColor="bg-primary-700">
            <div className="pt-3 space-y-4">
              <div className="flex items-center justify-end">
                <button className="text-xs text-primary-700 font-medium hover:text-primary-800 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Invite Teammate
                </button>
              </div>
              <div className="bg-sand-50 border border-sand-200 rounded-lg overflow-hidden">
                {[
                  { name: 'Alex Kumar', email: 'alex@saleshandy.com', role: 'Admin', initials: 'AK' },
                  { name: 'Priya Singh', email: 'priya@saleshandy.com', role: 'Member', initials: 'PS' },
                ].map((member) => (
                  <div key={member.email} className="flex items-center justify-between px-4 py-3 border-b border-sand-100 last:border-b-0 bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 font-medium text-xs flex items-center justify-center">
                        {member.initials}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-sand-800">{member.name}</p>
                        <p className="text-[11px] text-sand-400 font-mono">{member.email}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-sand-500 bg-sand-100 px-2 py-0.5 rounded">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}
