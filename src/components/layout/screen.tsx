import type { ReactNode } from 'react';
import { View } from 'react-native';
import { type Edge, useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '@/lib/cn';
import { COLORS } from '@/theme/colors';
import { SCREEN_GUTTER } from '@/theme/layout';
import { useScaler } from '@/theme/scale';

const ALL_EDGES: readonly Edge[] = ['top', 'right', 'bottom', 'left'];

export type ScreenProps = {
	children: ReactNode;
	className?: string;
	edges?: readonly Edge[];
	bleed?: boolean;
	statusBarColor?: string;
};

export function Screen({
	children,
	className,
	edges = ALL_EDGES,
	bleed = false,
	statusBarColor = COLORS.background,
}: ScreenProps) {
	const px = useScaler();
	const insets = useSafeAreaInsets();
	const gutter = bleed ? 0 : px(SCREEN_GUTTER);
	const left = edges.includes('left') ? insets.left : 0;
	const right = edges.includes('right') ? insets.right : 0;

	return (
		<View className='flex-1 bg-background'>
			{edges.includes('top') ? <View style={{ height: insets.top, backgroundColor: statusBarColor }} /> : null}
			<View className={cn('flex-1', className)} style={{ paddingLeft: left + gutter, paddingRight: right + gutter }}>
				{children}
			</View>
			{edges.includes('bottom') ? <View style={{ height: insets.bottom }} /> : null}
		</View>
	);
}
