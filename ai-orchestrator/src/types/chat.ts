export type MessageRole = 'user' | 'ai' | 'system';

export type MessageContentType =
  | 'text'
  | 'plan_preview'
  | 'prospect_list'
  | 'clarifying_question'
  | 'warning'
  | 'status_update'
  // ── Inline artifact types ──
  | 'email_preview'
  | 'icp_card'
  | 'lead_table'
  | 'campaign_summary'
  | 'brain_card'
  | 'email_accounts_health'
  | 'sequence_overview';

export interface ChatMessageMetadata {
  planId?: string;
  prospectIds?: string[];
  questionOptions?: string[];
  warningLevel?: 'soft' | 'hard';
  // Email preview artifact
  emailSubject?: string;
  emailBody?: string;
  emailFrom?: string;
  emailTo?: string;
  emailStepNumber?: number;
  emailTotalSteps?: number;
  personalizationHighlights?: string[];
  // ICP card artifact
  icpTitle?: string;
  icpCompanyType?: string;
  icpIndustries?: string[];
  icpPainPoints?: string[];
  icpCompanySize?: string;
  // Lead table artifact
  leads?: Array<{
    name: string;
    company: string;
    title: string;
    icpScore: number;
    location: string;
  }>;
  // Campaign summary artifact
  channel?: string;
  estimatedVolume?: string;
  emailAccountsCount?: number;
  // Brain card artifact
  brainTopic?: string;
  brainHealthPercent?: number;
  brainKeyResult?: string;
  // Email accounts health artifact
  emailAccounts?: Array<{
    email: string;
    provider: 'gmail' | 'outlook' | 'custom';
    dailyLimit: number;
    warmupStatus: 'off' | 'warming' | 'healthy' | 'paused';
    healthScore: number;
    spfDkim: boolean;
    dmarc: boolean;
  }>;
  // Sequence overview artifact
  sequenceName?: string;
  sequenceId?: string;
  sequenceSteps?: Array<{
    step: number;
    channel: 'email' | 'linkedin' | 'phone';
    day: number;
    subject?: string;
    description: string;
    status: 'draft' | 'approved' | 'locked';
  }>;
  // Saleshandy deep link
  shLink?: string;
  shLinkLabel?: string;
}

export interface ChatMessage {
  id: string;
  campaignId: string;
  role: MessageRole;
  contentType: MessageContentType;
  content: string;
  metadata?: ChatMessageMetadata;
  timestamp: string;
  isStreaming?: boolean;
}
