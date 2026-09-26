import type { ReactNode } from 'react';
import { View } from 'react-native';
import { PRESS_SCALE } from '@/hooks/use-press-scale';
import { cn } from '@/lib/cn';
import { useScaler } from '@/theme/scale';
import { PressableScale } from './pressable-scale';

export type IconDiscProps = {
	children: ReactNode;
	size?: number;
	onPress?: () => void;
	disabled?: boolean;
	accessibilityLabel?: string;
	className?: string;
};

export function IconDisc({
	children,
	size = 36,
	onPress,
	disabled = false,
	accessibilityLabel,
	className,
}: IconDiscProps) {
	const px = useScaler();
	const style = { width: px(size), height: px(size), borderRadius: px(size) / 2 };
	const classes = cn('items-center justify-center bg-card', className);

	if (!onPress) {
		return (
			<View
				className={classes}
				style={style}
				importantForAccessibility='no-hide-descendants'
				accessibilityElementsHidden
			>
				{children}
			</View>
		);
	}

	return (
		<PressableScale
			scaleTo={PRESS_SCALE.mark}
			onPress={onPress}
			disabled={disabled}
			haptic={disabled ? null : 'tap'}
			accessibilityRole='button'
			accessibilityState={{ disabled }}
			accessibilityLabel={accessibilityLabel}
			hitSlop={8}
			className={classes}
			style={style}
		>
			{children}
		</PressableScale>
	);
}
