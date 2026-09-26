import { create } from 'zustand';
import { PROACTIVE_MESSAGES, replyTo } from '../data/assistant';
import type { ChatMessage } from '../types';

const REPLY_DELAY_MS = 1100;

export type AssistantState = {
	messages: ChatMessage[];
	unread: number;
	isReplying: boolean;
	send: (text: string) => void;
	markRead: () => void;
};

let nextId = 0;

export const useAssistantStore = create<AssistantState>((set, get) => ({
	messages: PROACTIVE_MESSAGES,
	unread: PROACTIVE_MESSAGES.length,
	isReplying: false,

	send(text) {
		const question = text.trim();

		if (question === '' || get().isReplying) {
			return;
		}

		nextId += 1;
		set((state) => ({
			messages: [...state.messages, { id: `user-${nextId}`, role: 'user', text: question }],
			isReplying: true,
		}));

		setTimeout(() => {
			nextId += 1;
			const reply: ChatMessage = { id: `assistant-${nextId}`, role: 'assistant', ...replyTo(question) };
			set((state) => ({ messages: [...state.messages, reply], isReplying: false }));
		}, REPLY_DELAY_MS);
	},

	markRead() {
		if (get().unread > 0) {
			set({ unread: 0 });
		}
	},
}));

export function useUnreadCount(): number {
	return useAssistantStore((state) => state.unread);
}
