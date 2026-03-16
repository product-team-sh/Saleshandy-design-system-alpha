export interface DashboardMetrics {
  totalProspects: number;
  activeOutreach: number;
  totalForOutreach: number;
  replies: number;
  replyRate: number;
  meetingsBooked: number;
  meetingRate: number;
  trends: {
    prospects: number;
    outreach: number;
    replies: number;
    meetings: number;
  };
}

export interface ChannelMetrics {
  channel: string;
  icon: string;
  enabled: boolean;
  metrics: { label: string; value: number; total: number }[];
}

export interface AttentionItem {
  id: string;
  severity: 'urgent' | 'warning' | 'info' | 'neutral';
  message: string;
  actionLabel: string;
  actionHref: string;
}

export interface StatusCount {
  status: string;
  label: string;
  count: number;
  percentage: number;
  variant: 'default' | 'info' | 'success' | 'warning' | 'error' | 'ai';
}

export const mockDashboardMetrics: DashboardMetrics = {
  totalProspects: 247,
  activeOutreach: 89,
  totalForOutreach: 152,
  replies: 41,
  replyRate: 16.6,
  meetingsBooked: 12,
  meetingRate: 4.9,
  trends: {
    prospects: 12,
    outreach: 8,
    replies: 23,
    meetings: 15,
  },
};

export const mockChannelMetrics: ChannelMetrics[] = [
  {
    channel: 'Email',
    icon: 'mail',
    enabled: true,
    metrics: [
      { label: 'Sent', value: 1247, total: 1247 },
      { label: 'Opened', value: 834, total: 1247 },
      { label: 'Replied', value: 156, total: 1247 },
      { label: 'Bounced', value: 23, total: 1247 },
    ],
  },
  {
    channel: 'Voice',
    icon: 'phone',
    enabled: true,
    metrics: [
      { label: 'Calls Made', value: 89, total: 89 },
      { label: 'Connected', value: 34, total: 89 },
      { label: 'Voicemail', value: 41, total: 89 },
      { label: 'Meeting Set', value: 8, total: 89 },
    ],
  },
  {
    channel: 'LinkedIn',
    icon: 'linkedin',
    enabled: true,
    metrics: [
      { label: 'DMs Sent', value: 67, total: 67 },
      { label: 'Accepted', value: 42, total: 67 },
      { label: 'Replied', value: 18, total: 67 },
    ],
  },
  {
    channel: 'SMS / WA',
    icon: 'message-square',
    enabled: false,
    metrics: [
      { label: 'Sent', value: 0, total: 0 },
      { label: 'Read', value: 0, total: 0 },
      { label: 'Replied', value: 0, total: 0 },
    ],
  },
];

export const mockAttentionItems: AttentionItem[] = [
  {
    id: 'attn-001',
    severity: 'urgent',
    message: '5 prospects pending review',
    actionLabel: 'Review',
    actionHref: '/prospects',
  },
  {
    id: 'attn-002',
    severity: 'warning',
    message: '2 human handoffs waiting',
    actionLabel: 'View in Slack',
    actionHref: '#',
  },
  {
    id: 'attn-003',
    severity: 'info',
    message: 'Email warmup complete — ready to increase limits',
    actionLabel: 'Update Limits',
    actionHref: '#',
  },
];

export const mockStatusCounts: StatusCount[] = [
  { status: 'pending_review', label: 'Pending Review', count: 5, percentage: 2.0, variant: 'default' },
  { status: 'approved', label: 'Approved (Queued)', count: 34, percentage: 13.8, variant: 'info' },
  { status: 'contacted', label: 'In Outreach', count: 89, percentage: 36.0, variant: 'info' },
  { status: 'replied', label: 'Replied', count: 41, percentage: 16.6, variant: 'warning' },
  { status: 'meeting_booked', label: 'Meeting Booked', count: 12, percentage: 4.9, variant: 'success' },
  { status: 'snoozed', label: 'Snoozed', count: 18, percentage: 7.3, variant: 'default' },
  { status: 'not_interested', label: 'Not Interested', count: 31, percentage: 12.6, variant: 'default' },
  { status: 'bounced', label: 'Bounced', count: 9, percentage: 3.6, variant: 'error' },
  { status: 'human_handoff', label: 'Human Handoff', count: 8, percentage: 3.2, variant: 'warning' },
];
