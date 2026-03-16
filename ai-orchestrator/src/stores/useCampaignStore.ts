import { create } from 'zustand';
import { Campaign, CampaignStatus, Channel } from '@/types/campaign';
import { mockCampaigns } from '@/mock/campaigns';
import { nanoid } from 'nanoid';

interface CampaignFilters {
  status: CampaignStatus | 'all';
  channel: Channel | 'all';
  search: string;
}

interface CampaignState {
  campaigns: Record<string, Campaign>;
  activeCampaignId: string | null;
  filters: CampaignFilters;

  setActiveCampaign: (id: string) => void;
  setFilters: (filters: Partial<CampaignFilters>) => void;
  createCampaign: (contextId: string, templateType?: string) => Campaign;
  updateCampaign: (id: string, patch: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
}

const initialCampaigns: Record<string, Campaign> = {};
mockCampaigns.forEach((c) => {
  initialCampaigns[c.id] = c;
});

export const useCampaignStore = create<CampaignState>((set, get) => ({
  campaigns: initialCampaigns,
  activeCampaignId: null,
  filters: { status: 'all', channel: 'all', search: '' },

  setActiveCampaign: (id) => set({ activeCampaignId: id }),

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  createCampaign: (contextId, templateType) => {
    const id = `camp-${nanoid(8)}`;
    const now = new Date().toISOString();
    const campaign: Campaign = {
      id,
      contextId,
      name: 'New Campaign',
      status: 'draft',
      channels: [],
      templateType: (templateType as Campaign['templateType']) ?? null,
      prospectCount: 0,
      createdAt: now,
      updatedAt: now,
      metrics: null,
      hasUnreadAiUpdate: false,
    };
    set((state) => ({
      campaigns: { ...state.campaigns, [id]: campaign },
      activeCampaignId: id,
    }));
    return campaign;
  },

  updateCampaign: (id, patch) =>
    set((state) => {
      const existing = state.campaigns[id];
      if (!existing) return state;
      return {
        campaigns: {
          ...state.campaigns,
          [id]: { ...existing, ...patch, updatedAt: new Date().toISOString() },
        },
      };
    }),

  deleteCampaign: (id) =>
    set((state) => {
      const { [id]: _, ...rest } = state.campaigns;
      return {
        campaigns: rest,
        activeCampaignId: state.activeCampaignId === id ? null : state.activeCampaignId,
      };
    }),
}));

export function useCampaignsForContext(contextId: string): Campaign[] {
  const { campaigns, filters } = useCampaignStore();
  return Object.values(campaigns)
    .filter((c) => c.contextId === contextId)
    .filter((c) => filters.status === 'all' || c.status === filters.status)
    .filter((c) => filters.channel === 'all' || c.channels.includes(filters.channel))
    .filter(
      (c) =>
        filters.search === '' ||
        c.name.toLowerCase().includes(filters.search.toLowerCase())
    )
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function useActiveCampaign(): Campaign | undefined {
  const { campaigns, activeCampaignId } = useCampaignStore();
  return activeCampaignId ? campaigns[activeCampaignId] : undefined;
}
