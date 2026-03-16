import { create } from 'zustand';

interface DashboardState {
  dateRange: string;
  setDateRange: (range: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dateRange: '7d',
  setDateRange: (range) => set({ dateRange: range }),
}));
