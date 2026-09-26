import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { View } from 'react-native';
import { BrandMark } from '@/components/brand/brand-mark';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { useBookingWithDealer } from '@/features/service/hooks/use-booking';
import { slotSentence } from '@/features/service/schedule';
import type { Insight } from '@/features/vehicle/types';
import { ROUTES } from '@/routes/routes';
import { COLORS } from '@/theme/colors';
import { CARD_RADIUS } from '@/theme/layout';
import { useScaler } from '@/theme/scale';

/**
 * A frase do assistente embaixo do orbe — o "Mira бачить" do layout, num
 * azul-gelo chapado da marca.
 *
 * Ela muda com a visita: antes de marcar, é o que o assistente percebeu e o
 * convite para a revisão; depois, é o lembrete da visita marcada. As duas
 * levam à aba da revisão.
 */
export function InsightCard({ insight }: { insight: Insight }) {
	const px = useScaler();
	const router = useRouter();
	const scheduled = useBookingWithDealer();

	const lead = scheduled ? 'Visita marcada.' : insight.lead;
	const body = scheduled
		? `${scheduled.dealer.name}, ${slotSentence(scheduled.booking.slot)}. O laudo já está com a oficina, é só levar a Ranger.`
		: insight.body;
	const cta = scheduled ? 'Ver detalhes da visita' : 'Ver revisão recomendada';

	return (
		<PressableScale
			onPress={() => router.navigate(ROUTES.service)}
			accessibilityRole='button'
			accessibilityLabel={`${lead} ${body}`}
			accessibilityHint={cta}
			className='bg-accent-soft'
			style={{ borderRadius: px(CARD_RADIUS), padding: px(14), gap: px(8) }}
		>
			<View className='flex-row items-start' style={{ gap: px(10) }}>
				{/* O selo do Ford Assist: quem fala aqui é o assistente do app. */}
				<View style={{ paddingTop: px(1) }}>
					<BrandMark size={px(18)} />
				</View>
				<Text variant='bodySm' className='flex-1 text-secondary-foreground'>
					<Text variant='bodySm' font='semibold'>
						{lead}{' '}
					</Text>
					{body}
				</Text>
			</View>

			<View className='flex-row items-center' style={{ gap: px(2), paddingLeft: px(28) }}>
				<Text variant='muted' font='semibold' className='text-accent'>
					{cta}
				</Text>
				<ChevronRight size={px(15)} color={COLORS.accent} strokeWidth={2.25} />
			</View>
		</PressableScale>
	);
}
