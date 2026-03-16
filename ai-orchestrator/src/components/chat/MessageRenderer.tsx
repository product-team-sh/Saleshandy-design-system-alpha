'use client';

import React from 'react';
import { ChatMessage } from '@/types/chat';
import { InlineWarning } from '@/components/chat/InlineWarning';
import { EmailPreviewArtifact } from '@/components/chat/artifacts/EmailPreviewArtifact';
import { IcpCardArtifact } from '@/components/chat/artifacts/IcpCardArtifact';
import { LeadTableArtifact } from '@/components/chat/artifacts/LeadTableArtifact';
import { EmailAccountsArtifact } from '@/components/chat/artifacts/EmailAccountsArtifact';
import { SequenceOverviewArtifact } from '@/components/chat/artifacts/SequenceOverviewArtifact';

interface MessageRendererProps {
  message: ChatMessage;
}

// ── Rich text: bold, code, [links](url), line breaks ─────────────────────────

function RichText({ content }: { content: string }) {
  const lines = content.split('\n');
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        const parts = line.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
        return (
          <p key={i} className="leading-relaxed">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} className="font-semibold text-sand-700">{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('`') && part.endsWith('`')) {
                return (
                  <code key={j} className="text-xs font-mono bg-sand-100 text-sand-700 px-1.5 py-0.5 rounded border border-sand-200">
                    {part.slice(1, -1)}
                  </code>
                );
              }
              const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
              if (linkMatch) {
                return (
                  <a
                    key={j}
                    href={linkMatch[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 font-semibold text-ocean-500 hover:text-ocean-600 underline underline-offset-2 transition-colors"
                  >
                    {linkMatch[1]}
                    <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                );
              }
              return part;
            })}
          </p>
        );
      })}
    </div>
  );
}

// ── Saleshandy deep link pill ─────────────────────────────────────────────────

function ShLinkPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold px-3 py-1.5 rounded-full border-2 border-sand-300 bg-ocean-50 text-ocean-600 shadow-xs hover:shadow-sm hover:-translate-y-[1px] transition-all duration-150"
    >
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
      {label}
    </a>
  );
}

// ── Main renderer ─────────────────────────────────────────────────────────────

