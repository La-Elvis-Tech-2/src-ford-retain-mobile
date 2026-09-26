import { View } from 'react-native';
import { useScaler } from '@/theme/scale';
import { STATUS_META } from '../theme';
import type { ComponentStatus } from '../types';

export function LifeBar({ value, status }: { value: number; status: ComponentStatus }) {
	const px = useScaler();
	const clamped = Math.max(0, Math.min(100, value));

	return (
		<View className='overflow-hidden rounded-full bg-muted' style={{ height: px(5) }}>
			<View
				className='h-full rounded-full'
				style={{ width: `${Math.max(clamped, 3)}%`, backgroundColor: STATUS_META[status].color }}
			/>
		</View>
	);
}
