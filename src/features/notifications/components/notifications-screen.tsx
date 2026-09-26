import { useFocusEffect, useRouter } from 'expo-router';
import { Bell, type LucideIcon, Tag, TriangleAlert, Wrench } from 'lucide-react-native';
import { useCallback } from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { ScreenScrollView } from '@/components/layout/screen-scroll-view';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { COLORS } from '@/theme/colors';
import { CARD_RADIUS, ITEM_GAP } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import { useNotificationsStore } from '../stores/notifications-store';
import type { AppNotification, NotificationKind } from '../types';

const KIND_META: Record<NotificationKind, { Icon: LucideIcon; color: string; soft: string }> = {
	alert: { Icon: TriangleAlert, color: COLORS.negative, soft: COLORS.negativeSoft },
	service: { Icon: Wrench, color: COLORS.accent, soft: COLORS.accentSoft },
	offer: { Icon: Tag, color: COLORS.positive, soft: COLORS.positiveSoft },
};

function NotificationRow({ item }: { item: AppNotification }) {
	const px = useScaler();
	const router = useRouter();
	const meta = KIND_META[item.kind];

	return (
		<PressableScale
			onPress={() => {
				if (item.target) {
					router.push(item.target);
				}
			}}
			disabled={!item.target}
			accessibilityRole={item.target ? 'button' : 'text'}
			className='flex-row items-start bg-card'
			style={{ borderRadius: px(CARD_RADIUS), padding: px(14), gap: px(12) }}
		>
			<View
				className='items-center justify-center rounded-full'
				style={{ width: px(36), height: px(36), backgroundColor: meta.soft }}
			>
				<meta.Icon size={px(17)} color={meta.color} />
			</View>
			<View className='flex-1' style={{ gap: px(2) }}>
				<View className='flex-row items-baseline justify-between' style={{ gap: px(8) }}>
					<Text variant='body' font='semibold' className='flex-1'>
						{item.title}
					</Text>
					<Text variant='detail'>{item.timeLabel}</Text>
				</View>
				<Text variant='muted'>{item.body}</Text>
			</View>
		</PressableScale>
	);
}

export function NotificationsScreen() {
	const px = useScaler();
	const items = useNotificationsStore((state) => state.items);
	const markAllRead = useNotificationsStore((state) => state.markAllRead);

	useFocusEffect(
		useCallback(() => {
			markAllRead();
		}, [markAllRead]),
	);

	return (
		<Screen>
			<ScreenScrollView>
				<ScreenHeader title='Avisos' />
				{items.length === 0 ? (
					<View className='items-center' style={{ gap: px(8), paddingVertical: px(48) }}>
						<Bell size={px(28)} color={COLORS.subtleForeground} />
						<Text variant='muted' className='self-stretch text-center'>
							Nenhum aviso por enquanto.
						</Text>
					</View>
				) : (
					<View style={{ gap: px(ITEM_GAP) }}>
						{items.map((item) => (
							<NotificationRow key={item.id} item={item} />
						))}
					</View>
				)}
			</ScreenScrollView>
		</Screen>
	);
}
