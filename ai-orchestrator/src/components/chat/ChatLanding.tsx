'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/cn';
import { useMessagesForCampaign, useIsAiThinking, useChatStore } from '@/stores/useChatStore';
import { handleUserMessage } from '@/lib/mock-ai';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { AiThinkingIndicator } from '@/components/chat/AiThinkingIndicator';
import { FloatingChips } from '@/components/chat/FloatingChips';
import { PlanPanel } from '@/components/chat/PlanPanel';
import { ArtifactsPanel } from '@/components/chat/ArtifactsPanel';
import { ModeSwitcher, ModeIndicator, ModeDescription } from '@/components/chat/ModeSwitcher';
import { ChatSettingsPanel } from '@/components/chat/ChatSettingsPanel';
import { useUiStore } from '@/stores/useUiStore';
import {
  Crosshair,
  Mail,
  ListOrdered,
  Flame,
  Brain,
  Rocket,
  ScanSearch,
  BarChart3,
  Zap,
  Settings2,
  MessageCircle,
  Map,
} from 'lucide-react';

export const LANDING_ID = 'landing';

// ── Recipes ───────────────────────────────────────────────────────────────────

const RECIPES = [
  { icon: Crosshair,  label: 'Find & reach my ideal leads',    prompt: 'Find and reach my ideal leads — end to end',                             color: 'text-ocean-500' },
  { icon: Mail,       label: 'Set up my email accounts',        prompt: 'Help me set up my email accounts',                                       color: 'text-mint-dark' },
  { icon: ListOrdered,label: 'Create a sequence',               prompt: 'Create an email sequence for me',                                        color: 'text-amber-dark' },
  { icon: Flame,      label: 'Apply warmup best practices',     prompt: 'Apply warmup best practices to my email accounts',                       color: 'text-coral-dark' },
  { icon: Brain,      label: 'Build my AI Brain',               prompt: 'Help me build my AI Brain knowledge base',                               color: 'text-lavender-dark' },
  { icon: Rocket,     label: 'Launch AI outreach campaign',     prompt: 'Launch an AI outreach campaign',                                         color: 'text-ocean-500' },
  { icon: ScanSearch, label: 'Analyze my current setup',        prompt: 'Analyze my current outreach setup and deliverability health',             color: 'text-mint-dark' },
  { icon: BarChart3,  label: 'AI column for my leads',          prompt: 'Create an AI column for my lead list',                                   color: 'text-amber-dark' },
  { icon: Zap,        label: 'Reach 1M prospects',              prompt: 'I want to reach 1 million prospects this month — plan this for me',      color: 'text-lavender-dark' },
];

// ── Mode-aware placeholders & glow colors ────────────────────────────────────

const MODE_CONFIG = {
  ask: {
    placeholder: 'Ask me anything about your outreach...',
    activePlaceholder: 'Ask a follow-up question...',
    glowClass: 'border-ocean-400 shadow-glow',
    sendBg: 'bg-ocean-500 hover:bg-ocean-600',
    heroCopy: 'What can I help you with?',
    heroSub: 'I\'ll ask the right questions to understand your needs first.',
    accentColor: '#2563EB',
  },
  plan: {
    placeholder: 'Describe your goal — I\'ll create a plan...',
    activePlaceholder: 'Describe what you want to achieve...',
    glowClass: 'border-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.15)]',
    sendBg: 'bg-amber-500 hover:bg-amber-600',
    heroCopy: 'What should we plan?',
    heroSub: 'I\'ll create a detailed, step-by-step strategy for your approval.',
    accentColor: '#F59E0B',
  },
  execute: {
    placeholder: 'Tell me what to do — I\'ll handle it now...',
    activePlaceholder: 'Give me the next instruction...',
    glowClass: 'border-green-400 shadow-[0_0_24px_rgba(16,185,129,0.15)]',
    sendBg: 'bg-green-600 hover:bg-green-700',
    heroCopy: 'What should I execute?',
    heroSub: 'I\'ll take action immediately and show you real-time progress.',
    accentColor: '#10B981',
  },
};

// ── Floating outbound vectors background ──────────────────────────────────────

