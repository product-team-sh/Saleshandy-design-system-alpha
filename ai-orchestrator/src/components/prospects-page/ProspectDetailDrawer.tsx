'use client';

import React, { useEffect } from 'react';
import {
  X, Mail, Phone, Linkedin, Building2, Briefcase,
  ExternalLink, Copy,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Tag } from '@/components/ui/Tag';
import { Badge } from '@/components/ui/Badge';
import { Banner } from '@/components/ui/Banner';
import { useUiStore } from '@/stores/useUiStore';
import { useProspectStore } from '@/stores/useProspectStore';

export function ProspectDetailDrawer() {
  const { prospectDrawerOpen, prospectDrawerId, closeProspectDrawer } = useUiStore();
  const { prospects, updateProspectStatus } = useProspectStore();

  const prospect = prospectDrawerId ? prospects[prospectDrawerId] : null;

  useEffect(() => {
    if (!prospectDrawerOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProspectDrawer();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [prospectDrawerOpen, closeProspectDrawer]);

  if (!prospectDrawerOpen || !prospect) return null;

  const fullName = `${prospect.firstName} ${prospect.lastName}`;
  const scoreColor = (prospect.matchScore ?? 0) >= 80 ? 'text-green-600' : (prospect.matchScore ?? 0) >= 60 ? 'text-yellow-600' : 'text-red-600';

  const handleApprove = () => {
    updateProspectStatus(prospect.id, 'approved');
    closeProspectDrawer();
  };

  const handleReject = () => {
    updateProspectStatus(prospect.id, 'rejected');
    closeProspectDrawer();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[1200]"
        onClick={closeProspectDrawer}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${fullName} details`}
        className="fixed right-0 top-0 h-full w-[600px] max-w-full bg-white shadow-modal z-[1200] flex flex-col"
        style={{ animation: 'slideInFromRight 300ms ease-out' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sand-200 shrink-0">
          <h2 className="text-lg font-semibold text-sand-800">{fullName}</h2>
          <button
            type="button"
            onClick={closeProspectDrawer}
            className="p-1 rounded-sm text-sand-400 hover:text-sand-600 hover:bg-sand-100 transition-colors"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Profile + Score */}
          <div className="flex items-start gap-4">
            <Avatar name={fullName} size="lg" />
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="text-base font-semibold text-sand-800">{fullName}</h3>
              <div className="flex items-center gap-1.5 text-sm text-sand-500">
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{prospect.title}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-sand-500">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{prospect.company}</span>
              </div>
            </div>
            {prospect.matchScore && (
              <div className="text-center shrink-0">
                <span className={cn('text-2xl font-bold', scoreColor)}>{prospect.matchScore}</span>
                <p className="text-xs text-sand-400">Match</p>
              </div>
            )}
          </div>

          {/* AI Reasoning */}
          {prospect.aiReasoning && (
            <Banner variant="info">
              <strong>Why this prospect:</strong> {prospect.aiReasoning}
            </Banner>
          )}

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-sand-600 mb-2">Contact Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="w-3.5 h-3.5 text-sand-400 shrink-0" />
                <a href={`mailto:${prospect.email}`} className="text-primary-700 hover:text-primary-800 truncate">
                  {prospect.email}
                </a>
                <button className="p-0.5 text-sand-400 hover:text-sand-600" aria-label="Copy email">
                  <Copy className="w-3 h-3" />
                </button>
              </div>
              {prospect.phone && (
                <div className="flex items-center gap-2 text-sm text-sand-500">
                  <Phone className="w-3.5 h-3.5 text-sand-400 shrink-0" />
                  <span>{prospect.phone}</span>
                </div>
              )}
              {prospect.linkedinUrl && (
                <div className="flex items-center gap-2 text-sm">
                  <Linkedin className="w-3.5 h-3.5 text-sand-400 shrink-0" />
                  <a
                    href={prospect.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-700 hover:text-primary-800"
                  >
                    LinkedIn Profile
                  </a>
                  <ExternalLink className="w-3 h-3 text-sand-400" />
                </div>
              )}
            </div>
          </div>

          {/* Enrichment Tags */}
          {prospect.tags.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-sand-600 mb-2">Enrichment Data</h4>
              <div className="flex flex-wrap gap-1.5">
                {prospect.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
                {prospect.source && (
                  <Badge variant="default" size="sm">Source: {prospect.source}</Badge>
                )}
              </div>
            </div>
          )}

          {/* Recommended Approach */}
          {prospect.channelRecommendation && (
            <div>
              <h4 className="text-sm font-semibold text-sand-600 mb-2">Recommended Approach</h4>
              <div className="bg-sand-50 border border-sand-200 rounded-sm p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="info" size="sm">
                    {prospect.channelRecommendation.charAt(0).toUpperCase() + prospect.channelRecommendation.slice(1)}
                  </Badge>
                  <span className="text-sm text-sand-500">recommended first channel</span>
                </div>
                <p className="text-sm text-sand-600 italic">
                  &quot;Hi {prospect.firstName}, I noticed {prospect.company} has been growing rapidly...&quot;
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 p-4 border-t border-sand-200 shrink-0">
          <Button variant="error" onClick={handleReject}>Reject</Button>
          <Button variant="primary" onClick={handleApprove}>Approve &amp; Queue</Button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInFromRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}} />
    </>
  );
}
