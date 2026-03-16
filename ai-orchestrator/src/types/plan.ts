import { Channel } from './campaign';

export interface PlanStep {
  index: number;
  channel: Channel;
  action: string;
  subject?: string;
  content: string;
  delayDays: number;
  conditions?: string;
}

export interface CampaignPlan {
  id: string;
  campaignId: string;
  steps: PlanStep[];
  estimatedDuration: string;
  totalProspects: number;
}
