'use client';

import React, { useState } from 'react';
import { FlaskConical, Plus, X, Globe, Building2, Upload, Link2, FileText, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { BrainHealthScore } from '@/components/brain/BrainHealthScore';
import { KnowledgeCard } from '@/components/brain/KnowledgeCard';
import { useBrainStore } from '@/stores/useBrainStore';
import { useActiveContext } from '@/stores/useContextStore';
import type { KnowledgeCardType } from '@/types/brain';
import { cn } from '@/lib/cn';

// Org-level knowledge (shared across all workspaces)
const ORG_TYPES: KnowledgeCardType[] = [
  'brand_voice', 'pricing', 'product_info', 'competitor_intel', 'help_docs',
];
// Workspace-level knowledge (campaign/ICP specific)
const WORKSPACE_TYPES: KnowledgeCardType[] = [
  'icp_profile', 'case_studies', 'winning_copy', 'objection_handling', 'meeting_playbook', 'industry_context',
];

type BrainTab = 'org' | 'workspace';

interface AddKnowledgeModalProps {
  onClose: () => void;
}

function AddKnowledgeModal({ onClose }: AddKnowledgeModalProps) {
  const [tab, setTab] = useState<'upload' | 'url' | 'text'>('upload');
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-white rounded-xl shadow-modal w-full max-w-lg">
        <div className="flex items-center justify-between px-5 py-4 border-b border-sand-200">
          <div>
            <h2 className="text-base font-semibold text-sand-900">Add Knowledge</h2>
            <p className="text-xs text-sand-400 mt-0.5">AI will categorize and extract insights automatically</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-sand-100 text-sand-400">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-5 space-y-4">
          {/* Input type tabs */}
          <div className="flex gap-1 bg-sand-100 rounded-lg p-1">
            {([
              { key: 'upload', icon: Upload, label: 'Upload File' },
              { key: 'url', icon: Link2, label: 'From URL' },
              { key: 'text', icon: FileText, label: 'Paste Text' },
            ] as const).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-1.5 text-xs font-medium py-1.5 rounded-md transition-colors',
                  tab === t.key ? 'bg-white text-sand-800 shadow-xs' : 'text-sand-500 hover:text-sand-700'
                )}
              >
                <t.icon className="w-3 h-3" />
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'upload' && (
            <div className="border-2 border-dashed border-sand-300 rounded-xl p-8 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-sand-300" />
              <p className="text-sm text-sand-600 font-medium">Drop a file or click to browse</p>
              <p className="text-xs text-sand-400 mt-1">PDF, DOCX, TXT, CSV — up to 10MB</p>
            </div>
          )}
          {tab === 'url' && (
            <input
              type="url"
              placeholder="https://your-site.com/page"
              className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2.5 focus:border-primary-500 outline-none"
            />
          )}
          {tab === 'text' && (
            <textarea
              rows={5}
              placeholder="Paste your content here — pricing page copy, objection responses, case study, etc."
              className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2.5 focus:border-primary-500 outline-none resize-none"
            />
          )}

          <div>
            <label className="text-xs font-medium text-sand-700 block mb-1.5">Category (optional — AI will auto-detect)</label>
            <select className="w-full text-xs border border-sand-200 rounded-lg px-3 py-2 focus:border-primary-500 outline-none bg-white text-sand-600">
              <option value="">Auto-detect</option>
              <option value="brand_voice">Brand Voice & Tone</option>
              <option value="icp_profile">ICP Profile</option>
              <option value="case_studies">Case Studies</option>
              <option value="winning_copy">Winning Copy</option>
              <option value="competitor_intel">Competitor Intel</option>
              <option value="objection_handling">Objection Handling</option>
              <option value="pricing">Pricing & Packaging</option>
              <option value="product_info">Product & Features</option>
              <option value="help_docs">Help Docs & FAQs</option>
              <option value="meeting_playbook">Meeting Playbook</option>
              <option value="industry_context">Industry Context</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 px-5 pb-5">
          <Button variant="primary" className="flex-1" onClick={onClose}>
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Process & Add to Brain
          </Button>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default function BrainPage() {
  const { healthScore, cards, lastTestedAt, testResults, isTesting, runKnowledgeTest, clearTestResults } =
    useBrainStore();
  const activeContext = useActiveContext();

  const [activeTab, setActiveTab] = useState<BrainTab>('org');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const visibleTypes = activeTab === 'org' ? ORG_TYPES : WORKSPACE_TYPES;
  const visibleCards = cards.filter((c) => visibleTypes.includes(c.type));

  const orgCards = cards.filter((c) => ORG_TYPES.includes(c.type));
  const workspaceCards = cards.filter((c) => WORKSPACE_TYPES.includes(c.type));

  const orgScore = Math.round(
    orgCards.reduce((s, c) => s + c.completeness, 0) / (orgCards.length || 1)
  );
  const wsScore = Math.round(
    workspaceCards.reduce((s, c) => s + c.completeness, 0) / (workspaceCards.length || 1)
  );

  return (
    <div className="h-full overflow-y-auto bg-sand-50">
      <div className="p-6 max-w-[1200px] mx-auto space-y-5">

        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-ocean-900">Brain</h1>
            <p className="text-sm text-sand-500 mt-1">
              Everything your AI knows. The more you teach it, the better it performs.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="secondary" onClick={() => setShowUploadModal(true)}>
              <Plus className="w-4 h-4 mr-1.5" />
              Add Knowledge
            </Button>
            <Button variant="primary" onClick={runKnowledgeTest} disabled={isTesting}>
              {isTesting ? (
                <><Spinner size="sm" className="mr-2" />Testing...</>
              ) : (
                <><FlaskConical className="w-4 h-4 mr-1.5" />Test AI Brain</>
              )}
            </Button>
          </div>
        </div>

        {/* ── Health score ── */}
        <BrainHealthScore score={healthScore} cards={cards} />

        {/* ── Test results ── */}
        {testResults && (
          <div className="bg-white border border-primary-200 rounded-xl p-5 relative">
            <button onClick={clearTestResults} className="absolute top-3 right-3 p-1 rounded hover:bg-sand-100 text-sand-400">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-3">
              <FlaskConical className="w-4 h-4 text-primary-700" />
              <h3 className="text-sm font-semibold text-primary-800">Knowledge Test Results</h3>
            </div>
            <p className="text-sm text-sand-700 whitespace-pre-line leading-relaxed">{testResults}</p>
            {lastTestedAt && (
              <p className="text-xs text-sand-400 mt-3">
                Tested {new Date(lastTestedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>
        )}

        {/* ── Scope tabs ── */}
        <div className="bg-white border border-sand-200 rounded-xl overflow-hidden">
          <div className="flex border-b border-sand-200">
            {([
              {
                key: 'org' as BrainTab,
                icon: Globe,
                label: 'Org Knowledge',
                sub: 'Shared across all workspaces',
                score: orgScore,
                count: orgCards.length,
              },
              {
                key: 'workspace' as BrainTab,
                icon: Building2,
                label: `${activeContext?.name ?? 'Workspace'} Knowledge`,
                sub: 'Only for this workspace',
                score: wsScore,
                count: workspaceCards.length,
              },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'flex-1 flex items-center gap-3 px-5 py-4 text-left transition-colors border-b-2',
                  activeTab === tab.key
                    ? 'border-primary-700 bg-primary-50/40'
                    : 'border-transparent hover:bg-sand-50'
                )}
              >
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  activeTab === tab.key ? 'bg-primary-100' : 'bg-sand-100'
                )}>
                  <tab.icon className={cn('w-4 h-4', activeTab === tab.key ? 'text-primary-700' : 'text-sand-400')} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-semibold', activeTab === tab.key ? 'text-primary-800' : 'text-sand-700')}>
                    {tab.label}
                  </p>
                  <p className="text-xs text-sand-400">{tab.sub}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={cn('text-xl font-bold tabular-nums',
                    tab.score >= 70 ? 'text-green-600' : tab.score >= 40 ? 'text-amber-600' : 'text-red-500'
                  )}>
                    {tab.score}%
                  </p>
                  <p className="text-[10px] text-sand-400">{tab.count} categories</p>
                </div>
              </button>
            ))}
          </div>

          {/* Scope description */}
          <div className="px-5 py-3 bg-sand-50/50 border-b border-sand-100">
            {activeTab === 'org' ? (
              <p className="text-xs text-sand-500 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sand-400" />
                <strong className="font-semibold">Org knowledge</strong> is shared across all your workspaces — brand voice, product info, pricing, help docs, and competitive intel.
              </p>
            ) : (
              <p className="text-xs text-sand-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sand-400" />
                <strong className="font-semibold">{activeContext?.name} knowledge</strong> is private to this workspace — ICP definitions, case studies, winning copy patterns, and playbooks.
              </p>
            )}
          </div>

          {/* Cards grid */}
          <div className="p-5">
            {visibleCards.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 rounded-xl bg-sand-100 flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-6 h-6 text-sand-400" />
                </div>
                <p className="text-sm font-medium text-sand-700">No knowledge added yet</p>
                <p className="text-xs text-sand-400 mt-1 mb-4">
                  {activeTab === 'org'
                    ? 'Add company-wide content — your brand voice, pricing, and product details'
                    : 'Add workspace-specific content — ICP profiles, case studies, and playbooks'}
                </p>
                <Button variant="primary" onClick={() => setShowUploadModal(true)}>
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Add First Knowledge
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {visibleCards.map((card) => (
                  <KnowledgeCard key={card.id} card={card} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {showUploadModal && <AddKnowledgeModal onClose={() => setShowUploadModal(false)} />}
    </div>
  );
}
