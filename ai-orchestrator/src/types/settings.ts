export interface SendingSchedule {
  timezone: string;
  startHour: number;
  endHour: number;
  activeDays: number[];
}

export interface GlobalDefaults {
  sendingSchedule: SendingSchedule;
  followUpCadenceDays: number;
  dailyEmailLimit: number;
  tone: 'formal' | 'friendly' | 'bold';
  bookingMode: 'auto' | 'human_approval';
  blacklistDomains: string[];
  escalationChannels: ('in_app' | 'slack' | 'email')[];
}

export type MailboxStatus = 'warming' | 'ready' | 'paused' | 'error';

export interface MailboxWarmup {
  id: string;
  email: string;
  provider: 'google' | 'outlook';
  warmupEnabled: boolean;
  currentDailyVolume: number;
  targetDailyVolume: number;
  warmupPercent: number;
  status: MailboxStatus;
  healthScore: number;
  daysRemaining?: number;
}

export type ChannelAccountType = 'linkedin' | 'phone' | 'whatsapp' | 'sms';

export interface ChannelAccount {
  id: string;
  type: ChannelAccountType;
  identifier: string;
  connected: boolean;
  dailyLimit: number;
}

export type IntegrationType = 'slack' | 'hubspot' | 'salesforce' | 'pipedrive' | 'google_calendar' | 'outlook_calendar';

export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  connected: boolean;
  lastSyncAt: string | null;
  description: string;
}

export type AgentPreset = 'balanced' | 'email_first' | 'multi_channel_blitz' | 'warm_steady';
