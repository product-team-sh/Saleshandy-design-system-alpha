export type CampaignStatus = 'draft' | 'planning' | 'review' | 'approved' | 'active' | 'paused' | 'completed';
export type CampaignHealthPulse = 'green' | 'yellow' | 'red';

export type Channel = 'email' | 'linkedin' | 'voice';

export type TemplateType = 'lead_gen' | 'retargeting' | 'abm' | 'custom';

export interface CampaignMetrics {
  sent: number;
  opened: number;
  replied: number;
  meetings: number;
  bounced: number;
  aiActionsInProgress: number;
}

export interface Campaign {
  id: string;
  contextId: string;
  name: string;
  status: CampaignStatus;
  channels: Channel[];
  templateType: TemplateType | null;
  prospectCount: number;
  createdAt: string;
  updatedAt: string;
  metrics: CampaignMetrics | null;
  hasUnreadAiUpdate: boolean;
  healthPulse?: CampaignHealthPulse;
  healthNote?: string;
}
