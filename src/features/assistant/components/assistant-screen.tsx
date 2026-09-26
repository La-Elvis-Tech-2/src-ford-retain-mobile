import { useFocusEffect } from 'expo-router';
import { useCallback, useRef } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { KeyboardAvoiding } from '@/components/layout/keyboard-avoiding';
import { Screen } from '@/components/layout/screen';
import { useTabBarOverlap } from '@/components/layout/tab-bar';
import { Text } from '@/components/ui/text';
import { useKeyboardVisible } from '@/hooks/use-keyboard-visible';
import { SCREEN_GUTTER } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import { SUGGESTIONS } from '../data/assistant';
import { useAssistantStore } from '../stores/assistant-store';
import { AssistantAvatar } from './assistant-avatar';
import { ChatBubble } from './chat-bubble';
import { ChatComposer } from './chat-composer';
import { SuggestionChips } from './suggestion-chips';
import { TypingIndicator } from './typing-indicator';

/** Entre o campo e o topo da barra de abas — ou o teclado, quando ele está aberto. */
const COMPOSER_GAP = 8;

/**
 * O Ford Assist — a aba "Chat" do layout.
 *
 * Abre com as três falas que o assistente deixou (o "3" da aba) e as zera ao
 * ganhar foco: quem abriu a aba viu as mensagens.
 *
 * O campo fica ANCORADO acima da barra de abas, e não dentro da rolagem. Com o
 * teclado aberto a barra sai de cena (ver `TabBar`) e o campo desce para logo
 * acima do teclado.
 */
export function AssistantScreen() {
	const px = useScaler();
	const scroll = useRef<ScrollView>(null);
	const keyboardVisible = useKeyboardVisible();
	const tabBarOverlap = useTabBarOverlap();
	const messages = useAssistantStore((state) => state.messages);
	const isReplying = useAssistantStore((state) => state.isReplying);
	const send = useAssistantStore((state) => state.send);
	const markRead = useAssistantStore((state) => state.markRead);

	useFocusEffect(
		useCallback(() => {
			markRead();
		}, [markRead]),
	);

	return (
		<Screen>
			<KeyboardAvoiding>
				<View className='flex-row items-center' style={{ gap: px(10), paddingVertical: px(8) }}>
					<AssistantAvatar size={38} />
					<View className='flex-1'>
						<Text variant='subtitle' accessibilityRole='header'>
							Ford Assist
						</Text>
						<Text variant='detail'>Lendo sua Ranger · hoje, 07h12</Text>
					</View>
				</View>

				<ScrollView
					ref={scroll}
					className='flex-1'
					style={{ marginHorizontal: -px(SCREEN_GUTTER) }}
					contentContainerStyle={{ paddingHorizontal: px(SCREEN_GUTTER), paddingVertical: px(12), gap: px(10) }}
					showsVerticalScrollIndicator={false}
					keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
					keyboardShouldPersistTaps='handled'
					// Cada fala nova empurra a conversa para o fim, como em qualquer chat.
					onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: true })}
				>
					<Text variant='caption' className='self-center'>
						Hoje
					</Text>
					{messages.map((message) => (
						<ChatBubble key={message.id} message={message} />
					))}
					{isReplying ? <TypingIndicator /> : null}
				</ScrollView>

				<View
					style={{
						gap: px(8),
						paddingTop: px(6),
						paddingBottom: keyboardVisible ? px(COMPOSER_GAP) : tabBarOverlap + px(COMPOSER_GAP),
					}}
				>
					<SuggestionChips suggestions={SUGGESTIONS} onPick={send} disabled={isReplying} />
					<ChatComposer onSend={send} busy={isReplying} />
				</View>
			</KeyboardAvoiding>
		</Screen>
	);
}
