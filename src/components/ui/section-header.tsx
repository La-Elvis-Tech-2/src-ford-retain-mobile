import { View } from 'react-native';
import { Text } from './text';

export type SectionHeaderProps = {
	title: string;
	subtitle?: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
	return (
		<View className='gap-0.5'>
			<Text variant='subtitle' accessibilityRole='header'>
				{title}
			</Text>
			{subtitle ? <Text variant='muted'>{subtitle}</Text> : null}
		</View>
	);
}
