import { useRouter } from 'expo-router';
import { Bell, ChevronRight, LogOut, MapPin, ShieldCheck, Wrench } from 'lucide-react-native';
import { type ReactNode, useState } from 'react';
import { Switch, View } from 'react-native';
import { Screen } from '@/components/layout/screen';
import { ScreenScrollView } from '@/components/layout/screen-scroll-view';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PressableScale } from '@/components/ui/pressable-scale';
import { QueryState } from '@/components/ui/query-state';
import { SectionHeader } from '@/components/ui/section-header';
import { Text } from '@/components/ui/text';
import { useCurrentUser, useSignOut } from '@/features/auth/hooks/use-session';
import { useBookingWithDealer } from '@/features/service/hooks/use-booking';
import { useHealthReport } from '@/features/vehicle/hooks/use-health-report';
import { formatKm, formatMoneyShort } from '@/lib/format';
import { haptic } from '@/lib/haptics';
import { ROUTES } from '@/routes/routes';
import { COLORS } from '@/theme/colors';
import { ITEM_GAP } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import { SAMPLE_HISTORY } from '../data/history';
import { VehicleCard } from './vehicle-card';

/** Uma linha de ajuste: ícone, título, apoio e a peça da direita. */
function SettingRow({
	icon,
	title,
	detail,
	trailing,
	onPress,
}: {
	icon: ReactNode;
	title: string;
	detail?: string;
	trailing?: ReactNode;
	onPress?: () => void;
}) {
	const px = useScaler();

	return (
		<PressableScale
			onPress={onPress}
			disabled={!onPress}
			haptic={onPress ? 'tap' : null}
			accessibilityRole={onPress ? 'button' : undefined}
			className='flex-row items-center'
			style={{ paddingHorizontal: px(14), paddingVertical: px(12), gap: px(12) }}
		>
			<View className='items-center justify-center rounded-full bg-secondary' style={{ width: px(32), height: px(32) }}>
				{icon}
			</View>
			<View className='flex-1'>
				<Text variant='body' font='medium' numberOfLines={1}>
					{title}
				</Text>
				{detail ? <Text variant='detail'>{detail}</Text> : null}
			</View>
			{trailing ?? (onPress ? <ChevronRight size={px(18)} color={COLORS.subtleForeground} /> : null)}
		</PressableScale>
	);
}

/**
 * O perfil: a pessoa, o carro, o histórico na rede e os ajustes. É a aba com a
 * foto (aqui, as iniciais) na barra.
 */
export function ProfileScreen() {
	const px = useScaler();
	const router = useRouter();
	const user = useCurrentUser();
	const signOut = useSignOut();
	const query = useHealthReport();
	const scheduled = useBookingWithDealer();
	const [alerts, setAlerts] = useState(true);
	const [leaving, setLeaving] = useState(false);
	const report = query.data;

	const leave = async () => {
		setLeaving(true);
		await signOut();
	};

	return (
		<Screen>
			<ScreenScrollView withTabBar>
				<View className='flex-row items-center' style={{ gap: px(12) }}>
					<Avatar name={user?.name ?? ''} size={52} />
					<View className='flex-1'>
						<Text variant='title' accessibilityRole='header'>
							{user?.name ?? 'Sua conta'}
						</Text>
						<Text variant='muted'>Cliente Ford desde 2023</Text>
					</View>
				</View>

				{report ? (
					<>
						<VehicleCard vehicle={report.vehicle} />

						<Card className='flex-row items-center bg-positive-soft' style={{ gap: px(12) }}>
							<ShieldCheck size={px(24)} color={COLORS.positive} strokeWidth={1.75} />
							<View className='flex-1'>
								<Text variant='body' font='semibold' className='text-positive'>
									{report.provenance.badge}
								</Text>
								<Text variant='muted' className='text-secondary-foreground'>
									Até +{formatMoneyShort(report.provenance.resaleGainCents)} na revenda com as revisões em dia.
								</Text>
							</View>
						</Card>
					</>
				) : (
					<QueryState error={query.error} onRetry={() => void query.refetch()} />
				)}

				<View style={{ gap: px(ITEM_GAP) }}>
					<SectionHeader
						title='Histórico na rede'
						subtitle={`${SAMPLE_HISTORY.length} serviços registrados no chassi`}
					/>
					<Card flush>
						{SAMPLE_HISTORY.map((record, index) => (
							<View key={record.id}>
								{index > 0 ? <View className='h-px bg-border' style={{ marginLeft: px(58) }} /> : null}
								<SettingRow
									icon={<Wrench size={px(15)} color={COLORS.primary} />}
									title={record.title}
									detail={`${record.dateLabel} · ${formatKm(record.km)} · ${record.dealer}`}
								/>
							</View>
						))}
					</Card>
				</View>

				<View style={{ gap: px(ITEM_GAP) }}>
					<SectionHeader title='Ajustes' />
					<Card flush>
						<SettingRow
							icon={<Bell size={px(15)} color={COLORS.primary} />}
							title='Alertas do carro'
							detail='Avisar antes de um item vencer'
							trailing={
								<Switch
									value={alerts}
									onValueChange={(value) => {
										haptic('select');
										setAlerts(value);
									}}
									trackColor={{ true: COLORS.accent, false: COLORS.muted }}
									thumbColor={COLORS.white}
									accessibilityLabel='Alertas do carro'
								/>
							}
						/>
						<View className='h-px bg-border' style={{ marginLeft: px(58) }} />
						<SettingRow
							icon={<MapPin size={px(15)} color={COLORS.primary} />}
							title='Concessionária'
							detail={scheduled ? `Visita marcada na ${scheduled.dealer.name}` : 'Escolher na próxima revisão'}
							onPress={() => router.navigate(ROUTES.service)}
						/>
					</Card>
				</View>

				<Button
					variant='outline'
					label='Desconectar veículo'
					icon={<LogOut size={px(15)} color={COLORS.primary} />}
					loading={leaving}
					onPress={leave}
				/>
			</ScreenScrollView>
		</Screen>
	);
}
