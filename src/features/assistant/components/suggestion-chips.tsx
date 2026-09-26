import { ScrollView } from 'react-native';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { PRESS_SCALE } from '@/hooks/use-press-scale';
import { SCREEN_GUTTER } from '@/theme/layout';
import { useScaler } from '@/theme/scale';

export type SuggestionChipsProps = {
	suggestions: readonly string[];
	onPick: (suggestion: string) => void;
	disabled?: boolean;
};

export function SuggestionChips({ suggestions, onPick, disabled = false }: SuggestionChipsProps) {
	const px = useScaler();
	const gutter = px(SCREEN_GUTTER);

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			keyboardShouldPersistTaps='handled'
			style={{ marginHorizontal: -gutter, flexGrow: 0 }}
			contentContainerStyle={{ paddingHorizontal: gutter, gap: px(8) }}
		>
			{suggestions.map((suggestion) => (
				<PressableScale
					key={suggestion}
					scaleTo={PRESS_SCALE.control}
					disabled={disabled}
					onPress={() => onPick(suggestion)}
					accessibilityRole='button'
					className='rounded-full border border-border bg-card'
					style={{ paddingHorizontal: px(12), paddingVertical: px(7), opacity: disabled ? 0.5 : 1 }}
				>
					<Text variant='muted' font='medium' className='text-foreground'>
						{suggestion}
					</Text>
				</PressableScale>
			))}
		</ScrollView>
	);
}
