'use client';

import Link from 'next/link';
import { Bell, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import { ContextSwitcher } from './ContextSwitcher';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { useUiStore } from '@/stores/useUiStore';

export function GlobalHeader() {
  const backgroundOps = useNotificationStore((s) => s.backgroundOps);
  const hasEscalations = backgroundOps.some((op) => op.status === 'running');
  const { sidebarCollapsed, toggleSidebar } = useUiStore();

  return (
    <header className="h-12 sticky top-0 z-sticky bg-white border-b border-sand-200 flex items-center px-3 gap-2 shadow-xs">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-primary-700 flex items-center justify-center shadow-sm">
          <span className="text-sm leading-none select-none">🐙</span>
        </div>
        <span className="text-sm font-semibold text-sand-900 hidden sm:inline tracking-tight">
          Outbound Octopus
        </span>
      </Link>

      <div className="w-px h-4 bg-sand-200 mx-1 shrink-0" />

      {/* Sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className={cn(
          'p-1.5 rounded-md transition-colors duration-fast',
          sidebarCollapsed ? 'text-sand-400 hover:bg-sand-100 hover:text-sand-700' : 'bg-sand-100 text-sand-700'
        )}
        aria-label="Toggle sidebar"
      >
        <PanelLeft className="w-4 h-4" />
      </button>

      <ContextSwitcher />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: notifications + user */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          className="relative p-2 rounded-md hover:bg-sand-100 transition-colors duration-fast"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4 text-sand-400" />
          {hasEscalations && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral rounded-full animate-status-pulse" />
          )}
        </button>

        <button
          className="w-7 h-7 rounded-full bg-primary-700 text-white font-semibold text-xs flex items-center justify-center hover:bg-primary-800 transition-colors duration-fast"
          aria-label="User menu"
        >
          MK
        </button>
      </div>
    </header>
  );
}
