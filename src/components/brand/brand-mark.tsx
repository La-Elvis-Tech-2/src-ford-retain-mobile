import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { colorAt } from '@/lib/color';
import { ORB_STOPS } from '@/theme/gradients';

const HEIGHTS = [0.46, 0.78, 1, 0.78, 0.46] as const;

export function BrandMark({ size }: { size: number }) {
	const slot = 24 / HEIGHTS.length;

	return (
		<Svg width={size} height={size} viewBox='0 0 24 24'>
			<Defs>
				{HEIGHTS.map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: lista estática
					<LinearGradient key={index} id={`brand-bar-${index}`} x1='0' y1='0' x2='0' y2='1'>
						<Stop offset='0' stopColor={colorAt(ORB_STOPS, index / 4)} stopOpacity={0.35} />
						<Stop offset='0.5' stopColor={colorAt(ORB_STOPS, index / 4)} stopOpacity={1} />
						<Stop offset='1' stopColor={colorAt(ORB_STOPS, index / 4)} stopOpacity={0.35} />
					</LinearGradient>
				))}
			</Defs>
			{HEIGHTS.map((height, index) => {
				const barHeight = 24 * height;
				return (
					<Rect
						// biome-ignore lint/suspicious/noArrayIndexKey: lista estática
						key={index}
						x={slot * index + slot * 0.18}
						y={(24 - barHeight) / 2}
						width={slot * 0.64}
						height={barHeight}
						rx={slot * 0.32}
						fill={`url(#brand-bar-${index})`}
					/>
				);
			})}
		</Svg>
	);
}
