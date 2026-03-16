import { create } from 'zustand';
import type { KnowledgeCard, BrainHealth } from '@/types/brain';
import { mockKnowledgeCards, mockBrainHealth } from '@/mock/brain';

const MOCK_TEST_RESULTS = [
  'I know your ICP very well — SaaS founders, Series A–C, 20–500 employees, US & Europe. I can target precisely.\n\nMy weakest area is competitive intelligence — I only have data on 2 competitors and may escalate questions about others. Consider adding more competitor profiles.',
  'Your brand voice is clear and confident. I can write outreach that sounds like you.\n\nI noticed your case studies are limited to 2 examples. Adding more — especially from fintech and devtools — would let me reference wins for those verticals.',
];

interface BrainStoreState {
  healthScore: number;
  cards: KnowledgeCard[];
  lastTestedAt: string | null;
  testResults: string | null;
  isTesting: boolean;

  updateCard: (id: string, patch: Partial<KnowledgeCard>) => void;
  runKnowledgeTest: () => Promise<void>;
  clearTestResults: () => void;
}

export const useBrainStore = create<BrainStoreState>((set) => ({
  healthScore: mockBrainHealth.healthScore,
  cards: mockKnowledgeCards,
  lastTestedAt: mockBrainHealth.lastTestedAt,
  testResults: null,
  isTesting: false,

  updateCard: (id, patch) =>
    set((state) => ({
      cards: state.cards.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    })),

  runKnowledgeTest: async () => {
    set({ isTesting: true, testResults: null });
    await new Promise((r) => setTimeout(r, 1800));
    const result = MOCK_TEST_RESULTS[Math.floor(Math.random() * MOCK_TEST_RESULTS.length)];
    set({
      isTesting: false,
      testResults: result,
      lastTestedAt: new Date().toISOString(),
    });
  },

  clearTestResults: () => set({ testResults: null }),
}));
