import { Image, View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { Vehicle } from '@/features/vehicle/types';
import { formatKm } from '@/lib/format';
import { useScaler } from '@/theme/scale';

const RANGER = require('../../../../assets/images/ford-ranger.png');
const PHOTO_RATIO = 539 / 1024;
const PHOTO_WIDTH = 248;

/** O carro da conta: a foto, o modelo e a ficha em quatro campos. */
export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
	const px = useScaler();
	const specs = [
		{ label: 'Ano', value: String(vehicle.year) },
		{ label: 'Cor', value: vehicle.color },
		{ label: 'Placa', value: vehicle.maskedPlate },
		{ label: 'Quilometragem', value: formatKm(vehicle.km) },
	];

	return (
		<Card style={{ gap: px(12) }}>
			<View className='items-center rounded-2xl bg-background' style={{ paddingVertical: px(10) }}>
				<Image
					source={RANGER}
					resizeMode='contain'
					// Medidas explícitas, na proporção do arquivo (1024x539): largura em %
					// com `aspectRatio` fazia a caixa crescer até a altura nativa da foto.
					style={{ width: px(PHOTO_WIDTH), height: px(PHOTO_WIDTH * PHOTO_RATIO) }}
					accessibilityIgnoresInvertColors
					accessibilityLabel={`Foto ilustrativa da ${vehicle.model}`}
				/>
			</View>
			<View style={{ gap: px(2) }}>
				<Text variant='title'>{vehicle.model}</Text>
				<Text variant='detail'>{vehicle.kmSource}</Text>
			</View>
			<View className='flex-row flex-wrap' style={{ rowGap: px(10) }}>
				{specs.map((spec) => (
					<View key={spec.label} style={{ width: '50%', gap: px(2) }}>
						<Text variant='detail'>{spec.label}</Text>
						<Text variant='body' font='semibold'>
							{spec.value}
						</Text>
					</View>
				))}
			</View>
		</Card>
	);
}
