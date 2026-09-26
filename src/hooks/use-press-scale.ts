import { useCallback } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

export const PRESS_SCALE = {
	mark: 0.94,
	control: 0.975,
	surface: 0.982,
} as const;

const PRESSED_SCALE = PRESS_SCALE.control;

const PRESS_IN = { duration: 120, easing: Easing.out(Easing.quad) } as const;

const RELEASE_DELAY = 60;

const PRESS_OUT = { damping: 18, stiffness: 170, mass: 0.6 } as const;

export function usePressScale(pressedScale: number = PRESSED_SCALE) {
	const progress = useSharedValue(0);

	const style = useAnimatedStyle(() => ({
		transform: [{ scale: 1 + (pressedScale - 1) * progress.value }],
	}));

	const onPressIn = useCallback(() => {
		progress.value = withTiming(1, PRESS_IN);
	}, [progress]);

	const onPressOut = useCallback(() => {
		progress.value = withDelay(RELEASE_DELAY, withSpring(0, PRESS_OUT));
	}, [progress]);

	return { style, onPressIn, onPressOut };
}
