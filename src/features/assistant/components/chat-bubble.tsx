import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';
import type { ChatMessage } from '../types';
import { AssistantAvatar } from './assistant-avatar';

/**
 * Uma fala da conversa. A da pessoa vai à direita, no azul Ford; a do
 * assistente vai à esquerda, no azul-gelo, com o selo dele — e, quando a
 * resposta aponta para uma tela, o atalho embaixo do texto.
 */
export function ChatBubble({ message }: { message: ChatMessage }) {
	const px = useScaler();
	const router = useRouter();
	const mine = message.role === 'user';
	const radius = px(20);

	return (
		<Animated.View
			entering={FadeInDown.duration(220)}
			style={{
				flexDirection: 'row',
				alignItems: 'flex-end',
				justifyContent: mine ? 'flex-end' : 'flex-start',
				gap: px(8),
			}}
		>
			{mine ? null : <AssistantAvatar size={26} />}
			<View
				className={cn(mine ? 'bg-primary' : 'bg-card')}
				style={{
					maxWidth: '80%',
					paddingHorizontal: px(13),
					paddingVertical: px(9),
					borderRadius: radius,
					// O canto do lado de quem fala fica mais fechado: é o "rabinho" do balão.
					borderBottomRightRadius: mine ? px(6) : radius,
					borderBottomLeftRadius: mine ? radius : px(6),
					gap: px(8),
				}}
			>
				<Text variant='bodySm' className={mine ? 'text-primary-foreground' : 'text-foreground'}>
					{message.text}
				</Text>
				{message.action ? (
					<PressableScale
						onPress={() => {
							if (message.action) {
								router.navigate(message.action.route);
							}
						}}
						accessibilityRole='link'
						className='flex-row items-center justify-between rounded-full bg-accent-soft'
						style={{ paddingLeft: px(12), paddingRight: px(8), paddingVertical: px(7), gap: px(6) }}
					>
						<Text variant='muted' font='semibold' className='text-accent'>
							{message.action.label}
						</Text>
						<ChevronRight size={px(15)} color={COLORS.accent} />
					</PressableScale>
				) : null}
			</View>
		</Animated.View>
	);
}
