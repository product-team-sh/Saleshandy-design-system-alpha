import type { Channel } from './campaign';

export interface ChannelConfig {
  enabled: boolean;
  dailyLimit: number;
  warmupEnabled?: boolean;
  warmupRatio?: string;
  businessHoursOnly?: boolean;
}

export interface OnboardingData {
  // Step 1: Company Profile
  companyName: string;
  website: string;
  industry: string;
  companySize: string;
  valueProposition: string;

  // Step 2: ICP
  targetTitles: string[];
  targetIndustries: string[];
  minEmployees: string;
  maxEmployees: string;
  geographies: string[];
  exclusions: string;

  // Step 3: Tone & Messaging
  tone: 'formal' | 'friendly' | 'bold' | '';
  sampleEmail: string;
  objections: string;
  aiRewriteEnabled: boolean;

  // Step 4: Channels
  channels: Record<string, ChannelConfig>;

  // Step 5: Integrations
  calendar: 'google' | 'outlook' | '';
  crm: 'hubspot' | 'salesforce' | 'pipedrive' | '';
  slackWebhook: string;
  calendarConnected: boolean;
  crmConnected: boolean;
}

export const ONBOARDING_STEPS = [
  { number: 1, title: 'Company Profile' },
  { number: 2, title: 'ICP' },
  { number: 3, title: 'Tone' },
  { number: 4, title: 'Channels' },
  { number: 5, title: 'Integrations' },
  { number: 6, title: 'Review' },
] as const;

export const DEFAULT_ONBOARDING_DATA: OnboardingData = {
  companyName: '',
  website: '',
  industry: '',
  companySize: '',
  valueProposition: '',
  targetTitles: [],
  targetIndustries: [],
  minEmployees: '',
  maxEmployees: '',
  geographies: [],
  exclusions: '',
  tone: '',
  sampleEmail: '',
  objections: '',
  aiRewriteEnabled: true,
  channels: {
    email: { enabled: true, dailyLimit: 50, warmupEnabled: true, warmupRatio: '40/60' },
    voice: { enabled: false, dailyLimit: 25, businessHoursOnly: true },
    linkedin: { enabled: false, dailyLimit: 25 },
    sms: { enabled: false, dailyLimit: 10 },
  },
  calendar: '',
  crm: '',
  slackWebhook: '',
  calendarConnected: false,
  crmConnected: false,
};
