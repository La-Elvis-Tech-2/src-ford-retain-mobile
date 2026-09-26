import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, { type AnimatedStyle } from 'react-native-reanimated';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

/**
 * A queda do degradê, em fração da altura do véu.
 *
 * Amostrada de uma curva em S, e não de uma reta: a queda linear deixa uma
 * banda à vista onde ela acaba — é exatamente o "corte" que o véu existe para
 * esconder. Com a curva, o começo e o fim da dissolução não têm aresta.
 */
const FALLOFF = [
	{ at: 0, opacity: 1 },
	{ at: 0.15, opacity: 0.96 },
	{ at: 0.3, opacity: 0.86 },
	{ at: 0.45, opacity: 0.68 },
	{ at: 0.6, opacity: 0.46 },
	{ at: 0.75, opacity: 0.24 },
	{ at: 0.9, opacity: 0.07 },
	{ at: 1, opacity: 0 },
] as const;

export type EdgeFadeProps = {
	/** Um `id` por véu: dois `Svg` na mesma tela não podem dividir o do degradê. */
	id: string;
	/** A borda da área de rolagem onde o véu fica. */
	edge: 'top' | 'bottom';
	/** A cor da faixa da safe area vizinha — é nela que o conteúdo se dissolve. */
	color: string;
	/** Em quantos pixels a cor se dissolve. */
	size: number;
	/** A opacidade do véu inteiro, animada por quem usa — o de cima acende com a rolagem. */
	style?: AnimatedStyle<ViewStyle>;
};

/**
 * O véu da borda de uma área que rola, colado à faixa da safe area.
 *
 * Sem ele, o conteúdo termina numa LINHA RETA na borda da safe area: é o fim
 * da rolagem, recortado no pixel. Com ele, o conteúdo se desfaz na cor da
 * faixa antes de chegar nela.
 *
 * O degradê é `react-native-svg` e não `boxShadow`: precisa ir de uma cor a
 * transparente com opacidade própria, animada por fora.
 */
export function EdgeFade({ id, edge, color, size, style }: EdgeFadeProps) {
	const fromTop = edge === 'top';

	return (
		<Animated.View
			pointerEvents='none'
			style={[styles.veil, fromTop ? { top: 0 } : { bottom: 0 }, { height: size }, style]}
		>
			<Svg width='100%' height='100%'>
				<Defs>
					<LinearGradient id={id} x1='0' y1={fromTop ? '0' : '1'} x2='0' y2={fromTop ? '1' : '0'}>
						{FALLOFF.map(({ at, opacity }) => (
							<Stop key={at} offset={at} stopColor={color} stopOpacity={opacity} />
						))}
					</LinearGradient>
				</Defs>
				<Rect x='0' y='0' width='100%' height='100%' fill={`url(#${id})`} />
			</Svg>
		</Animated.View>
	);
}

const styles = StyleSheet.create({
	veil: { position: 'absolute', left: 0, right: 0 },
});
