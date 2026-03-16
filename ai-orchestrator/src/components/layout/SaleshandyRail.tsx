'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import {
  Send,
  Users,
  BarChart2,
  Mail,
  Search,
  Settings,
  MoreHorizontal,
} from 'lucide-react';

const railItems = [
  { icon: Send, label: 'Sequences', href: '#', external: true },
  { icon: Users, label: 'CRM', href: '#', external: true },
  { icon: BarChart2, label: 'Analytics', href: '#', external: true },
  { icon: Mail, label: 'Inbox', href: '#', external: true },
  { icon: Search, label: 'Email Finder', href: '#', external: true },
];

export function SaleshandyRail() {
  return (
    <div className="w-[52px] h-full bg-white border-r border-sand-200 flex flex-col items-center py-2 shrink-0 z-10">
      {/* Saleshandy Logo */}
      <div className="w-8 h-8 mb-4 shrink-0">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="#1d4ed8" />
          <path
            d="M8 20.5C8 17.5 10 15 13 14.5L16 14L19 14.5C22 15 24 17.5 24 20.5"
            stroke="white" strokeWidth="2" strokeLinecap="round"
          />
          <circle cx="12" cy="11" r="2" fill="white" />
          <circle cx="20" cy="11" r="2" fill="white" />
          <circle cx="16" cy="9.5" r="2.5" fill="white" />
        </svg>
      </div>

      {/* Regular Saleshandy nav items */}
      <nav className="flex flex-col items-center gap-0.5 flex-1">
        {railItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            href={href}
            title={label}
            className={cn(
              'w-9 h-9 flex items-center justify-center rounded-md',
              'text-sand-400 hover:text-sand-700 hover:bg-sand-100',
              'transition-colors duration-fast'
            )}
          >
            <Icon className="w-[18px] h-[18px]" />
          </Link>
        ))}

        {/* Divider */}
        <div className="w-6 h-px bg-sand-200 my-1" />

        {/* Outbound Octopus — active feature */}
        <Link
          href="/dashboard"
          title="Outbound Octopus"
          className={cn(
            'w-9 h-9 flex items-center justify-center rounded-md',
            'bg-primary-50 text-primary-700',
            'ring-2 ring-primary-700 ring-offset-1',
            'transition-colors duration-fast relative'
          )}
        >
          <span className="text-base leading-none select-none">🐙</span>
          {/* "New" badge */}
          <span className="absolute -top-1 -right-1 bg-primary-700 text-white text-[9px] font-bold leading-none px-1 py-0.5 rounded-full">
            AI
          </span>
        </Link>
      </nav>

      {/* Bottom */}
      <div className="flex flex-col items-center gap-0.5 mt-auto">
        <button
          title="More"
          className="w-9 h-9 flex items-center justify-center rounded-md text-sand-400 hover:text-sand-700 hover:bg-sand-100 transition-colors duration-fast"
        >
          <MoreHorizontal className="w-[18px] h-[18px]" />
        </button>
        <button
          title="Settings"
          className="w-9 h-9 flex items-center justify-center rounded-md text-sand-400 hover:text-sand-700 hover:bg-sand-100 transition-colors duration-fast"
        >
          <Settings className="w-[18px] h-[18px]" />
        </button>

        {/* User avatar */}
        <div className="w-7 h-7 mt-1 rounded-full bg-primary-700 text-white text-xs font-semibold flex items-center justify-center">
          MJ
        </div>
      </div>
    </div>
  );
}
