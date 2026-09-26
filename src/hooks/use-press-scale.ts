import { useCallback } from 'react';
import { Easing, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';

/**
 * Quanto o controle encolhe sob o dedo — DOIS níveis, e a diferença não é
 * gosto: é geometria.
 *
 * A escala é uma fração, então o movimento em pontos cresce com o tamanho do
 * alvo. Os mesmos 4% que davam 2pt em um botão de 44 davam 14pt em um cartão
 * de opção de 340 de largura: o mesmo número, e um encolhe de leve enquanto o
 * outro despenca. Superfície grande usa fração menor para o DESLOCAMENTO ficar
 * parecido.
 */
export const PRESS_SCALE = {
	/**
	 * Alvo pequeno e quase quadrado — o disco de voltar, o seletor de foto.
	 * Fração MAIOR porque em 36pt qualquer coisa menor não se vê.
	 */
	mark: 0.94,
	/** Botões. Este é o ponto de referência do app; os outros dois giram em volta. */
	control: 0.975,
	/** Cartões e linhas largas — opções do quiz e da configuração, lições. */
	surface: 0.982,
} as const;

const PRESSED_SCALE = PRESS_SCALE.control;

/**
 * A descida acompanha o dedo, mas com curva: 90ms em linha reta chegava seca
 * demais no fim. `Easing.out` tira a batida sem atrasar o começo.
 */
const PRESS_IN = { duration: 120, easing: Easing.out(Easing.quad) } as const;

/**
 * A volta segura um instante embaixo antes de subir. É esse atraso curto que dá
 * o peso do gesto — sem ele o botão volta no mesmo quadro do toque e o efeito
 * some em toques rápidos, que são a maioria.
 */
const RELEASE_DELAY = 60;

/** Mola macia, sem estouro: o botão assenta no lugar em vez de quicar. */
const PRESS_OUT = { damping: 18, stiffness: 170, mass: 0.6 } as const;

/**
 * O "smoosh" dos controles do app: encolhe no toque e volta com mola.
 *
 * A animação roda inteira na thread de UI (Reanimated), então o botão responde
 * na hora mesmo com a thread de JS ocupada — que é exatamente o momento em que
 * ela costuma estar, já que o toque em geral dispara requisição ou navegação.
 *
 * Quem usa aplica `style` em um `Animated.View` POR FORA do `Pressable` e passa
 * os dois handlers para ele. O wrapper existe porque a escala precisa ficar
 * fora do controle que tem `className` e medidas: assim o transform não disputa
 * o `style` com o NativeWind nem com a altura fixa do botão.
 *
 * Acessibilidade: o Reanimated respeita "reduzir movimento" do sistema sozinho
 * e salta direto para o valor final — quem pediu menos animação não recebe
 * escala nenhuma, sem nada a mais aqui.
 */
export function usePressScale(pressedScale: number = PRESSED_SCALE) {
	const progress = useSharedValue(0);

	const style = useAnimatedStyle(() => ({
		transform: [{ scale: 1 + (pressedScale - 1) * progress.value }],
	}));

	const onPressIn = useCallback(() => {
		progress.value = withTiming(1, PRESS_IN);
	}, [progress]);

	const onPressOut = useCallback(() => {
		progress.value = withDelay(RELEASE_DELAY, withSpring(0, PRESS_OUT));
	}, [progress]);

	return { style, onPressIn, onPressOut };
}
