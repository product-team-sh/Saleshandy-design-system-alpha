'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Zap, Users, MessageSquare, BrainCircuit,
  Bot, Activity, Plus, Settings, HelpCircle, Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useUiStore } from '@/stores/useUiStore';
import { useContextStore, useActiveContext } from '@/stores/useContextStore';
import { useCampaignStore } from '@/stores/useCampaignStore';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Zap, label: 'Campaigns', href: '/campaigns' },
  { icon: Users, label: 'Prospects', href: '/prospects' },
  { icon: MessageSquare, label: 'Conversations', href: '/conversations' },
  { icon: BrainCircuit, label: 'Brain', href: '/brain' },
  { icon: Bot, label: 'Agent', href: '/agent' },
  { icon: Activity, label: 'Timeline', href: '/timeline' },
] as const;

export function Sidebar() {
  const { sidebarCollapsed } = useUiStore();
  const activeContextId = useContextStore((s) => s.activeContextId);
  const activeContext = useActiveContext();
  const createCampaign = useCampaignStore((s) => s.createCampaign);
  const pathname = usePathname();

  function handleNewCampaign() {
    const campaign = createCampaign(activeContextId);
    window.location.href = `/campaigns/${campaign.id}`;
  }

  return (
    <aside
      className={cn(
        'h-full bg-white flex flex-col transition-all duration-slow border-r border-sand-200 select-none',
        sidebarCollapsed ? 'w-0 overflow-hidden lg:w-14' : 'w-[220px]'
      )}
    >
      {/* Workspace indicator */}
      {activeContext && (
        <div className={cn('px-3 pt-3 pb-2', sidebarCollapsed && 'lg:px-2')}>
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-sand-50">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-2 ring-white"
                style={{ backgroundColor: activeContext.accentColor }}
              />
              <span className="text-xs font-semibold text-sand-600 truncate">{activeContext.name}</span>
              <Sparkles className="w-3 h-3 text-sand-300 ml-auto" />
            </div>
          ) : (
            <div className="hidden lg:flex justify-center">
              <span
                className="w-3 h-3 rounded-full ring-2 ring-white"
                style={{ backgroundColor: activeContext.accentColor }}
                title={activeContext.name}
              />
            </div>
          )}
        </div>
      )}

      {/* New Campaign CTA */}
      <div className="px-3 pb-3">
        <button
          onClick={handleNewCampaign}
          className={cn(
            'w-full flex items-center justify-center gap-2 rounded-md',
            'bg-primary-700 text-white font-medium text-xs',
            'hover:bg-primary-800 active:bg-primary-900',
            'transition-all duration-base shadow-sm',
            sidebarCollapsed ? 'lg:px-2 py-2.5' : 'px-3 py-2'
          )}
        >
          <Plus className="w-3.5 h-3.5 shrink-0" />
          {!sidebarCollapsed && <span>New Campaign</span>}
        </button>
      </div>

      {/* Nav divider */}
      <div className="mx-3 border-t border-sand-100 mb-1" />

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={sidebarCollapsed ? label : undefined}
              className={cn(
                'flex items-center gap-2.5 px-2 py-2 rounded-md text-xs font-medium transition-colors duration-fast group',
                active
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-sand-500 hover:text-sand-800 hover:bg-sand-50',
                sidebarCollapsed && 'lg:justify-center'
              )}
            >
              <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-primary-700' : 'text-sand-400 group-hover:text-sand-600')} />
              {!sidebarCollapsed && <span>{label}</span>}
              {/* Agent status pulse indicator */}
              {href === '/agent' && !sidebarCollapsed && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" title="Agent active" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-sand-200 p-2 flex items-center gap-1">
        <Link
          href="/settings"
          className={cn(
            'p-2 rounded-md hover:bg-sand-100 transition-colors duration-fast text-sand-400 hover:text-sand-700',
            sidebarCollapsed && 'lg:mx-auto'
          )}
          aria-label="Settings"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </Link>
        {!sidebarCollapsed && (
          <Link
            href="#"
            className="p-2 rounded-md hover:bg-sand-100 transition-colors duration-fast text-sand-400 hover:text-sand-700"
            aria-label="Help"
          >
            <HelpCircle className="w-4 h-4" />
          </Link>
        )}
      </div>
    </aside>
  );
}
