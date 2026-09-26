import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	type SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';
import { AssistantAvatar } from './assistant-avatar';

const DOTS = [0, 1, 2] as const;

function Dot({ clock, index }: { clock: SharedValue<number>; index: number }) {
	const px = useScaler();
	const rise = px(3);
	const style = useAnimatedStyle(() => {
		const phase = (clock.value - index / 3 + 1) % 1;
		const lift = phase < 0.5 ? Math.sin(phase * Math.PI * 2) : 0;
		return { opacity: 0.35 + 0.65 * lift, transform: [{ translateY: -rise * lift }] };
	});

	return (
		<Animated.View
			style={[{ width: px(6), height: px(6), borderRadius: px(3), backgroundColor: COLORS.accent }, style]}
		/>
	);
}

export function TypingIndicator() {
	const px = useScaler();
	const clock = useSharedValue(0);

	useEffect(() => {
		clock.value = withRepeat(withTiming(1, { duration: 900 }), -1, false);
	}, [clock]);

	return (
		<View
			className='flex-row items-end'
			style={{ gap: px(8) }}
			accessible
			accessibilityLabel='O assistente está digitando'
		>
			<AssistantAvatar size={26} />
			<View
				className='flex-row items-center bg-card'
				style={{ gap: px(5), paddingHorizontal: px(14), paddingVertical: px(13), borderRadius: px(20) }}
			>
				{DOTS.map((index) => (
					<Dot key={index} clock={clock} index={index} />
				))}
			</View>
		</View>
	);
}
