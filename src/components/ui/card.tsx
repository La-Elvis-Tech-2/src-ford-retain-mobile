import { type ReactNode, useMemo } from 'react';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { cn } from '@/lib/cn';
import { CARD_PADDING, CARD_RADIUS } from '@/theme/layout';
import { useScaler } from '@/theme/scale';

export type CardProps = {
	children: ReactNode;
	flush?: boolean;
	className?: string;
	style?: StyleProp<ViewStyle>;
};

export function Card({ children, flush = false, className, style }: CardProps) {
	const px = useScaler();

	const cardStyle = useMemo<ViewStyle>(
		() => ({ padding: flush ? 0 : px(CARD_PADDING), borderRadius: px(CARD_RADIUS) }),
		[px, flush],
	);

	return (
		<View className={cn('overflow-hidden bg-card', className)} style={[cardStyle, style]}>
			{children}
		</View>
	);
}
