'use client';

import React from 'react';
import { useTimelineStore } from '@/stores/useTimelineStore';

interface ContextTabProps {
  prospectId: string;
}

export function ContextTab({ prospectId }: ContextTabProps) {
  const contexts = useTimelineStore((s) => s.contexts);
  const ctx = contexts[prospectId];

  if (!ctx) {
    return (
      <div className="text-center py-12">
        <p className="text-base text-sand-500">No AI context available yet for this prospect.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Facts */}
      <div>
        <h4 className="text-lg font-semibold text-sand-800 mb-3">Key Facts</h4>
        <ul className="space-y-2">
          {ctx.keyFacts.map((fact, i) => (
            <li key={i} className="flex items-start gap-2 text-base text-sand-800">
              <span className="text-sand-400 mt-0.5">•</span>
              {fact}
            </li>
          ))}
        </ul>
      </div>

      {/* Preferences */}
      {ctx.preferences.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-sand-800 mb-3">Preferences</h4>
          <ul className="space-y-2">
            {ctx.preferences.map((pref, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-sand-800">
                <span className="text-sand-400 mt-0.5">•</span>
                {pref}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Objections */}
      {ctx.objections.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-sand-800 mb-3">Objections Raised</h4>
          <ul className="space-y-2">
            {ctx.objections.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-base text-sand-800">
                <span className="text-yellow-500 mt-0.5">⚠</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Summary */}
      <div className="bg-sand-50 border border-sand-200 rounded-md p-4">
        <h4 className="text-base font-semibold text-sand-600 mb-2">Conversation Summary</h4>
        <p className="text-base text-sand-800">{ctx.summary}</p>
        <p className="text-sm text-sand-400 mt-2">
          Last updated: {new Date(ctx.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}
