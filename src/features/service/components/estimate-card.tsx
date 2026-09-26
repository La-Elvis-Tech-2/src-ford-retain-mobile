import { Check, ShieldCheck } from 'lucide-react-native';
import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { formatMoney, formatMoneyShort } from '@/lib/format';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';
import { laterMultiplier, packageTotals } from '../schedule';
import type { ServicePackage } from '../types';

/** As duas séries da barra de composição — o azul Ford e um azul claro dele. */
const SERIES = { parts: COLORS.accent, labor: '#9DBFEF' } as const;

/**
 * O orçamento da revisão: o total, do que ele é feito e quanto custa esperar.
 *
 * A composição é UMA barra dividida, sem eixo: peças e mão de obra somam o
 * total, e a legenda traz os valores escritos. É a mesma leitura do site.
 */
export function EstimateCard({ pkg }: { pkg: ServicePackage }) {
	const px = useScaler();
	const { partsCents, laborCents, totalCents } = packageTotals(pkg);
	const partsShare = partsCents / totalCents;

	return (
		<Card style={{ gap: px(14) }}>
			<View style={{ gap: px(2) }}>
				<Text variant='detail'>Preço fechado · {pkg.durationLabel} de serviço</Text>
				<Text variant='score'>{formatMoney(totalCents)}</Text>
			</View>

			<View style={{ gap: px(8) }}>
				<View
					className='flex-row overflow-hidden rounded-full'
					style={{ height: px(8), gap: px(2) }}
					accessible
					accessibilityLabel={`Peças ${formatMoney(partsCents)}, mão de obra ${formatMoney(laborCents)}`}
				>
					<View style={{ flex: partsShare, backgroundColor: SERIES.parts }} />
					<View style={{ flex: 1 - partsShare, backgroundColor: SERIES.labor }} />
				</View>
				<View className='flex-row justify-between' importantForAccessibility='no-hide-descendants'>
					<Legend color={SERIES.parts} label='Peças' value={formatMoneyShort(partsCents)} />
					<Legend color={SERIES.labor} label='Mão de obra' value={formatMoneyShort(laborCents)} />
				</View>
			</View>

			<View className='h-px bg-border' />

			<View style={{ gap: px(8) }}>
				{pkg.services.map((service) => (
					<View key={service} className='flex-row items-start' style={{ gap: px(10) }}>
						<View
							className='items-center justify-center rounded-full bg-accent-soft'
							style={{ width: px(18), height: px(18), marginTop: px(1) }}
						>
							<Check size={px(11)} color={COLORS.accent} strokeWidth={3} />
						</View>
						<Text variant='bodySm' className='flex-1'>
							{service}
						</Text>
					</View>
				))}
			</View>

			<View className='flex-row items-center rounded-2xl bg-negative-soft' style={{ padding: px(12), gap: px(10) }}>
				<Text variant='title' className='text-negative'>
					{laterMultiplier(pkg)}×
				</Text>
				<Text variant='muted' className='flex-1 text-secondary-foreground'>
					mais caro se esperar. {pkg.later.reason}
				</Text>
			</View>

			<View className='flex-row items-center' style={{ gap: px(8) }}>
				<ShieldCheck size={px(16)} color={COLORS.positive} />
				<Text variant='detail' className='flex-1'>
					{pkg.warranty}
				</Text>
			</View>
		</Card>
	);
}

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
	const px = useScaler();

	return (
		<View className='flex-row items-center' style={{ gap: px(6) }}>
			<View className='rounded-full' style={{ width: px(8), height: px(8), backgroundColor: color }} />
			<Text variant='detail'>{label}</Text>
			<Text variant='detail' font='semibold' className='text-foreground'>
				{value}
			</Text>
		</View>
	);
}
