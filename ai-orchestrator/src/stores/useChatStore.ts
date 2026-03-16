import { create } from 'zustand';
import { ChatMessage } from '@/types/chat';
import { mockMessages } from '@/mock/messages';
import { nanoid } from 'nanoid';

interface ChatState {
  messagesByCampaign: Record<string, ChatMessage[]>;
  isAiThinking: Record<string, boolean>;
  isAiStreaming: Record<string, boolean>;
  conversationPhases: Record<string, string>;

  addUserMessage: (campaignId: string, content: string) => ChatMessage;
  addAiMessage: (campaignId: string, message: Omit<ChatMessage, 'id' | 'campaignId' | 'role' | 'timestamp'>) => ChatMessage;
  setAiThinking: (campaignId: string, thinking: boolean) => void;
  setAiStreaming: (campaignId: string, streaming: boolean) => void;
  appendToLastAiMessage: (campaignId: string, chunk: string) => void;
  setPhase: (campaignId: string, phase: string) => void;
  getPhase: (campaignId: string) => string;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messagesByCampaign: { ...mockMessages },
  isAiThinking: {},
  isAiStreaming: {},
  conversationPhases: {},

  addUserMessage: (campaignId, content) => {
    const message: ChatMessage = {
      id: `msg-${nanoid(8)}`,
      campaignId,
      role: 'user',
      contentType: 'text',
      content,
      timestamp: new Date().toISOString(),
    };
    set((state) => ({
      messagesByCampaign: {
        ...state.messagesByCampaign,
        [campaignId]: [...(state.messagesByCampaign[campaignId] ?? []), message],
      },
    }));
    return message;
  },

  addAiMessage: (campaignId, msg) => {
    const message: ChatMessage = {
      ...msg,
      id: `msg-${nanoid(8)}`,
      campaignId,
      role: 'ai',
      timestamp: new Date().toISOString(),
    };
    set((state) => ({
      messagesByCampaign: {
        ...state.messagesByCampaign,
        [campaignId]: [...(state.messagesByCampaign[campaignId] ?? []), message],
      },
    }));
    return message;
  },

  setAiThinking: (campaignId, thinking) =>
    set((state) => ({
      isAiThinking: { ...state.isAiThinking, [campaignId]: thinking },
    })),

  setAiStreaming: (campaignId, streaming) =>
    set((state) => ({
      isAiStreaming: { ...state.isAiStreaming, [campaignId]: streaming },
    })),

  appendToLastAiMessage: (campaignId, chunk) =>
    set((state) => {
      const messages = state.messagesByCampaign[campaignId] ?? [];
      const lastIndex = messages.length - 1;
      if (lastIndex < 0 || messages[lastIndex].role !== 'ai') return state;
      const updated = [...messages];
      updated[lastIndex] = {
        ...updated[lastIndex],
        content: updated[lastIndex].content + chunk,
      };
      return {
        messagesByCampaign: {
          ...state.messagesByCampaign,
          [campaignId]: updated,
        },
      };
    }),

  setPhase: (campaignId, phase) =>
    set((state) => ({
      conversationPhases: { ...state.conversationPhases, [campaignId]: phase },
    })),

  getPhase: (campaignId) => get().conversationPhases[campaignId] ?? 'fresh',
}));

export function useMessagesForCampaign(campaignId: string): ChatMessage[] {
  return useChatStore((state) => state.messagesByCampaign[campaignId] ?? []);
}

export function useIsAiThinking(campaignId: string): boolean {
  return useChatStore((state) => state.isAiThinking[campaignId] ?? false);
}
