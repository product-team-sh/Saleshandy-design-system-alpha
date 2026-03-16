'use client';

import React from 'react';
import { cn } from '@/lib/cn';

interface EmailAccount {
  email: string;
  provider: 'gmail' | 'outlook' | 'custom';
  dailyLimit: number;
  warmupStatus: 'off' | 'warming' | 'healthy' | 'paused';
  healthScore: number;
  spfDkim: boolean;
  dmarc: boolean;
}

interface EmailAccountsArtifactProps {
  accounts: EmailAccount[];
  shLink?: string;
  shLinkLabel?: string;
}

const WARMUP_CONFIG: Record<string, { label: string; dot: string; text: string }> = {
  healthy: { label: 'Healthy', dot: 'bg-emerald-500', text: 'text-emerald-700' },
  warming:  { label: 'Warming', dot: 'bg-amber-400',  text: 'text-amber-700'  },
  off:      { label: 'Off',     dot: 'bg-red-400',    text: 'text-red-700'    },
  paused:   { label: 'Paused',  dot: 'bg-slate-400',  text: 'text-slate-600'  },
};

const PROVIDER_ICON: Record<string, string> = {
  gmail:   'G',
  outlook: 'O',
  custom:  '✉',
};

export function EmailAccountsArtifact({ accounts, shLink, shLinkLabel }: EmailAccountsArtifactProps) {
  const healthyCount = accounts.filter(a => a.warmupStatus === 'healthy').length;

  return (
    <div className="mt-3 rounded-xl border-2 border-sand-300 bg-white overflow-hidden shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b-2 border-sand-200 bg-sand-100">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-ocean-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <span className="text-xs font-bold text-sand-700">Email Infrastructure</span>
        </div>
        <span className="text-xs font-semibold text-sand-500">{accounts.length} accounts · {healthyCount} healthy</span>
      </div>

      {/* Account rows */}
      <div className="divide-y divide-pg-border">
        {accounts.map((account) => {
          const warmup = WARMUP_CONFIG[account.warmupStatus];
          const scoreColor =
            account.healthScore >= 80 ? 'text-emerald-600 bg-emerald-50 border-emerald-200' :
            account.healthScore >= 60 ? 'text-amber-600 bg-amber-50 border-amber-200' :
                                        'text-red-600 bg-red-50 border-red-200';

          return (
            <div key={account.email} className="px-4 py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Provider badge */}
                  <div className={cn(
                    'w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black flex-shrink-0 border border-sand-200',
                    account.provider === 'gmail' ? 'bg-red-50 text-red-600' :
                    account.provider === 'outlook' ? 'bg-blue-50 text-blue-600' : 'bg-sand-100 text-sand-500'
                  )}>
                    {PROVIDER_ICON[account.provider]}
                  </div>
                  <span className="text-xs font-semibold text-sand-700 truncate">{account.email}</span>
                </div>
                {/* Health score */}
                <span className={cn('text-xs font-bold px-2 py-0.5 rounded-full border flex-shrink-0', scoreColor)}>
                  {account.healthScore}/100
                </span>
              </div>

              {/* Details row */}
              <div className="flex items-center gap-3 mt-2 ml-8">
                {/* Warmup status */}
                <div className="flex items-center gap-1">
                  <div className={cn('w-1.5 h-1.5 rounded-full', warmup.dot)} />
                  <span className={cn('text-[11px] font-semibold', warmup.text)}>
                    Warmup {warmup.label}
                  </span>
                </div>
                {/* Daily limit */}
                <span className="text-[11px] text-sand-500">{account.dailyLimit}/day limit</span>
                {/* DNS checks */}
                <div className="flex items-center gap-1.5">
                  <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded',
                    account.spfDkim ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  )}>
                    SPF/DKIM {account.spfDkim ? '✓' : '✗'}
                  </span>
                  <span className={cn('text-[10px] font-semibold px-1.5 py-0.5 rounded',
                    account.dmarc ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  )}>
                    DMARC {account.dmarc ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer link */}
      {shLink && (
        <div className="px-4 py-2.5 border-t-2 border-sand-200 bg-sand-100 flex items-center justify-between">
          <a
            href={shLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-ocean-500 hover:text-ocean-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {shLinkLabel ?? 'View in Saleshandy'}
          </a>
        </div>
      )}
    </div>
  );
}
