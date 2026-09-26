import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';
import { useScaler } from '@/theme/scale';
import { STATUS_META } from '../theme';
import type { ComponentStatus } from '../types';

export function StatusBadge({ status, label }: { status: ComponentStatus; label?: string }) {
	const px = useScaler();
	const meta = STATUS_META[status];

	return (
		<View
			className={cn('flex-row items-center self-start rounded-full', meta.softClass)}
			style={{ gap: px(4), paddingHorizontal: px(8), paddingVertical: px(3) }}
		>
			<meta.Icon size={px(12)} color={meta.color} strokeWidth={2.25} />
			<Text variant='caption' font='semibold' className={cn('shrink', meta.textClass)}>
				{label ?? meta.label}
			</Text>
		</View>
	);
}
