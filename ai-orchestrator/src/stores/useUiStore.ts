import { create } from 'zustand';

export type ChatMode = 'ask' | 'plan' | 'execute';

interface UiState {
  sidebarCollapsed: boolean;
  activeModal: string | null;
  prospectDrawerOpen: boolean;
  prospectDrawerId: string | null;
  chatMode: ChatMode;
  chatSettingsOpen: boolean;

  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openModal: (id: string) => void;
  closeModal: () => void;
  openProspectDrawer: (id: string) => void;
  closeProspectDrawer: () => void;
  setChatMode: (mode: ChatMode) => void;
  toggleChatSettings: () => void;
  setChatSettingsOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: true,
  activeModal: null,
  prospectDrawerOpen: false,
  prospectDrawerId: null,
  chatMode: 'ask',
  chatSettingsOpen: false,

  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  openModal: (id) => set({ activeModal: id }),
  closeModal: () => set({ activeModal: null }),

  openProspectDrawer: (id) =>
    set({ prospectDrawerOpen: true, prospectDrawerId: id }),

  closeProspectDrawer: () =>
    set({ prospectDrawerOpen: false, prospectDrawerId: null }),

  setChatMode: (mode) => set({ chatMode: mode }),
  toggleChatSettings: () =>
    set((state) => ({ chatSettingsOpen: !state.chatSettingsOpen })),
  setChatSettingsOpen: (open) => set({ chatSettingsOpen: open }),
}));
