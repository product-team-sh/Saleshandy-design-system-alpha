import { create } from 'zustand';
import type { TimelineEvent, ProspectContext, ProspectNote } from '@/types/timeline';
import { mockTimelineEvents, mockProspectContexts, mockProspectNotes } from '@/mock/timeline-events';

interface TimelineState {
  activeProspectId: string | null;
  activeTab: 'timeline' | 'context' | 'notes';
  events: TimelineEvent[];
  contexts: Record<string, ProspectContext>;
  notes: ProspectNote[];
  searchQuery: string;
  filterStatus: string;

  setActiveProspect: (id: string | null) => void;
  setActiveTab: (tab: 'timeline' | 'context' | 'notes') => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: string) => void;
  addNote: (prospectId: string, content: string) => void;
}

export const useTimelineStore = create<TimelineState>((set) => ({
  activeProspectId: null,
  activeTab: 'timeline',
  events: mockTimelineEvents,
  contexts: mockProspectContexts,
  notes: mockProspectNotes,
  searchQuery: '',
  filterStatus: 'all',

  setActiveProspect: (id) => set({ activeProspectId: id, activeTab: 'timeline' }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterStatus: (status) => set({ filterStatus: status }),

  addNote: (prospectId, content) =>
    set((state) => ({
      notes: [
        {
          id: `note-${Date.now()}`,
          prospectId,
          content,
          createdAt: new Date().toISOString(),
        },
        ...state.notes,
      ],
    })),
}));

export function useEventsForProspect(prospectId: string | null): TimelineEvent[] {
  const events = useTimelineStore((s) => s.events);
  if (!prospectId) return [];
  return events
    .filter((e) => e.prospectId === prospectId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
