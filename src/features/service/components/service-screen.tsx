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

/**
 * A aba da revisão — o laudo virando visita: o orçamento, a concessionária no
 * caminho e o horário.
 *
 * A primeira concessionária vem escolhida (a de menor desvio), e o horário
 * NÃO: marcar um horário é a decisão que a pessoa precisa tomar, e um
 * pré-selecionado viraria agendamento por descuido.
 */
export function ServiceScreen() {
	const px = useScaler();
	const scheduled = useBookingWithDealer();
	const [dealerId, setDealerId] = useState(SAMPLE_DEALERS[0]?.id ?? '');
	const [slot, setSlot] = useState<ServiceSlot | null>(null);
	const [confirming, setConfirming] = useState(false);

	const dealer = SAMPLE_DEALERS.find((candidate) => candidate.id === dealerId) ?? SAMPLE_DEALERS[0];
	// A agenda conta a partir de hoje; recalcula só quando a concessionária muda.
	const slots = useMemo(() => (dealer ? upcomingSlots(dealer, new Date()) : []), [dealer]);
	const { totalCents } = packageTotals(SAMPLE_PACKAGE);

	const closeSheet = () => {
		setConfirming(false);
		// Com a visita marcada, o horário escolhido já virou reserva: quem
		// remarcar começa do zero.
		if (scheduled) {
			setSlot(null);
		}
	};

	const chooseDealer = (id: string) => {
		setDealerId(id);
		// O horário é da concessionária: trocar uma invalida o outro.
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

			{/*
			 * Fora do bloco de escolha de propósito: a reserva confirmada troca o
			 * bloco pelo cartão da visita, e a folha precisa continuar montada
			 * para mostrar o "Visita marcada".
			 */}
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
