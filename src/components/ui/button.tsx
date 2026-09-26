import { type ReactNode, useCallback, useMemo } from 'react';
import {
	ActivityIndicator,
	type GestureResponderEvent,
	Platform,
	Pressable,
	type PressableProps,
	type StyleProp,
	type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { usePressScale } from '@/hooks/use-press-scale';
import { cn } from '@/lib/cn';
import { type HapticIntent, haptic } from '@/lib/haptics';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';
import { Text } from './text';

/**
 * Os botões do ford.com: pílula cheia no Ford Blue para a ação principal e
 * pílula vazada com borda no mesmo azul para a secundária. `secondary` é a
 * pílula cinza ("Compartilhar"); `ghost` é o texto solto ao lado dela
 * ("Ocultar").
 */
const CONTAINER_VARIANTS = {
	primary: 'bg-primary',
	secondary: 'bg-secondary',
	outline: 'border-[1.5px] border-primary bg-card',
	ghost: 'bg-transparent',
} as const;

const LABEL_VARIANTS = {
	primary: 'text-primary-foreground',
	secondary: 'text-primary',
	outline: 'text-primary',
	ghost: 'text-muted-foreground',
} as const;

/** Cor do ripple do Android por variante (o iOS usa opacidade no lugar). */
const RIPPLE_COLOR = {
	primary: 'rgba(255, 255, 255, 0.18)',
	secondary: 'rgba(0, 9, 91, 0.08)',
	outline: 'rgba(0, 9, 91, 0.08)',
	ghost: 'rgba(0, 9, 91, 0.08)',
} as const;

/** O spinner não lê classe do tema, então a cor vem casada com o rótulo. */
const SPINNER_COLOR = {
	primary: COLORS.primaryForeground,
	secondary: COLORS.primary,
	outline: COLORS.primary,
	ghost: COLORS.mutedForeground,
} as const;

/**
 * Pílulas: raio igual à metade da altura. `md` é o alvo mínimo de toque (44);
 * `lg` é a ação que fecha uma tela ("Conectar", "Agendar"). `sm` fica abaixo
 * do mínimo de propósito — só para ação que não é a principal do bloco (os
 * dois botões do cartão de procedência) — e ganha área de toque no `hitSlop`.
 */
const SIZES = {
	sm: { height: 32, paddingHorizontal: 14 },
	md: { height: 44, paddingHorizontal: 18 },
	lg: { height: 50, paddingHorizontal: 22 },
} as const;

const ICON_GAP = 6;

export type ButtonVariant = keyof typeof CONTAINER_VARIANTS;
export type ButtonSize = keyof typeof SIZES;

export type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
	label: string;
	/** Glifo antes do rótulo, já no tamanho e na cor certos. */
	icon?: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	/** `null` onde a tela já dispara a sua própria vibração. */
	haptic?: HapticIntent | null;
	className?: string;
	style?: StyleProp<ViewStyle>;
};

/**
 * Botão do app: "smoosh" de `usePressScale`, retorno nativo (ripple no
 * Android, opacidade no iOS) e vibração no press-in.
 *
 * O `style` é ARRAY, nunca a forma de função do Pressable: com `className` na
 * mesma tag, o NativeWind descarta a função em silêncio.
 */
export function Button({
	label,
	icon,
	variant = 'primary',
	size = 'md',
	loading = false,
	haptic: intent = 'tap',
	disabled,
	className,
	style,
	onPressIn,
	onPressOut,
	...props
}: ButtonProps) {
	const px = useScaler();
	const { height, paddingHorizontal } = SIZES[size];
	const isDisabled = disabled === true || loading;
	const scale = usePressScale();

	const handlePressIn = useCallback(
		(event: GestureResponderEvent) => {
			if (intent !== null) {
				haptic(intent);
			}
			scale.onPressIn();
			onPressIn?.(event);
		},
		[intent, scale, onPressIn],
	);

	const handlePressOut = useCallback(
		(event: GestureResponderEvent) => {
			scale.onPressOut();
			onPressOut?.(event);
		},
		[scale, onPressOut],
	);

	const sizeStyle = useMemo<ViewStyle>(
		() => ({
			height: px(height),
			paddingHorizontal: variant === 'ghost' ? px(8) : px(paddingHorizontal),
			borderRadius: px(height) / 2,
			gap: px(ICON_GAP),
		}),
		[px, height, paddingHorizontal, variant],
	);

	return (
		<Animated.View style={scale.style}>
			<Pressable
				accessibilityRole='button'
				accessibilityState={{ disabled: isDisabled, busy: loading }}
				disabled={isDisabled}
				hitSlop={size === 'sm' ? 6 : undefined}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				android_ripple={isDisabled ? undefined : { color: RIPPLE_COLOR[variant], foreground: true }}
				className={cn(
					'flex-row items-center justify-center overflow-hidden',
					CONTAINER_VARIANTS[variant],
					Platform.OS === 'ios' && 'active:opacity-90',
					isDisabled && 'opacity-50',
					className,
				)}
				style={[sizeStyle, style]}
				{...props}
			>
				{loading ? (
					<ActivityIndicator size='small' color={SPINNER_COLOR[variant]} />
				) : (
					<>
						{icon}
						<Text
							variant='label'
							numberOfLines={1}
							// A altura do botão é fixa: o rótulo não tem para onde crescer.
							maxFontSizeMultiplier={1.2}
							className={LABEL_VARIANTS[variant]}
						>
							{label}
						</Text>
					</>
				)}
			</Pressable>
		</Animated.View>
	);
}
