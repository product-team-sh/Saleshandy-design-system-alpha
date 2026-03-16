import { create } from 'zustand';
import type { Conversation, ConversationStatus, ConversationSentiment, ConversationChannel } from '@/types/conversation';
import { mockConversations } from '@/mock/conversations';

interface ConversationFilters {
  campaignId: string | null;
  sentiment: ConversationSentiment | 'all';
  status: ConversationStatus | 'all';
  channel: ConversationChannel | 'all';
  unreadOnly: boolean;
}

interface ConversationState {
  conversations: Conversation[];
  activeConversationId: string | null;
  filters: ConversationFilters;

  setActiveConversation: (id: string | null) => void;
  setFilters: (f: Partial<ConversationFilters>) => void;
  sendReply: (conversationId: string, content: string) => void;
  approveAiReply: (conversationId: string) => void;
  dismissPendingReply: (conversationId: string) => void;
  snoozeConversation: (conversationId: string) => void;
  markResolved: (conversationId: string) => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  conversations: mockConversations,
  activeConversationId: null,
  filters: {
    campaignId: null,
    sentiment: 'all',
    status: 'all',
    channel: 'all',
    unreadOnly: false,
  },

  setActiveConversation: (id) =>
    set((state) => ({
      activeConversationId: id,
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, isUnread: false } : c
      ),
    })),

  setFilters: (f) =>
    set((state) => ({ filters: { ...state.filters, ...f } })),

  sendReply: (conversationId, content) =>
    set((state) => ({
      conversations: state.conversations.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          status: 'resolved' as ConversationStatus,
          preview: content.slice(0, 80),
          timestamp: new Date().toISOString(),
          pendingAiReply: undefined,
          messages: [
            ...c.messages,
            {
              id: `msg-manual-${Date.now()}`,
              direction: 'outbound' as const,
              channel: c.channel,
              content,
              timestamp: new Date().toISOString(),
              aiGenerated: false,
            },
          ],
        };
      }),
    })),

  approveAiReply: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) => {
        if (c.id !== conversationId || !c.pendingAiReply) return c;
        return {
          ...c,
          status: 'resolved' as ConversationStatus,
          preview: c.pendingAiReply.slice(0, 80),
          timestamp: new Date().toISOString(),
          pendingAiReply: undefined,
          pendingAiReason: undefined,
          messages: [
            ...c.messages,
            {
              id: `msg-ai-approved-${Date.now()}`,
              direction: 'outbound' as const,
              channel: c.channel,
              content: c.pendingAiReply,
              timestamp: new Date().toISOString(),
              aiGenerated: true,
            },
          ],
        };
      }),
    })),

  dismissPendingReply: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? { ...c, pendingAiReply: undefined, pendingAiReason: undefined }
          : c
      ),
    })),

  snoozeConversation: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? { ...c, status: 'ai_handling' as ConversationStatus, isUnread: false }
          : c
      ),
    })),

  markResolved: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? { ...c, status: 'resolved' as ConversationStatus, isEscalated: false, isUnread: false }
          : c
      ),
    })),
}));

export function useFilteredConversations() {
  const { conversations, filters } = useConversationStore();
  return conversations
    .filter((c) => {
      if (filters.campaignId && c.campaignId !== filters.campaignId) return false;
      if (filters.sentiment !== 'all' && c.sentiment !== filters.sentiment) return false;
      if (filters.status !== 'all' && c.status !== filters.status) return false;
      if (filters.channel !== 'all' && c.channel !== filters.channel) return false;
      if (filters.unreadOnly && !c.isUnread) return false;
      return true;
    })
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
