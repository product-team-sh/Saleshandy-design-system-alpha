import { create } from 'zustand';
import type { GlobalDefaults, MailboxWarmup, ChannelAccount, Integration, AgentPreset } from '@/types/settings';
import { mockGlobalDefaults, mockMailboxes, mockChannelAccounts, mockIntegrations } from '@/mock/settings';

interface SettingsState {
  globalDefaults: GlobalDefaults;
  mailboxes: MailboxWarmup[];
  channelAccounts: ChannelAccount[];
  integrations: Integration[];
  agentPreset: AgentPreset;

  updateGlobalDefaults: (patch: Partial<GlobalDefaults>) => void;
  updateMailbox: (id: string, patch: Partial<MailboxWarmup>) => void;
  connectIntegration: (id: string) => void;
  disconnectIntegration: (id: string) => void;
  connectChannelAccount: (id: string) => void;
  disconnectChannelAccount: (id: string) => void;
  setAgentPreset: (preset: AgentPreset) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  globalDefaults: mockGlobalDefaults,
  mailboxes: mockMailboxes,
  channelAccounts: mockChannelAccounts,
  integrations: mockIntegrations,
  agentPreset: 'balanced',

  updateGlobalDefaults: (patch) =>
    set((state) => ({ globalDefaults: { ...state.globalDefaults, ...patch } })),

  updateMailbox: (id, patch) =>
    set((state) => ({
      mailboxes: state.mailboxes.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    })),

  connectIntegration: (id) =>
    set((state) => ({
      integrations: state.integrations.map((i) =>
        i.id === id ? { ...i, connected: true, lastSyncAt: new Date().toISOString() } : i
      ),
    })),

  disconnectIntegration: (id) =>
    set((state) => ({
      integrations: state.integrations.map((i) =>
        i.id === id ? { ...i, connected: false, lastSyncAt: null } : i
      ),
    })),

  connectChannelAccount: (id) =>
    set((state) => ({
      channelAccounts: state.channelAccounts.map((a) =>
        a.id === id ? { ...a, connected: true } : a
      ),
    })),

  disconnectChannelAccount: (id) =>
    set((state) => ({
      channelAccounts: state.channelAccounts.map((a) =>
        a.id === id ? { ...a, connected: false } : a
      ),
    })),

  setAgentPreset: (preset) => set({ agentPreset: preset }),
}));
