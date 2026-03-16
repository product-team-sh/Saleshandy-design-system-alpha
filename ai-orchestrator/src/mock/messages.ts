import { ChatMessage } from '@/types/chat';

export const mockMessages: Record<string, ChatMessage[]> = {
  'camp-001': [
    {
      id: 'msg-001-01',
      campaignId: 'camp-001',
      role: 'system',
      contentType: 'status_update',
      content: 'Campaign "SaaS Founders Outreach" created.',
      timestamp: '2026-02-18T09:30:00Z',
    },
    {
      id: 'msg-001-02',
      campaignId: 'camp-001',
      role: 'user',
      contentType: 'text',
      content:
        'I want to reach out to SaaS founders who recently raised Series A funding. Focus on companies in the sales tech and marketing automation space.',
      timestamp: '2026-02-18T09:31:00Z',
    },
    {
      id: 'msg-001-03',
      campaignId: 'camp-001',
      role: 'ai',
      contentType: 'clarifying_question',
      content:
        'Great target audience. A few things to nail down before I build your campaign plan:',
      metadata: {
        questionOptions: [
          'Target company size: 10-50 employees',
          'Target company size: 50-200 employees',
          'Target company size: Any size',
        ],
      },
      timestamp: '2026-02-18T09:31:15Z',
    },
    {
      id: 'msg-001-04',
      campaignId: 'camp-001',
      role: 'user',
      contentType: 'text',
      content: '50-200 employees. Also, only US and UK based companies.',
      timestamp: '2026-02-18T09:32:00Z',
    },
    {
      id: 'msg-001-05',
      campaignId: 'camp-001',
      role: 'ai',
      contentType: 'clarifying_question',
      content:
        'Got it — 50-200 employees, US and UK. One more question about your outreach tone:',
      metadata: {
        questionOptions: [
          'Casual and conversational',
          'Professional but friendly',
          'Formal and corporate',
        ],
      },
      timestamp: '2026-02-18T09:32:10Z',
    },
    {
      id: 'msg-001-06',
      campaignId: 'camp-001',
      role: 'user',
      contentType: 'text',
      content: 'Professional but friendly. We want to come across as peers, not salespeople.',
      timestamp: '2026-02-18T09:33:00Z',
    },
    {
      id: 'msg-001-07',
      campaignId: 'camp-001',
      role: 'ai',
      contentType: 'text',
      content:
        'Perfect. I found 245 prospects matching your criteria. Let me put together a multi-channel outreach plan for you.',
      timestamp: '2026-02-18T09:33:30Z',
    },
    {
      id: 'msg-001-08',
      campaignId: 'camp-001',
      role: 'ai',
      contentType: 'prospect_list',
      content: 'Here are the 245 prospects I identified. Top matches include founders and VPs of Sales at companies like Vantage, Clearbit, and Ramp.',
      metadata: {
        prospectIds: [
          'pros-001', 'pros-002', 'pros-003', 'pros-004', 'pros-005',
          'pros-006', 'pros-007', 'pros-008', 'pros-009', 'pros-010',
        ],
      },
      timestamp: '2026-02-18T09:34:00Z',
    },
    {
      id: 'msg-001-09',
      campaignId: 'camp-001',
      role: 'ai',
      contentType: 'plan_preview',
      content:
        'Here is your 5-step outreach plan spanning 9 days. It combines personalized email, LinkedIn connection requests, and a phone touchpoint for high-intent prospects.',
      metadata: {
        planId: 'plan-001',
      },
      timestamp: '2026-02-18T09:35:00Z',
    },
    {
      id: 'msg-001-10',
      campaignId: 'camp-001',
      role: 'user',
      contentType: 'text',
      content: 'Looks solid. Approve the plan and start the campaign.',
      timestamp: '2026-02-18T09:40:00Z',
    },
    {
      id: 'msg-001-11',
      campaignId: 'camp-001',
      role: 'ai',
      contentType: 'status_update',
      content:
        'Campaign approved and now active. Sending the first batch of 50 emails now. I will notify you as replies come in.',
      timestamp: '2026-02-18T09:40:30Z',
    },
    {
      id: 'msg-001-12',
      campaignId: 'camp-001',
      role: 'ai',
      contentType: 'warning',
      content:
        'Bounce rate for the domain @vantagepoint.io is above 15%. I paused outreach to 4 prospects from that domain to protect your sender reputation.',
      metadata: {
        warningLevel: 'soft',
      },
      timestamp: '2026-02-22T14:10:00Z',
    },
    {
      id: 'msg-001-13',
      campaignId: 'camp-001',
      role: 'ai',
      contentType: 'status_update',
      content:
        '12 meetings booked so far. 3 new replies came in today — 2 positive, 1 requesting more info. I drafted follow-ups for the "more info" reply and queued it for your review.',
      timestamp: '2026-03-03T08:15:00Z',
    },
  ],

  'camp-003': [
    {
      id: 'msg-003-01',
      campaignId: 'camp-003',
      role: 'system',
      contentType: 'status_update',
      content: 'Campaign "Enterprise ABM - Fortune 500" created.',
      timestamp: '2026-03-01T10:00:00Z',
    },
    {
      id: 'msg-003-02',
      campaignId: 'camp-003',
      role: 'user',
      contentType: 'text',
      content:
        'We need a high-touch ABM campaign targeting VP and C-level at Fortune 500 companies. Industries: fintech, healthtech, and enterprise SaaS. Budget is not a constraint — we want quality over volume.',
      timestamp: '2026-03-01T10:01:00Z',
    },
    {
      id: 'msg-003-03',
      campaignId: 'camp-003',
      role: 'ai',
      contentType: 'clarifying_question',
      content:
        'This is a high-value campaign so I want to get it right. A few questions:',
      metadata: {
        questionOptions: [
          'Include voice calls as part of the sequence',
          'Email and LinkedIn only — no calls',
          'Let AI decide based on prospect engagement',
        ],
      },
      timestamp: '2026-03-01T10:01:20Z',
    },
    {
      id: 'msg-003-04',
      campaignId: 'camp-003',
      role: 'user',
      contentType: 'text',
      content:
        'Include voice calls. For Fortune 500, the personal touch matters. Also use all three channels — email, LinkedIn, and voice.',
      timestamp: '2026-03-01T10:03:00Z',
    },
    {
      id: 'msg-003-05',
      campaignId: 'camp-003',
      role: 'ai',
      contentType: 'text',
      content:
        'Understood. I am building a prospect list from our Fortune 500 database filtered by fintech, healthtech, and enterprise SaaS. I will target VP-level and above. Give me a moment to compile the list and draft a plan.',
      timestamp: '2026-03-01T10:03:15Z',
      isStreaming: true,
    },
  ],
};
