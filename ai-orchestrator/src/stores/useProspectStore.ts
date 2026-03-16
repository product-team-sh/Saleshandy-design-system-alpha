import { create } from 'zustand';
import { Prospect, ProspectStatus } from '@/types/prospect';
import { mockProspects } from '@/mock/prospects';

interface ProspectFilters {
  search: string;
  status: ProspectStatus | 'all';
  campaignId: string | null;
  tags: string[];
}

interface ProspectState {
  prospects: Record<string, Prospect>;
  filters: ProspectFilters;
  selectedProspectIds: string[];

  setFilters: (filters: Partial<ProspectFilters>) => void;
  selectProspects: (ids: string[]) => void;
  toggleProspectSelection: (id: string) => void;
  clearSelection: () => void;
  updateProspectStatus: (id: string, status: ProspectStatus) => void;
  bulkUpdateStatus: (ids: string[], status: ProspectStatus) => void;
}

const initialProspects: Record<string, Prospect> = {};
mockProspects.forEach((p) => {
  initialProspects[p.id] = p;
});

export const useProspectStore = create<ProspectState>((set) => ({
  prospects: initialProspects,
  filters: { search: '', status: 'all', campaignId: null, tags: [] },
  selectedProspectIds: [],

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  selectProspects: (ids) => set({ selectedProspectIds: ids }),

  toggleProspectSelection: (id) =>
    set((state) => ({
      selectedProspectIds: state.selectedProspectIds.includes(id)
        ? state.selectedProspectIds.filter((i) => i !== id)
        : [...state.selectedProspectIds, id],
    })),

  clearSelection: () => set({ selectedProspectIds: [] }),

  updateProspectStatus: (id, status) =>
    set((state) => ({
      prospects: {
        ...state.prospects,
        [id]: { ...state.prospects[id], status },
      },
    })),

  bulkUpdateStatus: (ids, status) =>
    set((state) => {
      const updated = { ...state.prospects };
      ids.forEach((id) => {
        if (updated[id]) {
          updated[id] = { ...updated[id], status };
        }
      });
      return { prospects: updated, selectedProspectIds: [] };
    }),
}));

export function useFilteredProspects(): Prospect[] {
  const { prospects, filters } = useProspectStore();
  return Object.values(prospects)
    .filter((p) => filters.status === 'all' || p.status === filters.status)
    .filter(
      (p) => !filters.campaignId || p.campaignIds.includes(filters.campaignId)
    )
    .filter(
      (p) =>
        filters.tags.length === 0 ||
        filters.tags.some((t) => p.tags.includes(t))
    )
    .filter(
      (p) =>
        filters.search === '' ||
        `${p.firstName} ${p.lastName} ${p.email} ${p.company}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
    );
}
