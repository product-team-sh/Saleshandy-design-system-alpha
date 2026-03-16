'use client';

import React, { useState } from 'react';
import {
  Bot, Zap, Shield, ChevronDown, ChevronRight, CheckCircle, Circle,
  Sliders, Mail, Linkedin, Phone, Calendar, Clock, AlertTriangle,
  Sparkles, Play, Pause, Settings2, BrainCircuit, Eye, MessageSquare,
  ToggleLeft, ToggleRight, FlaskConical, Activity, TrendingUp,
  ArrowRight, RefreshCw, Globe, Lock,
} from 'lucide-react';
import { cn } from '@/lib/cn';

/* ─── Types ──────────────────────────────────────────────────────────── */
type AgentMode = 'autonomous' | 'supervised' | 'paused';

interface ToolConfig {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  enabled: boolean;
  riskLevel: 'low' | 'medium' | 'high';
}

interface EscalationRule {
  id: string;
  trigger: string;
  action: string;
  enabled: boolean;
}

interface DecisionLog {
  id: string;
  timestamp: string;
  prospect: string;
  company: string;
  decision: string;
  confidence: number;
  channel: string;
  status: 'executed' | 'pending' | 'escalated';
}

/* ─── Mock data ──────────────────────────────────────────────────────── */
const INITIAL_TOOLS: ToolConfig[] = [
  { id: 'email_send',    label: 'Send Emails',        description: 'Compose and send outreach emails autonomously', icon: Mail,      enabled: true,  riskLevel: 'medium' },
  { id: 'linkedin_msg',  label: 'LinkedIn Messages',   description: 'Send connection requests and messages via LinkedIn', icon: Linkedin,  enabled: true,  riskLevel: 'medium' },
  { id: 'voice_call',    label: 'Voice Calls',         description: 'Place AI-guided voice calls to prospects',     icon: Phone,     enabled: false, riskLevel: 'high' },
  { id: 'calendar',      label: 'Book Meetings',        description: 'Auto-book meetings when prospect agrees',       icon: Calendar,  enabled: true,  riskLevel: 'low' },
  { id: 'web_research',  label: 'Web Research',         description: 'Research prospect\'s company and news online',  icon: Globe,     enabled: true,  riskLevel: 'low' },
  { id: 'reply_handle',  label: 'Handle Replies',       description: 'Read and respond to prospect replies',         icon: MessageSquare, enabled: true, riskLevel: 'medium' },
];

const INITIAL_ESCALATIONS: EscalationRule[] = [
  { id: 'e1', trigger: 'Prospect mentions pricing or budget',      action: 'Escalate to human + pause sequence',  enabled: true },
  { id: 'e2', trigger: 'Negative sentiment detected in reply',     action: 'Pause and notify me immediately',     enabled: true },
  { id: 'e3', trigger: 'Prospect asks to speak with a human',      action: 'Immediately route to me',             enabled: true },
  { id: 'e4', trigger: 'Meeting request outside working hours',    action: 'Queue for next business day',         enabled: false },
  { id: 'e5', trigger: 'Bounce rate exceeds 5% in a campaign',     action: 'Pause campaign + alert',              enabled: true },
  { id: 'e6', trigger: 'Legal or compliance keywords detected',    action: 'Block send + flag for review',        enabled: true },
];

const DECISION_LOG: DecisionLog[] = [
  { id: 'd1', timestamp: '2 min ago',  prospect: 'Sarah Chen',     company: 'Vantage CRM',    decision: 'Sent follow-up #2 after email open detected (3 opens, no reply)', confidence: 91, channel: 'Email',    status: 'executed' },
  { id: 'd2', timestamp: '18 min ago', prospect: 'Marcus Rivera',  company: 'Accel Corp',     decision: 'Escalated to human — prospect asked "what\'s the ROI timeline?"', confidence: 88, channel: 'Email',    status: 'escalated' },
  { id: 'd3', timestamp: '34 min ago', prospect: 'Priya Mehta',    company: 'DataSync AI',    decision: 'Booked meeting for Mar 8 at 2pm — positive reply detected',        confidence: 96, channel: 'LinkedIn', status: 'executed' },
  { id: 'd4', timestamp: '1 hr ago',   prospect: 'James O\'Brien', company: 'NexGen',         decision: 'Switched to LinkedIn after 2 email bounces — using company email', confidence: 79, channel: 'LinkedIn', status: 'pending' },
  { id: 'd5', timestamp: '2 hrs ago',  prospect: 'Alicia Park',    company: 'CloudBase',      decision: 'Personalized email using Q1 funding news from TechCrunch',         confidence: 84, channel: 'Email',    status: 'executed' },
  { id: 'd6', timestamp: '3 hrs ago',  prospect: 'Tom Watkins',    company: 'Finley Ops',     decision: 'Snoozed 7 days — prospect OOO auto-reply detected',                confidence: 99, channel: 'Email',    status: 'executed' },
];

