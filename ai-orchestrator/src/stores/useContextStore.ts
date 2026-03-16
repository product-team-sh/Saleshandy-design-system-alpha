import { create } from 'zustand';
import { Context } from '@/types/context';
import { mockContexts } from '@/mock/contexts';

interface ContextState {
  contexts: Context[];
  activeContextId: string;
  setActiveContext: (id: string) => void;
  createContext: (data: Partial<Context>) => Context;
  updateContext: (id: string, patch: Partial<Context>) => void;
  deleteContext: (id: string) => void;
}

let nextId = 1;

export const useContextStore = create<ContextState>((set, get) => ({
  contexts: mockContexts,
  activeContextId: mockContexts[0]?.id ?? '',

  setActiveContext: (id) => {
    const context = get().contexts.find((c) => c.id === id);
    if (context) {
      document.documentElement.style.setProperty('--accent', context.accentColor);
      document.documentElement.style.setProperty('--accent-hover', context.accentHover);
      document.documentElement.style.setProperty('--accent-pressed', context.accentPressed);
    }
    set({ activeContextId: id });
  },

  createContext: (data) => {
    const newCtx: Context = {
      id: `ctx-${Date.now()}-${nextId++}`,
      name: data.name || 'New Workspace',
      accentColor: data.accentColor || '#1d4ed8',
      accentHover: data.accentHover || '#1e40af',
      accentPressed: data.accentPressed || '#1e3a8a',
      description: data.description,
      createdAt: new Date().toISOString(),
      memberCount: 1,
      campaignCount: 0,
      prospectCount: 0,
      ...data,
    };
    set((state) => ({ contexts: [...state.contexts, newCtx] }));
    return newCtx;
  },

  updateContext: (id, patch) => {
    set((state) => ({
      contexts: state.contexts.map((c) =>
        c.id === id ? { ...c, ...patch } : c
      ),
    }));
  },

  deleteContext: (id) => {
    set((state) => {
      const filtered = state.contexts.filter((c) => c.id !== id);
      const newActive = state.activeContextId === id
        ? (filtered[0]?.id ?? '')
        : state.activeContextId;
      return { contexts: filtered, activeContextId: newActive };
    });
  },
}));

export function useActiveContext(): Context | undefined {
  const { contexts, activeContextId } = useContextStore();
  return contexts.find((c) => c.id === activeContextId);
}
