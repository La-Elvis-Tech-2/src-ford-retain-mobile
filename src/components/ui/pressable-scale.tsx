import { useCallback } from 'react';
import {
	type GestureResponderEvent,
	Pressable,
	type PressableProps,
	type StyleProp,
	type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { PRESS_SCALE, usePressScale } from '@/hooks/use-press-scale';
import { type HapticIntent, haptic } from '@/lib/haptics';

export type PressableScaleProps = Omit<PressableProps, 'style'> & {
	scaleTo?: number;
	haptic?: HapticIntent | null;
	containerStyle?: StyleProp<ViewStyle>;
	style?: StyleProp<ViewStyle>;
};

export function PressableScale({
	scaleTo = PRESS_SCALE.surface,
	haptic: intent = 'tap',
	containerStyle,
	onPressIn,
	onPressOut,
	...props
}: PressableScaleProps) {
	const scale = usePressScale(scaleTo);

	const handlePressIn = useCallback(
		(event: GestureResponderEvent) => {
			if (intent !== null) {
				haptic(intent);
			}
			scale.onPressIn();
			onPressIn?.(event);
		},
		[intent, scale, onPressIn],
	);

	const handlePressOut = useCallback(
		(event: GestureResponderEvent) => {
			scale.onPressOut();
			onPressOut?.(event);
		},
		[scale, onPressOut],
	);

	return (
		<Animated.View style={[containerStyle, scale.style]}>
			<Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...props} />
		</Animated.View>
	);
}
