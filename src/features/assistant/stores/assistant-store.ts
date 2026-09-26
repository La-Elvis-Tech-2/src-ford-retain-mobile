import { create } from 'zustand';
import { PROACTIVE_MESSAGES, replyTo } from '../data/assistant';
import type { ChatMessage } from '../types';

/**
 * Quanto a resposta simulada demora. Instantânea, ela parece colada na
 * pergunta; o intervalo dá tempo de o "digitando" aparecer e ser entendido.
 */
const REPLY_DELAY_MS = 1100;

export type AssistantState = {
	messages: ChatMessage[];
	/** Falas do assistente que a pessoa ainda não viu — o número da aba. */
	unread: number;
	/** Há uma resposta a caminho: a tela mostra o "digitando" e segura o envio. */
	isReplying: boolean;
	send: (text: string) => void;
	markRead: () => void;
};

let nextId = 0;

/**
 * A conversa com o Ford Assist.
 *
 * Mora num store, e não no estado da tela, porque o chat é uma ABA: a pessoa
 * pergunta, vai ver a revisão e volta — a conversa precisa estar lá. É também
 * o store que a barra de abas lê para o contador.
 *
 * Um envio de cada vez: duas perguntas cruzadas com duas respostas atrasadas
 * deixariam a conversa fora de ordem.
 *
 * TODO(api): com backend, a conversa passa a ser carregada e gravada lá.
 */
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
