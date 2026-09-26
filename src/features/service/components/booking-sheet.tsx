import { CircleCheck } from 'lucide-react-native';
import { View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { Button } from '@/components/ui/button';
import { Sheet } from '@/components/ui/sheet';
import { Text } from '@/components/ui/text';
import { formatMoney } from '@/lib/format';
import { haptic } from '@/lib/haptics';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';
import { useBookService } from '../hooks/use-booking';
import { slotSentence } from '../schedule';
import type { Dealer, ServiceSlot } from '../types';
import { BookingSummary } from './booking-summary';

export type BookingSheetProps = {
	visible: boolean;
	dealer: Dealer;
	slot: ServiceSlot | null;
	totalCents: number;
	durationLabel: string;
	onClose: () => void;
};

/**
 * A confirmação do agendamento, em duas fases na MESMA folha: o resumo com o
 * "Confirmar" e, com a resposta, o "Agendado". Trocar de folha no meio faria a
 * tela piscar justo no momento em que a pessoa está conferindo o que fez.
 */
export function BookingSheet({ visible, dealer, slot, totalCents, durationLabel, onClose }: BookingSheetProps) {
	const px = useScaler();
	const book = useBookService();
	const done = book.isSuccess;

	const close = () => {
		book.reset();
		onClose();
	};

	const confirm = () => {
		if (!slot) {
			return;
		}
		book.mutate(
			{ dealerId: dealer.id, slot, totalCents },
			{
				onSuccess: () => haptic('success'),
				onError: () => haptic('error'),
			},
		);
	};

	return (
		<Sheet visible={visible} onClose={close}>
			{done && slot ? (
				<View className='items-center' style={{ gap: px(12) }}>
					<Animated.View entering={ZoomIn.springify().damping(14)}>
						<CircleCheck size={px(48)} color={COLORS.positive} strokeWidth={1.75} />
					</Animated.View>
					{/*
					 * `self-stretch`: centrado na largura do próprio texto, o Android
					 * perdia um pixel no arredondamento e mandava o "marcada" para uma
					 * segunda linha cortada. Na largura da folha isso não acontece.
					 */}
					<Text variant='title' className='self-stretch text-center'>
						Visita marcada
					</Text>
					<Text variant='muted' className='self-stretch text-center'>
						{dealer.name}, {slotSentence(slot)}. A gente te lembra na véspera, e o laudo vai junto para a oficina.
					</Text>
					<View className='w-full' style={{ paddingTop: px(8) }}>
						<Button label='Fechar' onPress={close} haptic={null} />
					</View>
				</View>
			) : (
				<View style={{ gap: px(16) }}>
					<Text variant='title'>Confira sua visita</Text>
					<BookingSummary
						rows={[
							{ label: 'Concessionária', value: dealer.name },
							{ label: 'Quando', value: slot ? slotSentence(slot) : '—' },
							{ label: 'Duração', value: durationLabel },
							{ label: 'Total', value: formatMoney(totalCents) },
						]}
					/>
					{book.isError ? <Text variant='danger'>Não deu para reservar esse horário. Tente outro.</Text> : null}
					<View style={{ gap: px(8) }}>
						<Button label='Confirmar agendamento' onPress={confirm} loading={book.isPending} size='lg' />
						<Button label='Voltar' variant='ghost' onPress={close} disabled={book.isPending} />
					</View>
				</View>
			)}
		</Sheet>
	);
}
