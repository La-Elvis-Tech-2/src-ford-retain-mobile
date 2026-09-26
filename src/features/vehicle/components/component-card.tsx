import { ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { COLORS } from '@/theme/colors';
import { CARD_PADDING, CARD_RADIUS } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import { statusOf } from '../health';
import { STATUS_META } from '../theme';
import type { VehicleComponent } from '../types';
import { ComponentIcon } from './component-icon';
import { LifeBar } from './life-bar';
import { StatusBadge } from './status-badge';

/**
 * Um componente do carro: nome, selo de status, a medida que justifica a nota
 * e a barra. O toque abre a explicação — o "por quê" do laudo —, que fica
 * fechada para a lista caber de relance.
 */
export function ComponentCard({ component }: { component: VehicleComponent }) {
	const px = useScaler();
	const [open, setOpen] = useState(false);
	const status = statusOf(component.health);
	const meta = STATUS_META[status];

	return (
		<PressableScale
			onPress={() => setOpen((current) => !current)}
			haptic='select'
			accessibilityRole='button'
			accessibilityState={{ expanded: open }}
			accessibilityLabel={`${component.name}, ${meta.label}, nota ${component.health}. ${component.detail}`}
			className='bg-card'
			style={{ borderRadius: px(CARD_RADIUS), padding: px(CARD_PADDING), gap: px(10) }}
		>
			<View className='flex-row items-center' style={{ gap: px(12) }}>
				<View
					className='items-center justify-center rounded-full'
					style={{ width: px(36), height: px(36), backgroundColor: meta.soft }}
				>
					<ComponentIcon icon={component.icon} size={px(18)} color={meta.color} />
				</View>
				<View className='flex-1' style={{ gap: px(4) }}>
					<Text variant='body' font='semibold' numberOfLines={1}>
						{component.name}
					</Text>
					<StatusBadge status={status} />
				</View>
				<Text variant='metric' maxFontSizeMultiplier={1.2}>
					{component.health}
				</Text>
				<View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }}>
					<ChevronDown size={px(18)} color={COLORS.subtleForeground} />
				</View>
			</View>

			<LifeBar value={component.health} status={status} />
			<Text variant='muted'>{component.detail}</Text>

			{open ? (
				<Animated.View entering={FadeIn.duration(180)} style={{ gap: px(8), paddingTop: px(2) }}>
					<View className='h-px bg-border' />
					<Text variant='bodySm' className='text-secondary-foreground'>
						{component.explanation}
					</Text>
					{component.slack ? (
						<Text variant='detail' font='semibold' className='text-positive'>
							{component.slack}
						</Text>
					) : null}
				</Animated.View>
			) : null}
		</PressableScale>
	);
}