const RISK_COLORS = { low: 'text-green-600 bg-green-50', medium: 'text-amber-600 bg-amber-50', high: 'text-red-600 bg-red-50' };
const STATUS_COLORS = {
  executed:  { bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-500'  },
  pending:   { bg: 'bg-amber-50',  text: 'text-amber-700',  dot: 'bg-amber-500'  },
  escalated: { bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
};

/* ─── Sub-components ──────────────────────────────────────────────────── */

function SectionCard({ title, description, children, defaultOpen = true }: {
  title: string; description?: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-sand-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-sand-50/50 transition-colors text-left"
      >
        <div>
          <h3 className="text-sm font-semibold text-sand-900">{title}</h3>
          {description && <p className="text-xs text-sand-400 mt-0.5">{description}</p>}
        </div>
        {open ? <ChevronDown className="w-4 h-4 text-sand-400" /> : <ChevronRight className="w-4 h-4 text-sand-400" />}
      </button>
      {open && <div className="px-5 pb-5 border-t border-sand-100">{children}</div>}
    </div>
  );
}

function Toggle({ enabled, onChange, size = 'md' }: { enabled: boolean; onChange: () => void; size?: 'sm' | 'md' }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        'relative rounded-full transition-colors duration-200 focus:outline-none',
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

/* ─── Main Page ──────────────────────────────────────────────────────── */

export default function AgentPage() {
  const [mode, setMode] = useState<AgentMode>('supervised');
  const [tools, setTools] = useState<ToolConfig[]>(INITIAL_TOOLS);
  const [escalations, setEscalations] = useState<EscalationRule[]>(INITIAL_ESCALATIONS);
  const [dailyLimit, setDailyLimit] = useState(50);
  const [followUpGap, setFollowUpGap] = useState(3);
  const [maxFollowUps, setMaxFollowUps] = useState(4);
  const [workingHours, setWorkingHours] = useState('9am–6pm');
  const [testRunning, setTestRunning] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  function toggleTool(id: string) {
    setTools((prev) => prev.map((t) => t.id === id ? { ...t, enabled: !t.enabled } : t));
  }

  function toggleEscalation(id: string) {
    setEscalations((prev) => prev.map((e) => e.id === id ? { ...e, enabled: !e.enabled } : e));
  }

  async function runTest() {
    setTestRunning(true);
    setTestResult(null);
    await new Promise((r) => setTimeout(r, 2000));
    setTestResult(
      `Agent health check passed.\n\n✓ 4 tools active (email, LinkedIn, calendar, web research)\n✓ 6 escalation rules configured\n✓ Brain knowledge score: 72/100\n⚠ Voice calls are disabled — enable to reach prospects who don't respond to email\n✓ Working hours 9am–6pm active\n\nEstimated reach capacity: ~${dailyLimit * 7} contacts/week at current settings.`
    );
    setTestRunning(false);
  }

  const enabledTools = tools.filter((t) => t.enabled).length;
  const enabledEscalations = escalations.filter((e) => e.enabled).length;

  return (
    <div className="h-full overflow-y-auto bg-sand-50">
      <div className="p-6 max-w-[1100px] mx-auto space-y-5">

        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-sm">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ocean-900">AI Agent</h1>
              <p className="text-sm text-sand-500 mt-0.5">Your autonomous sales development representative</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={runTest}
              disabled={testRunning}
              className="inline-flex items-center gap-2 text-xs px-3 py-2 rounded-lg border border-sand-200 text-sand-600 hover:bg-sand-50 transition-colors disabled:opacity-50"
            >
              {testRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <FlaskConical className="w-3.5 h-3.5" />}
              {testRunning ? 'Running...' : 'Run Health Check'}
            </button>
          </div>
        </div>

        {/* ── Mode selector ── */}
        <div className="bg-white border border-sand-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-sand-900">Agent Mode</h3>
              <p className="text-xs text-sand-400 mt-0.5">How much autonomy the agent has over outreach decisions</p>
            </div>
            <span className={cn(
              'inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full',
              mode === 'autonomous' ? 'bg-green-100 text-green-700' :
              mode === 'supervised' ? 'bg-amber-100 text-amber-700' :
              'bg-sand-100 text-sand-500'
            )}>
              <span className={cn('w-1.5 h-1.5 rounded-full',
                mode === 'autonomous' ? 'bg-green-500 animate-pulse' :
                mode === 'supervised' ? 'bg-amber-500' : 'bg-sand-400'
              )} />
              {mode === 'autonomous' ? 'Fully Autonomous' : mode === 'supervised' ? 'Supervised' : 'Paused'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {([
              {
                key: 'supervised' as AgentMode,
                icon: Eye,
                label: 'Supervised',
                desc: 'AI drafts and queues actions for your approval. Nothing sends without review.',
                tag: 'Recommended',
                color: 'border-amber-200 bg-amber-50',
                activeColor: 'border-amber-500',
              },
              {
                key: 'autonomous' as AgentMode,
                icon: Zap,
                label: 'Autonomous',
                desc: 'AI executes outreach independently. You only see escalations.',
                tag: 'Advanced',
                color: 'border-green-100 bg-green-50/50',
                activeColor: 'border-green-500',
              },
              {
                key: 'paused' as AgentMode,
                icon: Pause,
                label: 'Paused',
                desc: 'Agent is inactive. No new actions will be taken on any campaign.',
                color: 'border-sand-100 bg-sand-50',
                activeColor: 'border-sand-400',
              },
            ] as const).map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={cn(
                  'text-left p-4 rounded-xl border-2 transition-all duration-150',
                  mode === m.key ? m.activeColor + ' shadow-sm' : 'border-sand-200 hover:border-sand-300'
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', m.color)}>
                    <m.icon className="w-4 h-4 text-sand-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-xs font-semibold text-sand-900">{m.label}</span>
                      {'tag' in m && m.tag && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-primary-100 text-primary-700">{m.tag}</span>
                      )}
                      {mode === m.key && <CheckCircle className="w-3.5 h-3.5 text-primary-600 ml-auto" />}
                    </div>
                    <p className="text-[11px] text-sand-500 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Active Campaigns', value: '3', sub: '1 paused', icon: Zap, color: 'text-primary-600' },
            { label: 'Actions Today',    value: '47', sub: '12 pending review', icon: Activity, color: 'text-green-600' },
            { label: 'Meetings Booked',  value: '4',  sub: 'This week', icon: Calendar, color: 'text-mint' },
            { label: 'Escalations',      value: '2',  sub: 'Need attention', icon: AlertTriangle, color: 'text-amber-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-sand-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-sand-400">{s.label}</span>
                <s.icon className={cn('w-4 h-4', s.color)} />
              </div>
              <p className={cn('text-2xl font-bold tabular-nums', s.color)}>{s.value}</p>
              <p className="text-[11px] text-sand-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* ── Tools ── */}
          <SectionCard title="Tool Permissions" description={`${enabledTools} of ${tools.length} tools active`}>
            <div className="space-y-3 pt-3">
              {tools.map((tool) => (
                <div key={tool.id} className="flex items-start gap-3">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                    tool.enabled ? 'bg-primary-50' : 'bg-sand-100'
                  )}>
                    <tool.icon className={cn('w-4 h-4', tool.enabled ? 'text-primary-600' : 'text-sand-400')} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-sand-800">{tool.label}</span>
                      <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded-full', RISK_COLORS[tool.riskLevel])}>
                        {tool.riskLevel} risk
                      </span>
                    </div>
                    <p className="text-[11px] text-sand-400 mt-0.5">{tool.description}</p>
                  </div>
                  <Toggle enabled={tool.enabled} onChange={() => toggleTool(tool.id)} />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── Behavior limits ── */}
          <SectionCard title="Behavior & Limits" description="How the agent behaves across campaigns">
            <div className="space-y-4 pt-3">
              {/* Daily limit */}
              <div>
                <div className="flex items-center justify-between mb-1">
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
                  <span>Conservative (10)</span><span>Aggressive (200)</span>
                </div>
              </div>

              {/* Follow-up gap */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-sand-700">Days between follow-ups</label>
                  <span className="text-xs font-bold text-primary-700">{followUpGap} days</span>
                </div>
                <input
                  type="range" min={1} max={14} step={1}
                  value={followUpGap}
                  onChange={(e) => setFollowUpGap(+e.target.value)}
                  className="w-full accent-primary-700 h-1.5"
                />
              </div>

              {/* Max follow-ups */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-sand-700">Maximum follow-ups per prospect</label>
                  <span className="text-xs font-bold text-primary-700">{maxFollowUps}</span>
                </div>
                <input
                  type="range" min={1} max={10} step={1}
                  value={maxFollowUps}
                  onChange={(e) => setMaxFollowUps(+e.target.value)}
                  className="w-full accent-primary-700 h-1.5"
                />
              </div>

              {/* Working hours */}
              <div>
                <label className="text-xs font-medium text-sand-700 block mb-1.5">Working hours (sends only within)</label>
                <select
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full text-xs border border-sand-200 rounded-lg px-3 py-2 text-sand-700 focus:border-primary-500 outline-none bg-white"
                >
                  <option value="9am–5pm">9am – 5pm</option>
                  <option value="9am–6pm">9am – 6pm</option>
                  <option value="8am–8pm">8am – 8pm</option>
                  <option value="always">24/7 (not recommended)</option>
                </select>
              </div>

              {/* Timezone */}
              <div className="flex items-center justify-between py-2 border-t border-sand-100">
                <div>
                  <p className="text-xs font-medium text-sand-700">Send in prospect's timezone</p>
                  <p className="text-[11px] text-sand-400">AI detects timezone from IP and LinkedIn</p>
                </div>
                <Toggle enabled={true} onChange={() => {}} />
              </div>

              <div className="flex items-center justify-between py-2 border-t border-sand-100">
                <div>
                  <p className="text-xs font-medium text-sand-700">Skip weekends</p>
                  <p className="text-[11px] text-sand-400">No outreach on Saturday or Sunday</p>
                </div>
                <Toggle enabled={true} onChange={() => {}} />
              </div>
            </div>
          </SectionCard>
        </div>

        {/* ── Escalation rules ── */}
        <SectionCard
          title="Escalation Rules"
          description={`${enabledEscalations} active rules — when the agent hands control back to you`}
        >
          <div className="divide-y divide-sand-100 mt-2">
            {escalations.map((rule) => (
              <div key={rule.id} className="flex items-start gap-3 py-3">
                <AlertTriangle className={cn('w-4 h-4 mt-0.5 shrink-0', rule.enabled ? 'text-amber-500' : 'text-sand-300')} />
                <div className="flex-1 min-w-0">
                  <p className={cn('text-xs font-medium', rule.enabled ? 'text-sand-800' : 'text-sand-400')}>
                    {rule.trigger}
                  </p>
                  <p className="text-[11px] text-sand-400 mt-0.5 flex items-center gap-1">
                    <ArrowRight className="w-2.5 h-2.5" />
                    {rule.action}
                  </p>
                </div>
                <Toggle enabled={rule.enabled} onChange={() => toggleEscalation(rule.id)} size="sm" />
              </div>
            ))}
          </div>
          <button className="mt-3 text-xs text-primary-700 hover:text-primary-800 font-medium flex items-center gap-1">
            <Settings2 className="w-3.5 h-3.5" />
            Add custom rule
          </button>
        </SectionCard>

        {/* ── Decision log ── */}
        <SectionCard title="Recent Agent Decisions" description="What your AI did in the last 24 hours">
          <div className="divide-y divide-sand-100 mt-2">
            {DECISION_LOG.map((log) => {
              const s = STATUS_COLORS[log.status];
              return (
                <div key={log.id} className="py-3 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-sand-800">{log.prospect}</span>
                      <span className="text-[10px] text-sand-400">·</span>
                      <span className="text-[10px] text-sand-500">{log.company}</span>
                      <span className={cn('ml-auto inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full', s.bg, s.text)}>
                        <span className={cn('w-1 h-1 rounded-full', s.dot)} />
                        {log.status}
                      </span>
                    </div>
                    <p className="text-xs text-sand-600 leading-relaxed">{log.decision}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-sand-300">{log.timestamp}</span>
                      <span className="text-[10px] text-sand-300">·</span>
                      <span className="text-[10px] text-sand-400">{log.channel}</span>
                      <span className="text-[10px] text-sand-300">·</span>
                      <span className="text-[10px] text-sand-400">{log.confidence}% confidence</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>

        {/* ── Health check result ── */}
        {testResult && (
          <div className="bg-white border border-primary-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <FlaskConical className="w-4 h-4 text-primary-600" />
              <h3 className="text-sm font-semibold text-primary-800">Health Check Results</h3>
              <button onClick={() => setTestResult(null)} className="ml-auto text-sand-400 hover:text-sand-600 text-xs">✕</button>
            </div>
            <pre className="text-xs text-sand-700 whitespace-pre-wrap font-sans leading-relaxed">{testResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
