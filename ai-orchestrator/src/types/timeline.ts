export type TimelineEventType =
  | 'email_sent'
  | 'email_opened'
  | 'reply_received'
  | 'voice_call'
  | 'voice_no_answer'
  | 'voicemail_left'
  | 'linkedin_dm_sent'
  | 'linkedin_reply'
  | 'sms_sent'
  | 'meeting_booked'
  | 'human_handoff'
  | 'ai_decision'
  | 'prospect_approved'
  | 'prospect_snoozed'
  | 'channel_switch';

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  prospectId: string;
  timestamp: string;
  title: string;
  detail?: string;
  channel?: string;
  metadata?: Record<string, string>;
}

export interface ProspectNote {
  id: string;
  prospectId: string;
  content: string;
  createdAt: string;
}

export interface ProspectContext {
  prospectId: string;
  keyFacts: string[];
  preferences: string[];
  objections: string[];
  summary: string;
  lastUpdated: string;
}
