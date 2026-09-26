import { View } from 'react-native';
import { useScaler } from '@/theme/scale';
import { STATUS_META } from '../theme';
import type { ComponentStatus } from '../types';

/**
 * A nota do componente em barra, de 0 a 100. Sem eixo e sem marcas: o número
 * está escrito ao lado, e a barra só dá a ordem de grandeza de relance.
 */
export function LifeBar({ value, status }: { value: number; status: ComponentStatus }) {
	const px = useScaler();
	const clamped = Math.max(0, Math.min(100, value));

	return (
		<View className='overflow-hidden rounded-full bg-muted' style={{ height: px(5) }}>
			<View
				className='h-full rounded-full'
				// Um toco mínimo para o zero não parecer barra vazia por erro.
				style={{ width: `${Math.max(clamped, 3)}%`, backgroundColor: STATUS_META[status].color }}
			/>
		</View>
	);
}
