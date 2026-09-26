import { CalendarCheck } from 'lucide-react-native';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { formatMoney } from '@/lib/format';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';
import { useCancelBooking } from '../hooks/use-booking';
import { slotSentence } from '../schedule';
import type { Booking, Dealer } from '../types';
import { BookingSummary } from './booking-summary';

export function BookedCard({ booking, dealer }: { booking: Booking; dealer: Dealer }) {
	const px = useScaler();
	const cancel = useCancelBooking();

	return (
		<Card style={{ gap: px(12) }}>
			<View className='flex-row items-center' style={{ gap: px(12) }}>
				<View
					className='items-center justify-center rounded-full bg-positive-soft'
					style={{ width: px(40), height: px(40) }}
				>
					<CalendarCheck size={px(20)} color={COLORS.positive} />
				</View>
				<View className='flex-1'>
					<Text variant='subtitle'>Visita marcada</Text>
					<Text variant='muted'>{dealer.address}</Text>
				</View>
			</View>
			<BookingSummary
				rows={[
					{ label: 'Concessionária', value: dealer.name },
					{ label: 'Quando', value: slotSentence(booking.slot) },
					{ label: 'Total', value: formatMoney(booking.totalCents) },
				]}
			/>
			<Button label='Remarcar' variant='outline' loading={cancel.isPending} onPress={() => cancel.mutate(booking.id)} />
		</Card>
	);
}
