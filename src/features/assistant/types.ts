import type { Href } from 'expo-router';

export type ChatRole = 'user' | 'assistant';

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
