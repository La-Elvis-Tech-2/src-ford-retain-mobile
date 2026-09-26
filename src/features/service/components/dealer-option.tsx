import { MapPin, Star } from 'lucide-react-native';
import { View } from 'react-native';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';
import type { Dealer } from '../types';

export function DealerOption({
	dealer,
	selected,
	onPress,
}: {
	dealer: Dealer;
	selected: boolean;
	onPress: () => void;
}) {
	const px = useScaler();

	return (
		<PressableScale
			onPress={onPress}
			haptic='select'
			accessibilityRole='radio'
			accessibilityState={{ checked: selected }}
			accessibilityLabel={`${dealer.name}, desvio de ${dealer.detourKm}, ${dealer.detourMinutes} minutos a mais. Nota ${dealer.rating}.`}
			className={cn('flex-row items-center border-2 bg-card', selected ? 'border-primary' : 'border-transparent')}
			style={{ borderRadius: px(18), padding: px(12), gap: px(12) }}
		>
			<View
				className={cn('items-center justify-center rounded-full', selected ? 'bg-primary' : 'bg-secondary')}
				style={{ width: px(36), height: px(36) }}
			>
				<MapPin size={px(16)} color={selected ? COLORS.white : COLORS.primary} />
			</View>

			<View className='flex-1' style={{ gap: px(2) }}>
				<Text variant='body' font='semibold' numberOfLines={1}>
					{dealer.name}
				</Text>
				<View className='flex-row items-center' style={{ gap: px(4) }}>
					<Star size={px(12)} color={COLORS.star} fill={COLORS.star} />
					<Text variant='detail'>
						{dealer.rating.toFixed(1).replace('.', ',')} · {dealer.district}
					</Text>
				</View>
				{dealer.highlight ? (
					<Text variant='caption' font='semibold' className='text-accent'>
						{dealer.highlight}
					</Text>
				) : null}
			</View>

			<View className='items-end'>
				<Text variant='body' font='semibold'>
					+{dealer.detourMinutes} min
				</Text>
				<Text variant='detail'>{dealer.detourKm}</Text>
			</View>
		</PressableScale>
	);
}
