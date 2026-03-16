'use client';

import React from 'react';
import {
  Mic2, BookOpen, Star, FileText, Swords, Users, MessageSquare, DollarSign, CheckCircle,
  Package, Calendar, Globe,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import type { KnowledgeCard as KnowledgeCardType, KnowledgeCardType as KCType } from '@/types/brain';

const ICONS: Record<KCType, React.ElementType> = {
  brand_voice: Mic2,
  help_docs: BookOpen,
  case_studies: Star,
  winning_copy: FileText,
  competitor_intel: Swords,
  icp_profile: Users,
  objection_handling: MessageSquare,
  pricing: DollarSign,
  product_info: Package,
  meeting_playbook: Calendar,
  industry_context: Globe,
};

const ICON_COLORS: Record<KCType, string> = {
  brand_voice: 'text-purple-600 bg-purple-50',
  help_docs: 'text-blue-600 bg-blue-50',
  case_studies: 'text-yellow-600 bg-yellow-50',
  winning_copy: 'text-green-600 bg-green-50',
  competitor_intel: 'text-red-600 bg-red-50',
  icp_profile: 'text-primary-700 bg-primary-50',
  objection_handling: 'text-orange-600 bg-orange-50',
  pricing: 'text-teal-600 bg-teal-50',
  product_info: 'text-indigo-600 bg-indigo-50',
  meeting_playbook: 'text-pink-600 bg-pink-50',
  industry_context: 'text-cyan-600 bg-cyan-50',
};

// SVG ring progress indicator
function RingProgress({ percent }: { percent: number }) {
  const r = 16;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - percent / 100);
  const color =
    percent >= 80 ? '#10b981' : percent >= 50 ? '#f59e0b' : percent > 0 ? '#f97316' : '#e5e7eb';

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
      <circle cx="20" cy="20" r={r} fill="none" stroke="#e5e7eb" strokeWidth="3" />
      <circle
        cx="20" cy="20" r={r}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  );
}

interface KnowledgeCardProps {
  card: KnowledgeCardType;
}

export function KnowledgeCard({ card }: KnowledgeCardProps) {
  const Icon = ICONS[card.type];
  const iconStyle = ICON_COLORS[card.type];

  return (
    <div className="bg-white border border-sand-200 rounded-lg p-5 shadow-xs flex flex-col gap-4 hover:shadow-md transition-all duration-150">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn('w-9 h-9 rounded-md flex items-center justify-center shrink-0', iconStyle)}>
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-sand-800">{card.title}</h3>
            <p className="text-base text-sand-500 mt-0.5">{card.description}</p>
          </div>
        </div>
        <div className="relative shrink-0 ml-2">
          <RingProgress percent={card.completeness} />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-sand-600 rotate-90">
            {card.completeness}
          </span>
        </div>
      </div>

      {card.isEmpty ? (
        <div className="bg-sand-50 border border-dashed border-sand-300 rounded-md p-3 text-base text-sand-500 text-center">
          {card.emptyStateMessage}
        </div>
      ) : (
        <div className="flex items-center justify-between text-sm text-sand-500">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            <span>{card.itemCount} {card.itemCount === 1 ? 'item' : 'items'}</span>
          </div>
          {card.lastUpdatedAt && (
            <span className="text-xs text-sand-400 font-mono">
              Updated {new Date(card.lastUpdatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
      )}

      <div className="flex gap-2 mt-auto">
        {card.isEmpty ? (
          <Button variant="primary" className="flex-1">
            Add Content
          </Button>
        ) : (
          <>
            <Button variant="secondary" className="flex-1">
              View All
            </Button>
            <Button variant="secondary" className="flex-1">
              Update
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
