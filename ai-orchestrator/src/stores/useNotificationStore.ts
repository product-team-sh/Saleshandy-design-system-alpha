import { create } from 'zustand';
import { nanoid } from 'nanoid';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'loading';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  action?: { label: string; onClick: () => void };
}

export interface BackgroundOp {
  id: string;
  campaignId: string;
  type: 'generating_plan' | 'enriching_prospects' | 'generating_content' | 'scheduling';
  status: 'running' | 'completed' | 'failed';
  progress?: number;
  startedAt: string;
  completedAt?: string;
  message: string;
}

interface NotificationState {
  toasts: Toast[];
  backgroundOps: BackgroundOp[];

  addToast: (toast: Omit<Toast, 'id'>) => string;
  dismissToast: (id: string) => void;
  addOp: (op: Omit<BackgroundOp, 'id'>) => string;
  updateOp: (id: string, patch: Partial<BackgroundOp>) => void;
  removeOp: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  toasts: [],
  backgroundOps: [],

  addToast: (toast) => {
    const id = `toast-${nanoid(6)}`;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    if (toast.type !== 'loading') {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, 5000);
    }
    return id;
  },

  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  addOp: (op) => {
    const id = `op-${nanoid(6)}`;
    set((state) => ({
      backgroundOps: [...state.backgroundOps, { ...op, id }],
    }));
    return id;
  },

  updateOp: (id, patch) =>
    set((state) => ({
      backgroundOps: state.backgroundOps.map((op) =>
        op.id === id ? { ...op, ...patch } : op
      ),
    })),

  removeOp: (id) =>
    set((state) => ({
      backgroundOps: state.backgroundOps.filter((op) => op.id !== id),
    })),
}));
