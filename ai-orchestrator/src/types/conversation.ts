export type ConversationStatus = 'needs_attention' | 'ai_handling' | 'resolved' | 'escalated';
export type ConversationSentiment = 'positive' | 'neutral' | 'negative' | 'unknown';
export type ConversationChannel = 'email' | 'linkedin' | 'voice' | 'sms';

export interface ConversationMessage {
  id: string;
  direction: 'outbound' | 'inbound';
  channel: ConversationChannel;
  subject?: string;
  content: string;
  timestamp: string;
  aiGenerated: boolean;
}

export interface Conversation {
  id: string;
  prospectId: string;
  prospectName: string;
  prospectTitle: string;
  company: string;
  campaignId: string;
  campaignName: string;
  status: ConversationStatus;
  sentiment: ConversationSentiment;
  channel: ConversationChannel;
  preview: string;
  timestamp: string;
  isUnread: boolean;
  isEscalated: boolean;
  messages: ConversationMessage[];
  pendingAiReply?: string;
  pendingAiReason?: string;
  escalationReason?: string;
}