export function MessageRenderer({ message }: MessageRendererProps) {
  const shLink = message.metadata?.shLink;
  const shLinkLabel = message.metadata?.shLinkLabel ?? 'View in Saleshandy';

  switch (message.contentType) {
    case 'text':
      return (
        <div>
          <RichText content={message.content} />
          {shLink && <ShLinkPill href={shLink} label={shLinkLabel} />}
        </div>
      );

    case 'clarifying_question':
      return (
        <div>
          <RichText content={message.content} />
          {shLink && <ShLinkPill href={shLink} label={shLinkLabel} />}
        </div>
      );

    case 'plan_preview':
      return (
        <div>
          <RichText content={message.content} />
          <div className="mt-3 flex items-center gap-2 bg-ocean-50 border-2 border-ocean-200 rounded-xl p-3">
            <svg className="w-4 h-4 text-ocean-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v4a2 2 0 0 0 2 2h4" />
            </svg>
            <span className="text-xs font-bold text-ocean-600">Campaign plan ready — choose below ↓</span>
          </div>
        </div>
      );

    case 'prospect_list':
      return (
        <div>
          <RichText content={message.content} />
          <div className="mt-3 flex items-center gap-2 bg-sand-100 border-2 border-sand-200 rounded-xl p-3">
            <svg className="w-4 h-4 text-ocean-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <span className="text-xs font-bold text-sand-700">Prospects loaded</span>
          </div>
        </div>
      );

    case 'warning':
      return <InlineWarning content={message.content} level={message.metadata?.warningLevel ?? 'soft'} />;

    case 'status_update':
      return (
        <div>
          <div className="flex items-start gap-2.5">
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mt-0.5">
              <svg className="w-3 h-3 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
              </svg>
            </div>
            <RichText content={message.content} />
          </div>
          {shLink && <ShLinkPill href={shLink} label={shLinkLabel} />}
        </div>
      );

    case 'email_preview':
      return (
        <div>
          <RichText content={message.content} />
          <EmailPreviewArtifact
            campaignId={message.campaignId}
            subject={message.metadata?.emailSubject ?? ''}
            body={message.metadata?.emailBody ?? ''}
            from={message.metadata?.emailFrom}
            to={message.metadata?.emailTo}
            highlights={message.metadata?.personalizationHighlights ?? []}
            stepNumber={message.metadata?.emailStepNumber}
            totalSteps={message.metadata?.emailTotalSteps}
          />
        </div>
      );

    case 'icp_card':
      return (
        <div>
          <RichText content={message.content} />
          <IcpCardArtifact
            campaignId={message.campaignId}
            title={message.metadata?.icpTitle ?? ''}
            companyType={message.metadata?.icpCompanyType ?? ''}
            industries={message.metadata?.icpIndustries ?? []}
            painPoints={message.metadata?.icpPainPoints ?? []}
            companySize={message.metadata?.icpCompanySize ?? ''}
          />
          {shLink && <ShLinkPill href={shLink} label={shLinkLabel} />}
        </div>
      );

    case 'lead_table':
      return (
        <div>
          <RichText content={message.content} />
          <LeadTableArtifact
            campaignId={message.campaignId}
            leads={message.metadata?.leads ?? []}
          />
          {shLink && <ShLinkPill href={shLink} label={shLinkLabel} />}
        </div>
      );

    case 'campaign_summary':
      return (
        <div>
          <RichText content={message.content} />
          <div className="mt-3 bg-ocean-50 border-2 border-ocean-200 rounded-xl p-4 space-y-3">
            <p className="text-xs font-bold text-ocean-600">Campaign Summary</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-sand-500 mb-0.5">Channel</p>
                <p className="font-semibold text-sand-700">{message.metadata?.channel ?? 'Email'}</p>
              </div>
              <div>
                <p className="text-sand-500 mb-0.5">Daily volume</p>
                <p className="font-semibold text-sand-700">{message.metadata?.estimatedVolume ?? '200/day'}</p>
              </div>
              {message.metadata?.emailAccountsCount && (
                <div>
                  <p className="text-sand-500 mb-0.5">Email accounts</p>
                  <p className="font-semibold text-sand-700">{message.metadata.emailAccountsCount} accounts</p>
                </div>
              )}
            </div>
          </div>
          {shLink && <ShLinkPill href={shLink} label={shLinkLabel} />}
        </div>
      );

    case 'brain_card':
      return (
        <div>
          <RichText content={message.content} />
          <div className="mt-3 bg-amber-soft border border-amber-200 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-xs font-bold text-amber-700">Added to Brain</p>
                <p className="text-xs text-amber-600 mt-0.5">{message.metadata?.brainTopic}</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                Saved ✓
              </span>
            </div>
            {message.metadata?.brainHealthPercent !== undefined && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[11px] text-amber-600 font-medium">Brain health</p>
                  <p className="text-[11px] font-bold text-amber-700">{message.metadata.brainHealthPercent}%</p>
                </div>
                <div className="h-2 bg-amber-100 rounded-full overflow-hidden border border-yellow-200">
                  <div
                    className="h-full bg-amber rounded-full transition-all duration-700"
                    style={{ width: `${message.metadata.brainHealthPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      );

    case 'email_accounts_health':
      return (
        <div>
          <RichText content={message.content} />
          <EmailAccountsArtifact
            accounts={message.metadata?.emailAccounts ?? []}
            shLink={message.metadata?.shLink}
            shLinkLabel={message.metadata?.shLinkLabel}
          />
        </div>
      );

    case 'sequence_overview':
      return (
        <div>
          <RichText content={message.content} />
          <SequenceOverviewArtifact
            sequenceName={message.metadata?.sequenceName ?? 'Sequence'}
            sequenceId={message.metadata?.sequenceId ?? ''}
            steps={message.metadata?.sequenceSteps ?? []}
            shLink={message.metadata?.shLink}
            shLinkLabel={message.metadata?.shLinkLabel}
          />
        </div>
      );

    default:
      return <p>{message.content}</p>;
  }
}