function EmailVectorBackground({ dimLevel }: { dimLevel: 0 | 1 | 2 }) {
  const opacity = dimLevel === 0 ? 1 : dimLevel === 1 ? 0.5 : 0.15;
  const c1 = '#93C5FD';
  const c2 = '#6EE7B7';
  const c3 = '#C4B5FD';
  const c4 = '#FDE68A';

  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      aria-hidden
      style={{ opacity, transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div
        className="absolute"
        style={{
          width: 700, height: 500,
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, rgba(60,203,160,0.03) 40%, transparent 70%)',
          top: '45%', left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <svg className="absolute" style={{ top: 60, left: 80, opacity: 0.18, animation: 'vecFloat1 8s ease-in-out infinite' }} width="64" height="48" viewBox="0 0 64 48" fill="none">
        <rect x="2" y="2" width="60" height="44" rx="6" stroke={c1} strokeWidth="2"/>
        <path d="M2 8 L32 28 L62 8" stroke={c1} strokeWidth="2"/>
      </svg>
      <svg className="absolute" style={{ bottom: 100, right: 100, opacity: 0.14, animation: 'vecFloat2 9s ease-in-out infinite' }} width="60" height="54" viewBox="0 0 60 54" fill="none">
        <rect x="2" y="14" width="56" height="38" rx="5" stroke={c3} strokeWidth="2"/>
        <path d="M2 18 L30 36 L58 18" stroke={c3} strokeWidth="2"/>
        <path d="M2 14 L30 2 L58 14" stroke={c3} strokeWidth="1.5" strokeDasharray="3 2"/>
      </svg>
      <svg className="absolute" style={{ top: 120, right: 160, opacity: 0.16, animation: 'vecFloat3 10s ease-in-out infinite' }} width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="10" stroke={c2} strokeWidth="2"/>
        <path d="M34 24 C34 30 37 33 41 30.5 C42 20 34 12 24 14 C14 16 10 24 13 33 C16 42 28 44 35 39" stroke={c2} strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <svg className="absolute" style={{ top: '42%', left: 50, opacity: 0.17, animation: 'vecFloat2 7s ease-in-out infinite' }} width="52" height="52" viewBox="0 0 52 52" fill="none">
        <path d="M6 26 L46 6 L36 46 L26 30 Z" stroke={c1} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M46 6 L26 30" stroke={c1} strokeWidth="1.5"/>
      </svg>
      <svg className="absolute" style={{ top: 45, left: '35%', opacity: 0.15, animation: 'vecFloat1 11s ease-in-out infinite' }} width="160" height="44" viewBox="0 0 160 44" fill="none">
        <circle cx="16" cy="22" r="10" stroke={c1} strokeWidth="1.8"/>
        <text x="16" y="26" textAnchor="middle" fill={c1} fontSize="11" fontWeight="600">1</text>
        <line x1="27" y1="22" x2="63" y2="22" stroke={c1} strokeWidth="1.5" strokeDasharray="5 3"/>
        <circle cx="80" cy="22" r="10" stroke={c2} strokeWidth="1.8"/>
        <text x="80" y="26" textAnchor="middle" fill={c2} fontSize="11" fontWeight="600">2</text>
        <line x1="91" y1="22" x2="127" y2="22" stroke={c2} strokeWidth="1.5" strokeDasharray="5 3"/>
        <circle cx="144" cy="22" r="10" stroke={c3} strokeWidth="1.8"/>
        <text x="144" y="26" textAnchor="middle" fill={c3} fontSize="11" fontWeight="600">3</text>
      </svg>
      <svg className="absolute" style={{ bottom: 80, left: 180, opacity: 0.14, animation: 'vecFloat3 9s ease-in-out infinite' }} width="48" height="52" viewBox="0 0 48 52" fill="none">
        <rect x="2" y="8" width="44" height="42" rx="6" stroke={c4} strokeWidth="2"/>
        <line x1="2" y1="20" x2="46" y2="20" stroke={c4} strokeWidth="2"/>
        <line x1="14" y1="2" x2="14" y2="14" stroke={c4} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="34" y1="2" x2="34" y2="14" stroke={c4} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <svg className="absolute" style={{ top: '55%', right: 60, opacity: 0.15, animation: 'vecFloat1 8.5s ease-in-out infinite' }} width="56" height="44" viewBox="0 0 56 44" fill="none">
        <rect x="2" y="2" width="52" height="40" rx="6" stroke={c2} strokeWidth="2"/>
        <path d="M2 24 L14 24 Q20 34 28 34 Q36 34 42 24 L54 24" stroke={c2} strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <svg className="absolute" style={{ bottom: 0, left: 0, opacity: 0.1 }} width="320" height="360" viewBox="0 0 320 360" fill="none">
        <path d="M-20 360 C30 300 50 250 100 200 C150 150 120 100 170 60 C200 35 250 30 280 5" stroke={c1} strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M30 360 C70 290 80 240 120 190 C170 130 150 80 200 40" stroke={c3} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
      <svg className="absolute" style={{ top: 0, right: 0, opacity: 0.08 }} width="300" height="320" viewBox="0 0 300 320" fill="none">
        <path d="M320 -10 C270 40 240 90 200 140 C160 190 180 230 140 270 C120 290 70 300 40 320" stroke={c3} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <style>{`
        @keyframes vecFloat1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes vecFloat2 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-6px) translateX(3px); } }
        @keyframes vecFloat3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-5px) rotate(2deg); } }
      `}</style>
    </div>
  );
}

// ── Mode-specific thinking indicators ────────────────────────────────────────

function ModeThinkingLabel() {
  const chatMode = useUiStore((s) => s.chatMode);
  const labels = {
    ask: 'Thinking...',
    plan: 'Building plan...',
    execute: 'Executing...',
  };
  const colors = {
    ask: 'text-ocean-500',
    plan: 'text-amber-600',
    execute: 'text-green-600',
  };
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className={cn('text-[11px] font-semibold', colors[chatMode])}>{labels[chatMode]}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export function ChatLanding() {
  const messages = useMessagesForCampaign(LANDING_ID);
  const isThinking = useIsAiThinking(LANDING_ID);
  const addUserMessage = useChatStore((s) => s.addUserMessage);
  const chatMode = useUiStore((s) => s.chatMode);
  const toggleChatSettings = useUiStore((s) => s.toggleChatSettings);

  const [inputValue, setInputValue] = useState('');
  const [panelOpen, setPanelOpen] = useState<'plan' | 'artifacts' | null>(null);
  const landingTextareaRef = useRef<HTMLTextAreaElement>(null);
  const activeTextareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const hasMessages = messages.length > 0;
  const isTyping = inputValue.length > 0;
  const dimLevel: 0 | 1 | 2 = hasMessages ? 2 : isTyping ? 1 : 0;
  const modeConfig = MODE_CONFIG[chatMode];

  // Derive floating chip options from the last AI message
  const lastAiMsg = [...messages].reverse().find((m) => m.role === 'ai');
  const pendingOptions =
    lastAiMsg?.metadata?.questionOptions && lastAiMsg.metadata.questionOptions.length > 0
      ? lastAiMsg.metadata.questionOptions
      : null;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const resizeTextarea = (ref: React.RefObject<HTMLTextAreaElement | null>) => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 132)}px`;
  };

  const handleSend = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isThinking) return;
      setInputValue('');
      if (landingTextareaRef.current) landingTextareaRef.current.style.height = 'auto';
      if (activeTextareaRef.current) activeTextareaRef.current.style.height = 'auto';
      addUserMessage(LANDING_ID, trimmed);
      handleUserMessage(LANDING_ID, trimmed);
    },
    [isThinking, addUserMessage]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(inputValue);
    }
  };

  const handleRecipe = (prompt: string) => handleSend(prompt);

  const handleNewConversation = () => {
    useChatStore.setState((state) => ({
      messagesByCampaign: { ...state.messagesByCampaign, [LANDING_ID]: [] },
      isAiThinking: { ...state.isAiThinking, [LANDING_ID]: false },
    }));
    setInputValue('');
    setPanelOpen(null);
  };

  // ── Send button (mode-aware color) ──
  const SendButton = ({ onClick, disabled }: { onClick: () => void; disabled: boolean }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-150',
        !disabled
          ? cn(modeConfig.sendBg, 'text-white shadow-md hover:shadow-lg active:scale-95')
          : 'bg-sand-200 text-sand-400 cursor-not-allowed'
      )}
      aria-label="Send"
    >
      {chatMode === 'plan' ? (
        <Map className="w-4 h-4" />
      ) : chatMode === 'execute' ? (
        <Zap className="w-4 h-4" />
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      )}
    </button>
  );

  return (
    <div className="relative h-screen flex flex-col overflow-hidden bg-sand-50 font-sans">
      {/* Email vector background */}
      <EmailVectorBackground dimLevel={dimLevel} />

      {/* Settings Panel (slides from right) */}
      <ChatSettingsPanel />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-3.5 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: `linear-gradient(135deg, ${modeConfig.accentColor} 0%, #3CCBA0 100%)` }}
          >
            🐙
          </div>
          <span className="font-semibold text-sand-800 tracking-tight text-base">
            Outbound Octopus
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Switcher — always visible in header */}
          <ModeSwitcher />

          {/* Settings gear */}
          <button
            onClick={toggleChatSettings}
            className="p-2 rounded-lg hover:bg-sand-100 transition-colors text-sand-400 hover:text-sand-700"
            title="Agent Settings"
          >
            <Settings2 className="w-4 h-4" />
          </button>

          {/* New chat button */}
          {hasMessages && (
            <button
              onClick={handleNewConversation}
              className={cn(
                'flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-full',
                'border border-sand-300 bg-white text-sand-600',
                'hover:bg-sand-50 hover:border-sand-400 hover:text-sand-800',
                'shadow-xs transition-all duration-150'
              )}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Chat
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col overflow-hidden">
        {!hasMessages ? (
          // ── LANDING STATE ───────────────────────────────────────────────────
          <div className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-center px-6 pb-6">

            {/* Hero — mode-aware */}
            <div className="text-center mb-10">
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-4xl shadow-lg animate-gentle-float"
                style={{ background: `linear-gradient(135deg, ${modeConfig.accentColor} 0%, #3CCBA0 100%)` }}
              >
                🐙
              </div>
              <h1 className="font-serif text-[34px] leading-tight text-sand-900 mb-2">
                {modeConfig.heroCopy}
              </h1>
              <p className="text-sand-500 text-sm font-medium max-w-[420px] mx-auto">
                {modeConfig.heroSub}
              </p>
            </div>

            {/* Chat input — landing */}
            <div
              className={cn(
                'w-full max-w-[620px] mb-6 transition-transform duration-300',
                isTyping ? 'scale-[1.01]' : 'scale-100'
              )}
            >
              <div
                className={cn(
                  'bg-white rounded-2xl p-3 border transition-all duration-200',
                  isTyping ? modeConfig.glowClass : 'border-sand-200 shadow-md hover:shadow-lg'
                )}
              >
                {/* Input row */}
                <div className="flex items-end gap-3">
                  <textarea
                    ref={landingTextareaRef}
                    value={inputValue}
                    onChange={(e) => { setInputValue(e.target.value); resizeTextarea(landingTextareaRef); }}
                    onKeyDown={handleKeyDown}
                    placeholder={modeConfig.placeholder}
                    rows={1}
                    className="flex-1 resize-none outline-none text-sm text-sand-800 placeholder-sand-400 leading-relaxed bg-transparent py-0.5"
                    autoFocus
                  />
                  <SendButton onClick={() => handleSend(inputValue)} disabled={!inputValue.trim()} />
                </div>

                {/* Mode hint bar below textarea */}
                <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-sand-100">
                  <ModeDescription />
                  <span className="text-[10px] text-sand-300">Shift+Enter for new line</span>
                </div>
              </div>
            </div>

            {/* Recipe grid — 3x3 */}
            <div
              className={cn(
                'w-full max-w-[620px] grid grid-cols-3 gap-3 transition-all duration-400',
                isTyping ? 'opacity-20 scale-[0.97] pointer-events-none' : 'opacity-100'
              )}
            >
              {RECIPES.map((recipe) => (
                <button
                  key={recipe.label}
                  onClick={() => handleRecipe(recipe.prompt)}
                  className={cn(
                    'group text-left rounded-xl p-4 border bg-sand-50 border-sand-200',
                    'shadow-xs hover:shadow-sm',
                    'hover:-translate-y-[2px] hover:bg-ocean-50 hover:border-ocean-200',
                    'active:translate-y-0 active:shadow-xs',
                    'transition-all duration-250'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center mb-3',
                      'bg-white border border-sand-200 group-hover:border-ocean-200',
                      'transition-colors duration-250',
                      recipe.color
                    )}
                  >
                    <recipe.icon className="w-4 h-4" strokeWidth={2} />
                  </div>
                  <div className="text-xs font-semibold text-sand-700 leading-snug">
                    {recipe.label}
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-5 text-xs text-sand-400 font-medium text-center">
              — or just type anything. I handle all of SalesHandy. —
            </p>
          </div>
        ) : (
          // ── ACTIVE CONVERSATION STATE ────────────────────────────────────────
          <>
            {/* Panels */}
            {panelOpen === 'plan' && (
              <PlanPanel onClose={() => setPanelOpen(null)} messages={messages} campaignId={LANDING_ID} />
            )}
            {panelOpen === 'artifacts' && (
              <ArtifactsPanel onClose={() => setPanelOpen(null)} messages={messages} />
            )}

            <div className="flex-1 min-h-0 flex flex-row overflow-hidden">
              {/* Left sidebar */}
              <div className="w-14 flex-shrink-0 flex flex-col items-center gap-3 pt-4 border-r border-sand-200 bg-white/60">
                <button
                  onClick={() => setPanelOpen(panelOpen === 'plan' ? null : 'plan')}
                  title="Campaign Plan"
                  className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center text-sm border transition-all duration-200',
                    'hover:-translate-y-[1px] hover:shadow-sm',
                    panelOpen === 'plan'
                      ? 'bg-ocean-500 text-white border-ocean-600 shadow-md'
                      : 'bg-ocean-50 border-ocean-200 text-ocean-600 hover:border-ocean-300'
                  )}
                >
                  📋
                </button>
                <button
                  onClick={() => setPanelOpen(panelOpen === 'artifacts' ? null : 'artifacts')}
                  title="Artifacts"
                  className={cn(
                    'w-9 h-9 rounded-xl flex items-center justify-center text-sm border transition-all duration-200',
                    'hover:-translate-y-[1px] hover:shadow-sm',
                    panelOpen === 'artifacts'
                      ? 'bg-lavender text-white border-lavender-dark shadow-md'
                      : 'bg-lavender-soft border-lavender text-lavender-dark hover:border-lavender-dark'
                  )}
                >
                  🗂️
                </button>

                {/* Divider */}
                <div className="w-6 border-t border-sand-200" />

                {/* Settings shortcut */}
                <button
                  onClick={toggleChatSettings}
                  title="Agent Settings"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm border border-sand-200 bg-sand-50 text-sand-400 hover:text-sand-700 hover:border-sand-300 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-sm"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>

              {/* Main chat column */}
              <div className="flex-1 min-w-0 flex flex-col min-h-0">
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto">
                  <div className="max-w-[680px] mx-auto px-4 py-6 space-y-5">
                    {messages.map((msg) => (
                      <ChatMessage key={msg.id} message={msg} />
                    ))}
                    {isThinking && (
                      <>
                        <ModeThinkingLabel />
                        <AiThinkingIndicator />
                      </>
                    )}
                  </div>
                </div>

                {/* Floating chips */}
                {pendingOptions && !isThinking && (
                  <FloatingChips
                    key={lastAiMsg?.id}
                    options={pendingOptions}
                    campaignId={LANDING_ID}
                  />
                )}

                {/* Input — active state */}
                <div className="border-t border-sand-200 bg-white/95 backdrop-blur-sm px-4 py-3 shrink-0">
                  <div className="max-w-[680px] mx-auto">
                    <div
                      className={cn(
                        'bg-white border rounded-2xl p-3 transition-all duration-200',
                        inputValue ? modeConfig.glowClass : 'border-sand-200 shadow-sm'
                      )}
                    >
                      {/* Input row */}
                      <div className="flex items-end gap-3">
                        <textarea
                          ref={activeTextareaRef}
                          value={inputValue}
                          onChange={(e) => { setInputValue(e.target.value); resizeTextarea(activeTextareaRef); }}
                          onKeyDown={handleKeyDown}
                          placeholder={modeConfig.activePlaceholder}
                          rows={1}
                          className="flex-1 resize-none outline-none text-sm text-sand-800 placeholder-sand-400 leading-relaxed bg-transparent py-0.5"
                          autoFocus
                        />
                        <SendButton onClick={() => handleSend(inputValue)} disabled={!inputValue.trim() || isThinking} />
                      </div>

                      {/* Mode + shortcut hint */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-sand-100">
                        <ModeIndicator />
                        <span className="text-[10px] text-sand-300">Shift+Enter for new line</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
