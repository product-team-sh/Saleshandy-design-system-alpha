export type AiActionStatus = 'in_progress' | 'completed' | 'failed';

export type AiActionType =
  | 'email_sent'
  | 'email_drafted'
  | 'send_email'
  | 'auto_reply'
  | 'linkedin_connect'
  | 'linkedin_message'
  | 'voice_call'
  | 'analyzing_reply'
  | 'schedule_call'
  | 'scheduling_call'
  | 'enriching_data'
  | 'bounce_handling';

export interface AiAction {
  id: string;
  type: AiActionType;
  prospect: string;
  message: string;
  timestamp: string;
  status: AiActionStatus;
}

export interface LiveMetrics {
  sent: number;
  opened: number;
  replied: number;
  meetings: number;
  bounced: number;
  aiActionsInProgress: number;
  completionPercent: number;
  recentActions: AiAction[];
}
