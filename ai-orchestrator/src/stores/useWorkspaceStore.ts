import { create } from 'zustand';
import { RightPanelView, PanelData } from '@/types/workspace';

export type CampaignRightTab = 'prospects' | 'overview' | 'meetings' | 'settings';

interface WorkspaceState {
  activePanelView: RightPanelView;
  panelData: PanelData;
  isPanelCollapsed: boolean;

  // Split-screen state
  chatPanelWidth: number;
  chatPanelCollapsed: boolean;
  activeRightTab: CampaignRightTab;

  setPanelView: (view: RightPanelView, data?: Partial<PanelData>) => void;
  updatePanelData: (data: Partial<PanelData>) => void;
  togglePanelCollapsed: () => void;

  setChatPanelWidth: (w: number) => void;
  toggleChatPanel: () => void;
  setActiveRightTab: (tab: CampaignRightTab) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activePanelView: 'guided_start',
  panelData: {},
  isPanelCollapsed: false,

  chatPanelWidth: 380,
  chatPanelCollapsed: false,
  activeRightTab: 'prospects',

  setPanelView: (view, data) =>
    set((state) => ({
      activePanelView: view,
      panelData: data ? { ...state.panelData, ...data } : state.panelData,
    })),

  updatePanelData: (data) =>
    set((state) => ({
      panelData: { ...state.panelData, ...data },
    })),

  togglePanelCollapsed: () =>
    set((state) => ({ isPanelCollapsed: !state.isPanelCollapsed })),

  setChatPanelWidth: (w) => set({ chatPanelWidth: Math.max(280, Math.min(520, w)) }),
  toggleChatPanel: () => set((state) => ({ chatPanelCollapsed: !state.chatPanelCollapsed })),
  setActiveRightTab: (tab) => set({ activeRightTab: tab }),
}));
