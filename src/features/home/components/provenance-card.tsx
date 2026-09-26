import { Image, Share, View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { Provenance, Vehicle } from '@/features/vehicle/types';
import { formatKm, formatMoneyShort } from '@/lib/format';
import { useScaler } from '@/theme/scale';
import { useHomeStore } from '../stores/home-store';

const RANGER = require('../../../../assets/images/ford-ranger-640.png');

/**
 * O cartão de procedência — o "Поділися турботою" do layout, com a foto à
 * esquerda e as duas ações embaixo do texto.
 *
 * É a peça de retenção mais direta do app: mostra quanto a manutenção NA REDE
 * vale na revenda, e o "Compartilhar" manda o laudo para quem for comprar o
 * carro.
 */
export function ProvenanceCard({ vehicle, provenance }: { vehicle: Vehicle; provenance: Provenance }) {
	const px = useScaler();
	const hide = useHomeStore((state) => state.hideProvenance);
	const gain = formatMoneyShort(provenance.resaleGainCents);

	const share = () => {
		Share.share({
			message: `${vehicle.model} ${vehicle.year}, ${provenance.badge}: ${provenance.servicesInNetwork} revisões registradas na rede Ford, placa ${vehicle.maskedPlate}, ${formatKm(vehicle.km)}.`,
		}).catch(() => {
			// A folha do sistema fechou sem compartilhar, ou não abriu: nada a fazer.
		});
	};

	return (
		<Card className='flex-row' style={{ gap: px(14) }}>
			{/*
			 * A foto é um RECORTE da frente da Ranger: a imagem é larga (1,9:1) e,
			 * inteira numa caixa estreita, o carro virava um risco. Ancorada à
			 * direita e maior que a caixa, sobra a grade e o farol — o lado do
			 * carro que a foto mostra de frente.
			 */}
			<View className='overflow-hidden bg-accent-soft' style={{ width: px(96), borderRadius: px(16) }}>
				<Image
					source={RANGER}
					resizeMode='contain'
					style={{ position: 'absolute', right: -px(9), bottom: px(12), width: px(176), height: px(93) }}
					accessibilityIgnoresInvertColors
					accessibilityLabel={`Foto ilustrativa da ${vehicle.model}`}
				/>
			</View>

			<View className='flex-1' style={{ gap: px(10) }}>
				<Text variant='bodySm' className='text-muted-foreground'>
					<Text variant='bodySm' font='semibold'>
						Seu histórico vale dinheiro.{' '}
					</Text>
					{provenance.servicesInNetwork} revisões na rede somam até +{gain} na revenda. Compartilhe com quem for
					comprar.
				</Text>
				<View className='flex-row flex-wrap items-center' style={{ gap: px(4) }}>
					<Button size='sm' variant='secondary' label='Compartilhar' onPress={share} />
					<Button size='sm' variant='ghost' label='Ocultar' onPress={hide} />
				</View>
			</View>
		</Card>
	);
}
