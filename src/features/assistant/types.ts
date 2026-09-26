import type { Href } from 'expo-router';

export type ChatRole = 'user' | 'assistant';

/** Um atalho dentro da fala do assistente — "Ver revisão recomendada". */
export type ChatAction = {
	label: string;
	route: Href;
};

export type ChatMessage = {
	id: string;
	role: ChatRole;
	text: string;
	action?: ChatAction;
};

export type AssistantReply = Omit<ChatMessage, 'id' | 'role'>;
