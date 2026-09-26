import { ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { formatDelta } from '@/lib/format';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';
import { deltaClass, STATUS_META } from '../theme';
import type { SystemSummary } from '../types';
import { SystemIcon } from './component-icon';

const HEIGHT = 42;
const ICON_DISC = 28;

export function SystemRow({ system, onPress }: { system: SystemSummary; onPress: () => void }) {
	const px = useScaler();
	const meta = STATUS_META[system.status];
	const gradientId = `system-fill-${system.id}`;

	return (
		<PressableScale
			onPress={onPress}
			accessibilityRole='button'
			accessibilityLabel={`${system.name}: ${system.score}%, ${meta.label}. ${formatDelta(system.delta)} na semana.`}
			accessibilityHint='Abre os componentes do sistema'
			className='flex-row items-center overflow-hidden rounded-full border border-border bg-card'
			style={{ minHeight: px(HEIGHT), paddingVertical: px(3), paddingLeft: px(7), paddingRight: px(8), gap: px(7) }}
		>
			<View className='absolute top-0 bottom-0 left-0' style={{ width: `${system.score}%` }}>
				<Svg width='100%' height='100%'>
					<Defs>
						<LinearGradient id={gradientId} x1='0' y1='0' x2='1' y2='0'>
							<Stop offset='0' stopColor={meta.tint} stopOpacity={1} />
							<Stop offset='1' stopColor={meta.tint} stopOpacity={0.12} />
						</LinearGradient>
					</Defs>
					<Rect x='0' y='0' width='100%' height='100%' fill={`url(#${gradientId})`} />
				</Svg>
			</View>

			<View
				className='items-center justify-center rounded-full bg-card'
				style={{ width: px(ICON_DISC), height: px(ICON_DISC) }}
			>
				<SystemIcon system={system.id} size={px(16)} color={meta.color} />
			</View>

			<View className='flex-1'>
				<Text variant='detail' className='text-secondary-foreground' numberOfLines={1} maxFontSizeMultiplier={1.2}>
					{system.name}
				</Text>
				<View className='flex-row items-baseline' style={{ gap: px(4) }}>
					<Text variant='metric' maxFontSizeMultiplier={1.15}>
						{system.score}%
					</Text>
					<Text variant='caption' font='semibold' className={deltaClass(system.delta)} maxFontSizeMultiplier={1.2}>
						{formatDelta(system.delta)}
					</Text>
				</View>
			</View>

			<meta.Icon size={px(13)} color={meta.color} strokeWidth={2.25} />
			<ChevronRight size={px(15)} color={COLORS.subtleForeground} strokeWidth={2} />
		</PressableScale>
	);
}
