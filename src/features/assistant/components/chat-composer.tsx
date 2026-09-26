import { ArrowUp } from 'lucide-react-native';
import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { IconDisc } from '@/components/ui/icon-disc';
import { cn } from '@/lib/cn';
import { COLORS, PLACEHOLDER_COLOR } from '@/theme/colors';
import { FONT_STYLE } from '@/theme/fonts';
import { useScaler } from '@/theme/scale';

export type ChatComposerProps = {
	onSend: (text: string) => void;
	busy?: boolean;
};

const MAX_LENGTH = 500;

export function ChatComposer({ onSend, busy = false }: ChatComposerProps) {
	const px = useScaler();
	const [text, setText] = useState('');
	const canSend = text.trim().length > 0 && !busy;

	const send = () => {
		if (!canSend) {
			return;
		}
		onSend(text);
		setText('');
	};

	return (
		<View
			className='flex-row items-end bg-card'
			style={{ borderRadius: px(24), paddingLeft: px(16), paddingRight: px(5), paddingVertical: px(5), gap: px(8) }}
		>
			<TextInput
				value={text}
				onChangeText={setText}
				placeholder='Pergunte sobre sua Ranger'
				placeholderTextColor={PLACEHOLDER_COLOR}
				multiline
				maxLength={MAX_LENGTH}
				submitBehavior='submit'
				returnKeyType='send'
				onSubmitEditing={send}
				accessibilityLabel='Mensagem para o Ford Assist'
				className='flex-1 text-foreground'
				style={{
					...FONT_STYLE.regular,
					fontSize: px(15),
					minHeight: px(38),
					maxHeight: px(112),
					paddingTop: px(9),
					paddingBottom: px(9),
				}}
			/>
			<IconDisc
				size={38}
				onPress={send}
				disabled={!canSend}
				accessibilityLabel='Enviar'
				className={cn(canSend ? 'bg-primary' : 'bg-muted')}
			>
				<ArrowUp size={px(18)} color={canSend ? COLORS.white : COLORS.subtleForeground} strokeWidth={2.25} />
			</IconDisc>
		</View>
	);
}
