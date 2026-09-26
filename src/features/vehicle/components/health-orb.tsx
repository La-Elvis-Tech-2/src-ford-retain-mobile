import { type ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	Easing,
	type SharedValue,
	useAnimatedProps,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';
import { colorAt } from '@/lib/color';
import { ORB_STOPS } from '@/theme/gradients';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const VIEW = 100;
const RADIUS = VIEW / 2;
const BAR_COUNT = 21;
const BAR_FILL = 0.58;

const BREATH = 0.12;
const CYCLE_MS = 5200;

type Bar = { x: number; width: number; height: number; color: string; phase: number };

const BARS: readonly Bar[] = Array.from({ length: BAR_COUNT }, (_, index) => {
	const step = VIEW / BAR_COUNT;
	const center = step * (index + 0.5);
	const offset = center - RADIUS;
	const chord = 2 * Math.sqrt(Math.max(0, RADIUS * RADIUS - offset * offset));
	const relief = 0.8 + 0.2 * Math.abs(Math.sin(index * 2.39));

	return {
		x: center - (step * BAR_FILL) / 2,
		width: step * BAR_FILL,
		height: chord * relief,
		color: colorAt(ORB_STOPS, center / VIEW),
		phase: index * 0.83,
	};
});

function OrbBar({ bar, index, clock, id }: { bar: Bar; index: number; clock: SharedValue<number>; id: string }) {
	const animatedProps = useAnimatedProps(() => {
		const height = bar.height * (1 - BREATH / 2 + (BREATH / 2) * Math.sin(clock.value + bar.phase));
		return { y: RADIUS - height / 2, height };
	});

	return (
		<AnimatedRect
			x={bar.x}
			width={bar.width}
			rx={bar.width / 2}
			fill={`url(#${id}-bar-${index})`}
			animatedProps={animatedProps}
		/>
	);
}

export type HealthOrbProps = {
	size: number;
	children?: ReactNode;
	id?: string;
};

export function HealthOrb({ size, children, id = 'orb' }: HealthOrbProps) {
	const diameter = size;
	const clock = useSharedValue(0);

	useEffect(() => {
		clock.value = withRepeat(withTiming(Math.PI * 2, { duration: CYCLE_MS, easing: Easing.linear }), -1, false);
	}, [clock]);

	return (
		<View
			style={{ width: diameter, height: diameter }}
			className='items-center justify-center'
			accessibilityElementsHidden={children === undefined}
		>
			<Svg width={diameter} height={diameter} viewBox={`0 0 ${VIEW} ${VIEW}`} style={{ position: 'absolute' }}>
				<Defs>
					{BARS.map((bar, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: lista estática
						<LinearGradient key={index} id={`${id}-bar-${index}`} x1='0' y1='0' x2='0' y2='1'>
							<Stop offset='0' stopColor={bar.color} stopOpacity={0} />
							<Stop offset='0.22' stopColor={bar.color} stopOpacity={0.75} />
							<Stop offset='0.5' stopColor={bar.color} stopOpacity={1} />
							<Stop offset='0.78' stopColor={bar.color} stopOpacity={0.75} />
							<Stop offset='1' stopColor={bar.color} stopOpacity={0} />
						</LinearGradient>
					))}
					<RadialGradient id={`${id}-glow`} cx='50%' cy='50%' r='50%'>
						<Stop offset='0' stopColor='#FFFFFF' stopOpacity={0.92} />
						<Stop offset='0.55' stopColor='#FFFFFF' stopOpacity={0.55} />
						<Stop offset='1' stopColor='#FFFFFF' stopOpacity={0} />
					</RadialGradient>
				</Defs>

				{BARS.map((bar, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: lista estática
					<OrbBar key={index} bar={bar} index={index} clock={clock} id={id} />
				))}

				<Circle cx={RADIUS} cy={RADIUS} r={RADIUS * 0.62} fill={`url(#${id}-glow)`} />
			</Svg>

			{children}
		</View>
	);
}
