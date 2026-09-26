import { type ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
	Easing,
	type SharedValue,
	useAnimatedProps,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, RadialGradient, Rect, Stop } from 'react-native-svg';
import { colorAt } from '@/lib/color';
import { ORB_STOPS } from '@/theme/gradients';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

/** O desenho mora num quadrado de 100: o SVG escala para qualquer diâmetro. */
const VIEW = 100;
const RADIUS = VIEW / 2;
const BAR_COUNT = 21;
/** Largura da barra em fração da casa — o resto é o vão entre elas. */
const BAR_FILL = 0.58;

/**
 * Quanto cada barra "respira": a altura oscila entre 88% e 100% da base.
 * Pouco de propósito — é um sinal de que a leitura está viva, não um
 * equalizador pedindo atenção ao lado dos números.
 */
const BREATH = 0.12;
const CYCLE_MS = 5200;

type Bar = { x: number; width: number; height: number; color: string; phase: number };

/**
 * As barras são calculadas uma vez, no módulo: a esfera é a mesma para todo
 * orbe do app, só o tamanho muda.
 *
 * A altura base de cada barra é a CORDA do círculo naquele x — é o que faz
 * as barras desenharem uma esfera —, recortada por um relevo determinístico
 * (um seno de fase fixa) para a borda sair irregular como no layout, e não
 * um círculo perfeito listrado.
 */
const BARS: readonly Bar[] = Array.from({ length: BAR_COUNT }, (_, index) => {
	const step = VIEW / BAR_COUNT;
	const center = step * (index + 0.5);
	const offset = center - RADIUS;
	const chord = 2 * Math.sqrt(Math.max(0, RADIUS * RADIUS - offset * offset));
	const relief = 0.8 + 0.2 * Math.abs(Math.sin(index * 2.39));

	return {
		x: center - (step * BAR_FILL) / 2,
		width: step * BAR_FILL,
		height: chord * relief,
		color: colorAt(ORB_STOPS, center / VIEW),
		phase: index * 0.83,
	};
});

function OrbBar({ bar, index, clock, id }: { bar: Bar; index: number; clock: SharedValue<number>; id: string }) {
	const animatedProps = useAnimatedProps(() => {
		const height = bar.height * (1 - BREATH / 2 + (BREATH / 2) * Math.sin(clock.value + bar.phase));
		return { y: RADIUS - height / 2, height };
	});

	return (
		<AnimatedRect
			x={bar.x}
			width={bar.width}
			rx={bar.width / 2}
			fill={`url(#${id}-bar-${index})`}
			animatedProps={animatedProps}
		/>
	);
}

export type HealthOrbProps = {
	/**
	 * Diâmetro em PIXELS — quem chama passa pelo `useScaler`, ou mede o espaço
	 * que tem (a abertura encaixa o orbe no que sobra da tela).
	 */
	size: number;
	/** O que fica no miolo claro — a pílula com a nota. */
	children?: ReactNode;
	/** Um `id` por orbe na mesma tela: dois `Svg` não podem dividir o do degradê. */
	id?: string;
};

/**
 * O orbe — a esfera de barras verticais do layout de referência, nos azuis
 * da Ford.
 *
 * As barras respiram devagar, cada uma na sua fase. A animação roda inteira
 * na thread de UI (Reanimated), e quem pediu "reduzir movimento" no sistema
 * recebe o orbe parado: o Reanimated salta direto para o valor final.
 *
 * O miolo é lavado de branco por um degradê radial: é onde entra a nota, e
 * sem ele o número ficaria sobre as listras.
 */
export function HealthOrb({ size, children, id = 'orb' }: HealthOrbProps) {
	const diameter = size;
	const clock = useSharedValue(0);

	useEffect(() => {
		clock.value = withRepeat(withTiming(Math.PI * 2, { duration: CYCLE_MS, easing: Easing.linear }), -1, false);
	}, [clock]);

	return (
		<View
			style={{ width: diameter, height: diameter }}
			className='items-center justify-center'
			accessibilityElementsHidden={children === undefined}
		>
			<Svg width={diameter} height={diameter} viewBox={`0 0 ${VIEW} ${VIEW}`} style={{ position: 'absolute' }}>
				<Defs>
					{BARS.map((bar, index) => (
						// A lista é fixa: o índice é chave estável aqui.
						// biome-ignore lint/suspicious/noArrayIndexKey: lista estática
						<LinearGradient key={index} id={`${id}-bar-${index}`} x1='0' y1='0' x2='0' y2='1'>
							<Stop offset='0' stopColor={bar.color} stopOpacity={0} />
							<Stop offset='0.22' stopColor={bar.color} stopOpacity={0.75} />
							<Stop offset='0.5' stopColor={bar.color} stopOpacity={1} />
							<Stop offset='0.78' stopColor={bar.color} stopOpacity={0.75} />
							<Stop offset='1' stopColor={bar.color} stopOpacity={0} />
						</LinearGradient>
					))}
					<RadialGradient id={`${id}-glow`} cx='50%' cy='50%' r='50%'>
						<Stop offset='0' stopColor='#FFFFFF' stopOpacity={0.92} />
						<Stop offset='0.55' stopColor='#FFFFFF' stopOpacity={0.55} />
						<Stop offset='1' stopColor='#FFFFFF' stopOpacity={0} />
					</RadialGradient>
				</Defs>

				{BARS.map((bar, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: lista estática
					<OrbBar key={index} bar={bar} index={index} clock={clock} id={id} />
				))}

				<Circle cx={RADIUS} cy={RADIUS} r={RADIUS * 0.62} fill={`url(#${id}-glow)`} />
			</Svg>

			{children}
		</View>
	);
}
