import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { useScaler } from '@/theme/scale';

export function BookingSummary({ rows }: { rows: { label: string; value: string }[] }) {
	const px = useScaler();

	return (
		<View className='rounded-2xl bg-field' style={{ padding: px(12), gap: px(8) }}>
			{rows.map((row) => (
				<View key={row.label} className='flex-row justify-between' style={{ gap: px(12) }}>
					<Text variant='muted'>{row.label}</Text>
					<Text variant='muted' font='semibold' className='flex-1 text-right text-foreground'>
						{row.value}
					</Text>
				</View>
			))}
		</View>
	);
}
