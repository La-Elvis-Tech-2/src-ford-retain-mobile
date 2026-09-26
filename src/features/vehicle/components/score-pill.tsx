import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';
import { formatDelta } from '@/lib/format';
import { useScaler } from '@/theme/scale';
import { deltaClass } from '../theme';

export type ScorePillProps = {
	label: string;
	score: number;
	delta: number;
};

export function ScorePill({ label, score, delta }: ScorePillProps) {
	const px = useScaler();

	return (
		<View
			accessible
			accessibilityLabel={`${label}: ${score}%. ${formatDelta(delta)} na semana.`}
			className='items-center bg-white/80'
			style={{ borderRadius: px(20), paddingHorizontal: px(12), paddingVertical: px(5) }}
		>
			<Text variant='detail' className='text-secondary-foreground' maxFontSizeMultiplier={1.2}>
				{label}
			</Text>
			<View className='flex-row items-start'>
				<Text variant='score' maxFontSizeMultiplier={1.2}>
					{score}
				</Text>
				<Text
					variant='muted'
					font='semibold'
					className='text-foreground'
					maxFontSizeMultiplier={1.2}
					style={{ marginTop: px(10) }}
				>
					%
				</Text>
				<Text
					variant='caption'
					font='semibold'
					className={cn('ml-0.5', deltaClass(delta))}
					maxFontSizeMultiplier={1.2}
					style={{ marginTop: px(4) }}
				>
					{formatDelta(delta)}
				</Text>
			</View>
		</View>
	);
}
