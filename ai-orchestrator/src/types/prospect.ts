export type ProspectStatus =
  | 'new'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'snoozed'
  | 'contacted'
  | 'replied'
  | 'meeting_booked'
  | 'not_interested'
  | 'bounced';

export type ProspectSentiment = 'positive' | 'neutral' | 'negative' | 'unknown';

export interface ConversationEntry {
  id: string;
  direction: 'outbound' | 'inbound';
  channel: string;
  subject?: string;
  snippet: string;
  timestamp: string;
}

export interface Prospect {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  title: string;
  linkedinUrl?: string;
  phone?: string;
  status: ProspectStatus;
  campaignIds: string[];
  tags: string[];
  lastContactedAt?: string;
  matchScore?: number;
  source?: string;
  channelRecommendation?: string;
  aiReasoning?: string;
  currentStep?: string;
  opens?: number;
  clicks?: number;
  replyCount?: number;
  sentiment?: ProspectSentiment;
  nextAction?: string;
  conversationThread?: ConversationEntry[];
}
