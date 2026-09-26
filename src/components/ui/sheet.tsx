import { type ReactNode, useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';
import { COLORS } from '@/theme/colors';
import { SCREEN_BOTTOM_SPACING, SCREEN_GUTTER } from '@/theme/layout';
import { useScaler } from '@/theme/scale';

export type SheetProps = {
	visible: boolean;
	onClose: () => void;
	children: ReactNode;
};

/** Subida com desaceleração, descida mais curta: fechar é sempre mais rápido que abrir. */
const OPEN = { duration: 280, easing: Easing.out(Easing.cubic) } as const;
const CLOSE = { duration: 200, easing: Easing.in(Easing.cubic) } as const;

/** Opacidade do véu escuro atrás da folha, aberta. */
const SCRIM_OPACITY = 0.4;

/**
 * Folha que sobe do rodapé — a confirmação do agendamento.
 *
 * É o `Modal` do sistema e não uma camada da tela: ele fica por cima da barra
 * de abas, recebe o "voltar" do Android e prende o foco do leitor de tela
 * dentro dele, três coisas que uma `View` absoluta teria que refazer à mão.
 *
 * A animação é NOSSA, e não a `slide` do `Modal`: a do sistema desliza a
 * janela inteira, e o véu escuro subia junto com a folha, como um bloco. Aqui
 * o véu esmaece no lugar e só a folha sobe. Para a descida também animar, o
 * `Modal` continua montado até ela terminar — `visible` falso só dispara a
 * saída.
 *
 * No Android edge-to-edge o `Modal` é translúcido nas DUAS barras do sistema:
 * o véu cobre a tela inteira e a folha desconta a safe area de baixo sozinha.
 */
export function Sheet({ visible, onClose, children }: SheetProps) {
	const px = useScaler();
	const insets = useSafeAreaInsets();
	const { height: windowHeight } = useWindowDimensions();
	const [mounted, setMounted] = useState(visible);
	const progress = useSharedValue(0);

	useEffect(() => {
		if (visible) {
			setMounted(true);
			progress.value = withTiming(1, OPEN);
			return;
		}
		progress.value = withTiming(0, CLOSE, (finished) => {
			if (finished) {
				scheduleOnRN(setMounted, false);
			}
		});
	}, [visible, progress]);

	const scrimStyle = useAnimatedStyle(() => ({ opacity: progress.value * SCRIM_OPACITY }));
	const panelStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: (1 - progress.value) * windowHeight }],
	}));

	return (
		<Modal
			visible={mounted}
			transparent
			animationType='none'
			statusBarTranslucent
			navigationBarTranslucent
			onRequestClose={onClose}
		>
			<View className='flex-1 justify-end'>
				<Animated.View style={[StyleSheet.absoluteFill, styles.scrim, scrimStyle]}>
					<Pressable className='flex-1' onPress={onClose} accessibilityRole='button' accessibilityLabel='Fechar' />
				</Animated.View>
				<Animated.View
					style={[
						styles.panel,
						{
							borderTopLeftRadius: px(24),
							borderTopRightRadius: px(24),
							paddingHorizontal: px(SCREEN_GUTTER + 4),
							paddingTop: px(8),
							paddingBottom: insets.bottom + px(SCREEN_BOTTOM_SPACING),
						},
						panelStyle,
					]}
				>
					<View className='items-center' style={{ marginBottom: px(16) }}>
						<View className='rounded-full bg-muted' style={{ width: px(36), height: px(4) }} />
					</View>
					{children}
				</Animated.View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	// A tinta da marca, e não preto puro: o véu escurece a tela sem apagar o azul.
	scrim: { backgroundColor: COLORS.foreground },
	panel: { backgroundColor: COLORS.card },
});
