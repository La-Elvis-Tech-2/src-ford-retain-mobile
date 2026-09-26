import type { ReactNode } from 'react';
import { View } from 'react-native';
import { PRESS_SCALE } from '@/hooks/use-press-scale';
import { cn } from '@/lib/cn';
import { useScaler } from '@/theme/scale';
import { PressableScale } from './pressable-scale';

export type IconDiscProps = {
	children: ReactNode;
	/** Diâmetro em pontos do layout. */
	size?: number;
	/** Sem `onPress` o disco é só desenho, e sai do leitor de tela. */
	onPress?: () => void;
	/** Continua no leitor de tela como botão, anunciado como indisponível. */
	disabled?: boolean;
	accessibilityLabel?: string;
	className?: string;
};

/**
 * Disco com um glifo no meio: o sino do topo, o voltar das telas de pilha, o
 * envio do chat.
 */
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
