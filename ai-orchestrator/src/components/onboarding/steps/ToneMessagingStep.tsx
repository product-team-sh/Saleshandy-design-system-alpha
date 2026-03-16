'use client';

import React from 'react';
import { cn } from '@/lib/cn';
import { Toggle } from '@/components/ui/Toggle';
import { useOnboardingStore } from '@/stores/useOnboardingStore';

const TONE_OPTIONS = [
  {
    value: 'formal' as const,
    title: 'Formal',
    description: 'Professional and structured. Best for enterprise and finance.',
    icon: '🏢',
  },
  {
    value: 'friendly' as const,
    title: 'Friendly',
    description: 'Warm and conversational. Best for startups and SMBs.',
    icon: '👋',
  },
  {
    value: 'bold' as const,
    title: 'Bold',
    description: 'Direct and confident. Best for competitive markets.',
    icon: '🎯',
  },
];

export function ToneMessagingStep() {
  const { data, updateData } = useOnboardingStore();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-base font-medium text-sand-800 mb-3">
          Pick a tone <span className="text-red-700">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TONE_OPTIONS.map((tone) => (
            <button
              key={tone.value}
              type="button"
              onClick={() => updateData({ tone: tone.value })}
              className={cn(
                'text-left p-4 rounded-md border-2 transition-all duration-base',
                data.tone === tone.value
                  ? 'border-primary-700 bg-primary-50'
                  : 'border-sand-200 bg-white hover:border-sand-300'
              )}
            >
              <span className="text-2xl">{tone.icon}</span>
              <p className="text-base font-semibold text-sand-800 mt-2">{tone.title}</p>
              <p className="text-sm text-sand-500 mt-1">{tone.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-base font-medium text-sand-800 mb-2">
          Draft a sample first email (optional)
        </label>
        <textarea
          className="w-full border border-sand-200 rounded-md px-3 py-2 text-base text-sand-800 placeholder-sand-400 focus:border-primary-700 focus:shadow-focused outline-none transition-colors duration-fast min-h-[120px] resize-y"
          placeholder="Write how you'd typically open a cold email. The AI will learn from your style."
          value={data.sampleEmail}
          onChange={(e) => updateData({ sampleEmail: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-base font-medium text-sand-800 mb-2">
          Common objections & responses (optional)
        </label>
        <textarea
          className="w-full border border-sand-200 rounded-md px-3 py-2 text-base text-sand-800 placeholder-sand-400 focus:border-primary-700 focus:shadow-focused outline-none transition-colors duration-fast min-h-[80px] resize-y"
          placeholder={`e.g., "We already use X" → Explain how you differ…`}
          value={data.objections}
          onChange={(e) => updateData({ objections: e.target.value })}
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-sand-50 rounded-md">
        <div>
          <p className="text-base font-medium text-sand-800">Allow AI to rewrite your copy</p>
          <p className="text-sm text-sand-500">AI will optimize your messages for better engagement</p>
        </div>
        <Toggle
          checked={data.aiRewriteEnabled}
          onChange={(checked) => updateData({ aiRewriteEnabled: checked })}
        />
      </div>
    </div>
  );
}
