import { useRouter } from 'expo-router';
import { Bell } from 'lucide-react-native';
import { View } from 'react-native';
import { BrandMark } from '@/components/brand/brand-mark';
import { IconDisc } from '@/components/ui/icon-disc';
import { Text } from '@/components/ui/text';
import { useNotificationsStore } from '@/features/notifications/stores/notifications-store';
import type { Vehicle } from '@/features/vehicle/types';
import { formatKm } from '@/lib/format';
import { ROUTES } from '@/routes/routes';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';

/**
 * A pílula do topo da home: a marca, o carro que está sendo lido e o sino. O
 * ponto azul do sino some ao abrir os avisos.
 */
export function HomeTopBar({ vehicle }: { vehicle: Vehicle | null }) {
	const px = useScaler();
	const router = useRouter();
	const hasUnread = useNotificationsStore((state) => state.hasUnread);

	return (
		<View
			className='flex-row items-center rounded-full bg-background'
			style={{ height: px(44), paddingLeft: px(12), paddingRight: px(4), gap: px(10) }}
		>
			<BrandMark size={px(22)} />
			<View className='flex-1'>
				<Text variant='muted' font='semibold' className='text-foreground' numberOfLines={1}>
					{vehicle ? vehicle.model : 'Ford Retain'}
				</Text>
				{vehicle ? (
					<Text variant='caption' numberOfLines={1}>
						{formatKm(vehicle.km)} · {vehicle.maskedPlate}
					</Text>
				) : null}
			</View>
			<IconDisc
				size={36}
				onPress={() => router.push(ROUTES.notifications)}
				accessibilityLabel={hasUnread ? 'Avisos, há novos' : 'Avisos'}
			>
				<Bell size={px(18)} color={COLORS.foreground} strokeWidth={1.9} />
				{hasUnread ? (
					<View
						className='absolute rounded-full border-2 border-card bg-accent'
						style={{ top: px(7), right: px(8), width: px(9), height: px(9) }}
					/>
				) : null}
			</IconDisc>
		</View>
	);
}
