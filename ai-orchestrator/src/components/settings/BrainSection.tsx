'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/cn';

interface BrainEntry {
  id: string;
  type: 'text' | 'url';
  title: string;
  content: string;
  addedAt: string;
}

const INITIAL_ENTRIES: BrainEntry[] = [
  {
    id: 'b1',
    type: 'text',
    title: 'Company Overview',
    content: 'We help B2B SaaS companies scale outbound with AI-driven personalization and automated multi-channel sequences.',
    addedAt: '2026-03-01',
  },
  {
    id: 'b2',
    type: 'url',
    title: 'Product one-pager',
    content: 'https://saleshandy.com/one-pager',
    addedAt: '2026-03-05',
  },
  {
    id: 'b3',
    type: 'text',
    title: 'ICP — Target persona',
    content: 'VP of Sales / Head of Growth at Series A–C SaaS companies (50–500 employees). Pain: manual prospecting, low reply rates, inconsistent follow-up.',
    addedAt: '2026-03-08',
  },
];

const BRAIN_HEALTH_PERCENT = 72;

export function BrainSection() {
  const [entries, setEntries] = useState<BrainEntry[]>(INITIAL_ENTRIES);
  const [addMode, setAddMode] = useState<'text' | 'url' | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const removeEntry = (id: string) => setEntries((prev) => prev.filter((e) => e.id !== id));

  const saveEntry = () => {
    if (!newContent.trim()) return;
    const entry: BrainEntry = {
      id: `b${Date.now()}`,
      type: addMode!,
      title: newTitle.trim() || (addMode === 'url' ? 'Web link' : 'Knowledge snippet'),
      content: newContent.trim(),
      addedAt: new Date().toISOString().slice(0, 10),
    };
    setEntries((prev) => [...prev, entry]);
    setNewTitle('');
    setNewContent('');
    setAddMode(null);
  };

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-sand-800 flex items-center gap-2">
            🧠 AI Brain
          </h3>
          <p className="text-base text-sand-500 mt-0.5">
            Teach the AI about your company, product, and ideal customers. The richer the brain, the better every email.
          </p>
        </div>
      </div>

      {/* Brain health bar */}
      <div className="bg-white border border-sand-200 rounded-lg p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-sand-800">Brain health</p>
            <p className="text-xs text-sand-500 mt-0.5">How well the AI knows your business</p>
          </div>
          <span
            className={cn(
              'text-sm font-bold px-3 py-1 rounded-full border-2',
              BRAIN_HEALTH_PERCENT >= 80
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : BRAIN_HEALTH_PERCENT >= 50
                ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                : 'bg-red-50 border-red-300 text-red-700'
            )}
          >
            {BRAIN_HEALTH_PERCENT}%
          </span>
        </div>

        <div className="h-3 bg-sand-100 rounded-full overflow-hidden border border-sand-200 mb-2">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-700',
              BRAIN_HEALTH_PERCENT >= 80
                ? 'bg-emerald-500'
                : BRAIN_HEALTH_PERCENT >= 50
                ? 'bg-yellow-400'
                : 'bg-red-500'
            )}
            style={{ width: `${BRAIN_HEALTH_PERCENT}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          {[
            { label: 'Company context', done: true },
            { label: 'ICP defined', done: true },
            { label: 'Product details', done: true },
            { label: 'Case studies', done: false },
            { label: 'Competitor context', done: false },
            { label: 'Tone & voice sample', done: false },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                'flex items-center gap-2 text-xs rounded-lg px-2.5 py-1.5 border',
                item.done
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-sand-50 border-sand-200 text-sand-400'
              )}
            >
              {item.done ? (
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              )}
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Knowledge base entries */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-sand-800">Knowledge base ({entries.length} entries)</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAddMode('url')}
              className="text-xs font-medium text-sand-600 border border-sand-300 px-3 py-1.5 rounded-lg hover:bg-sand-50 transition-colors"
            >
              + Add URL
            </button>
            <button
              onClick={() => setAddMode('text')}
              className="text-xs font-semibold text-white bg-primary-700 border border-primary-700 px-3 py-1.5 rounded-lg hover:bg-primary-800 transition-colors"
            >
              + Add text
            </button>
          </div>
        </div>

        {/* Add form */}
        {addMode && (
          <div className="bg-white border-2 border-primary-200 rounded-lg p-4 space-y-3">
            <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide">
              {addMode === 'url' ? 'Add a URL' : 'Add knowledge text'}
            </p>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title (optional)"
              className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500 text-sand-800 placeholder-sand-400"
            />
            {addMode === 'url' ? (
              <input
                type="url"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="https://..."
                className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500 text-sand-800 placeholder-sand-400 font-mono"
              />
            ) : (
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Paste your company overview, product notes, ICP description, tone examples..."
                rows={4}
                className="w-full text-sm border border-sand-200 rounded-lg px-3 py-2 outline-none focus:border-primary-500 text-sand-800 placeholder-sand-400 resize-none leading-relaxed"
              />
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={saveEntry}
                disabled={!newContent.trim()}
                className="text-xs font-semibold text-white bg-primary-700 px-4 py-1.5 rounded-lg hover:bg-primary-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Save to Brain
              </button>
              <button
                onClick={() => { setAddMode(null); setNewTitle(''); setNewContent(''); }}
                className="text-xs font-medium text-sand-500 px-3 py-1.5 rounded-lg hover:bg-sand-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Entry list */}
        <div className="space-y-2">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white border border-sand-200 rounded-lg px-4 py-3 flex items-start gap-3 group hover:border-sand-300 transition-colors"
            >
              <div
                className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 border',
                  entry.type === 'url'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-amber-50 border-amber-200'
                )}
              >
                {entry.type === 'url' ? '🔗' : '📝'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-sand-800 truncate">{entry.title}</p>
                  <span className="text-[10px] text-sand-400 flex-shrink-0">{entry.addedAt}</span>
                </div>
                <p className="text-xs text-sand-500 truncate mt-0.5">{entry.content}</p>
              </div>
              <button
                onClick={() => removeEntry(entry.id)}
                className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded flex items-center justify-center text-sand-400 hover:text-red-500 hover:bg-red-50 transition-all flex-shrink-0"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* File upload placeholder */}
      <div className="border-2 border-dashed border-sand-200 rounded-lg p-6 text-center hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer group">
        <div className="text-2xl mb-2">📎</div>
        <p className="text-sm font-medium text-sand-600 group-hover:text-primary-700 transition-colors">
          Drop files here to add to Brain
        </p>
        <p className="text-xs text-sand-400 mt-1">PDF, DOCX, TXT — max 10 MB</p>
      </div>
    </div>
  );
}
