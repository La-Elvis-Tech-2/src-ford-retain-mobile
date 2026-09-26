import { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/layout/screen';
import { ScreenScrollView } from '@/components/layout/screen-scroll-view';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { Text } from '@/components/ui/text';
import { ITEM_GAP } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import { SAMPLE_DEALERS, SAMPLE_PACKAGE } from '../data/service';
import { useBookingWithDealer } from '../hooks/use-booking';
import { packageTotals, upcomingSlots } from '../schedule';
import type { ServiceSlot } from '../types';
import { BookedCard } from './booked-card';
import { BookingSheet } from './booking-sheet';
import { DealerOption } from './dealer-option';
import { EstimateCard } from './estimate-card';
import { SlotPicker } from './slot-picker';

export function ServiceScreen() {
	const px = useScaler();
	const scheduled = useBookingWithDealer();
	const [dealerId, setDealerId] = useState(SAMPLE_DEALERS[0]?.id ?? '');
	const [slot, setSlot] = useState<ServiceSlot | null>(null);
	const [confirming, setConfirming] = useState(false);

	const dealer = SAMPLE_DEALERS.find((candidate) => candidate.id === dealerId) ?? SAMPLE_DEALERS[0];
	const slots = useMemo(() => (dealer ? upcomingSlots(dealer, new Date()) : []), [dealer]);
	const { totalCents } = packageTotals(SAMPLE_PACKAGE);

	const closeSheet = () => {
		setConfirming(false);
		if (scheduled) {
			setSlot(null);
		}
	};

	const chooseDealer = (id: string) => {
		setDealerId(id);
		setSlot(null);
	};

	return (
		<Screen>
			<ScreenScrollView withTabBar>
				<View style={{ gap: px(4) }}>
					<Text variant='hero' accessibilityRole='header'>
						{SAMPLE_PACKAGE.title}
					</Text>
					<Text variant='muted'>{SAMPLE_PACKAGE.subtitle}</Text>
				</View>

				{scheduled ? <BookedCard booking={scheduled.booking} dealer={scheduled.dealer} /> : null}

				<EstimateCard pkg={SAMPLE_PACKAGE} />

				{scheduled || !dealer ? null : (
					<>
						<View style={{ gap: px(ITEM_GAP) }}>
							<SectionHeader title='Onde fazer' subtitle='O tempo a mais é o desvio da sua rota diária.' />
							<View style={{ gap: px(8) }} accessibilityRole='radiogroup'>
								{SAMPLE_DEALERS.map((option) => (
									<DealerOption
										key={option.id}
										dealer={option}
										selected={option.id === dealer.id}
										onPress={() => chooseDealer(option.id)}
									/>
								))}
							</View>
						</View>

						<View style={{ gap: px(ITEM_GAP) }}>
							<SectionHeader title='Quando' subtitle={`Horários com vaga na ${dealer.name}.`} />
							<SlotPicker slots={slots} selectedId={slot?.id ?? null} onSelect={setSlot} />
						</View>

						<Button
							size='lg'
							label={slot ? `Agendar na ${dealer.name}` : 'Escolha um horário'}
							disabled={!slot}
							onPress={() => setConfirming(true)}
						/>
					</>
				)}
			</ScreenScrollView>

			{dealer ? (
				<BookingSheet
					visible={confirming}
					dealer={dealer}
					slot={slot}
					totalCents={totalCents}
					durationLabel={SAMPLE_PACKAGE.durationLabel}
					onClose={closeSheet}
				/>
			) : null}
		</Screen>
	);
}
