'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, AlertTriangle } from 'lucide-react';
import { useSettingsStore } from '@/stores/useSettingsStore';

export function EmailInfraStatusWidget() {
  const mailboxes = useSettingsStore((s) => s.mailboxes);

  const readyCount = mailboxes.filter((m) => m.status === 'ready').length;
  const warmingCount = mailboxes.filter((m) => m.status === 'warming').length;
  const errorCount = mailboxes.filter((m) => m.status === 'error').length;
  const totalCapacity = mailboxes
    .filter((m) => m.status === 'ready')
    .reduce((sum, m) => sum + m.currentDailyVolume, 0);

  return (
    <div className="bg-white border border-sand-200 rounded-lg p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-md bg-primary-50 flex items-center justify-center shrink-0">
          <Mail className="w-4 h-4 text-primary-700" />
        </div>
        <div>
          <p className="text-sm font-semibold text-sand-800">Email Infrastructure</p>
          <p className="text-sm text-sand-500">
            {readyCount} mailbox{readyCount !== 1 ? 'es' : ''} ready
            {warmingCount > 0 && ` · ${warmingCount} warming up`}
            {errorCount > 0 && (
              <span className="text-red-500"> · {errorCount} error</span>
            )}
            {' · '}{totalCapacity} emails/day capacity
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {errorCount > 0 && <AlertTriangle className="w-4 h-4 text-red-500" />}
        <Link href="/settings" className="text-sm text-primary-700 hover:underline font-medium">
          Manage
        </Link>
      </div>
    </div>
  );
}
