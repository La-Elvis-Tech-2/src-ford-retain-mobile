import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

const FALLOFF = [
	{ at: 0, opacity: 1 },
	{ at: 0.15, opacity: 0.96 },
	{ at: 0.3, opacity: 0.86 },
	{ at: 0.45, opacity: 0.68 },
	{ at: 0.6, opacity: 0.46 },
	{ at: 0.75, opacity: 0.24 },
	{ at: 0.9, opacity: 0.07 },
	{ at: 1, opacity: 0 },
] as const;

export type EdgeFadeProps = {
	id: string;
	edge: 'top' | 'bottom';
	color: string;
	size: number;
	style?: AnimatedStyle<ViewStyle>;
};

export function EdgeFade({ id, edge, color, size, style }: EdgeFadeProps) {
	const fromTop = edge === 'top';

	return (
		<Animated.View
			pointerEvents='none'
			style={[styles.veil, fromTop ? { top: 0 } : { bottom: 0 }, { height: size }, style]}
		>
			<Svg width='100%' height='100%'>
				<Defs>
					<LinearGradient id={id} x1='0' y1={fromTop ? '0' : '1'} x2='0' y2={fromTop ? '1' : '0'}>
						{FALLOFF.map(({ at, opacity }) => (
							<Stop key={at} offset={at} stopColor={color} stopOpacity={opacity} />
						))}
					</LinearGradient>
				</Defs>
				<Rect x='0' y='0' width='100%' height='100%' fill={`url(#${id})`} />
			</Svg>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	veil: { position: 'absolute', left: 0, right: 0 },
});
