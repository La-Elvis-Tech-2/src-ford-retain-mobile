import type { ReactNode } from 'react';
import { Platform, type ScrollViewProps } from 'react-native';
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { COLORS } from '@/theme/colors';
import { SCREEN_BOTTOM_SPACING, SCREEN_GUTTER, SCREEN_TOP_SPACING, SCROLL_FADE, SECTION_GAP } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import { EdgeFade } from './edge-fade';
import { useTabBarClearance } from './tab-bar';

export type ScreenScrollViewProps = Omit<
	ScrollViewProps,
	'children' | 'style' | 'contentContainerStyle' | 'onScroll'
> & {
	children: ReactNode;
	/** A tela tem a `TabBar` flutuando embaixo: o fim da rolagem reserva o espaço dela. */
	withTabBar?: boolean;
	/** A tela tem campo: o teclado some ao arrastar e empurra o conteúdo. */
	withKeyboard?: boolean;
	/**
	 * O conteúdo desenha de borda a borda — sem margem lateral, sem respiro e
	 * sem espaço entre blocos. É o caso da home, cujo painel branco encosta na
	 * faixa branca da barra de status.
	 */
	bleed?: boolean;
	/** A cor do véu do topo — a da faixa da barra de status logo acima. */
	fadeColor?: string;
};

/**
 * A rolagem padrão de uma tela, dentro do `Screen`.
 *
 * Junta o que cada tela repetiria à mão: o respiro do topo, o `SECTION_GAP`
 * entre os blocos e, no fim, o respiro — ou o espaço da barra de abas.
 *
 * A rolagem mora INTEIRA dentro da safe area (o `Screen` já desconta as duas
 * faixas), e o que sobe é cortado na borda da faixa de cima. Quem suaviza o
 * corte é o véu do topo, que acende assim que o conteúdo começa a subir; nas
 * abas, um segundo véu dissolve o conteúdo que passa ao lado da cápsula antes
 * da faixa de baixo.
 */
export function ScreenScrollView({
	children,
	withTabBar = false,
	withKeyboard = false,
	bleed = false,
	fadeColor = COLORS.background,
	...props
}: ScreenScrollViewProps) {
	const px = useScaler();
	const tabBarClearance = useTabBarClearance();
	const gutter = px(SCREEN_GUTTER);
	/** Um `Screen` com `bleed` não tem margem para a rolagem ultrapassar. */
	const outerGutter = bleed ? 0 : gutter;

	const scrollY = useSharedValue(0);
	const appearDistance = px(SCROLL_FADE.appearDistance);

	const handleScroll = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	});

	const fadeStyle = useAnimatedStyle(() => ({
		opacity: interpolate(scrollY.value, [0, appearDistance], [0, 1], Extrapolation.CLAMP),
	}));

	return (
		<>
			{/* Estilo, e não classe: o `Animated.ScrollView` fica fora do NativeWind. */}
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps={withKeyboard ? 'handled' : undefined}
				keyboardDismissMode={withKeyboard ? (Platform.OS === 'ios' ? 'interactive' : 'on-drag') : undefined}
				automaticallyAdjustKeyboardInsets={withKeyboard}
				{...props}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				style={{ flex: 1, marginHorizontal: -outerGutter }}
				contentContainerStyle={{
					paddingHorizontal: bleed ? 0 : gutter,
					paddingTop: bleed ? 0 : px(SCREEN_TOP_SPACING),
					paddingBottom: withTabBar ? tabBarClearance : px(SCREEN_BOTTOM_SPACING),
					gap: bleed ? 0 : px(SECTION_GAP),
				}}
			>
				{children}
			</Animated.ScrollView>

			<EdgeFade id='screenTopFade' edge='top' color={fadeColor} size={px(SCROLL_FADE.size)} style={fadeStyle} />
			{withTabBar ? (
				<EdgeFade id='screenBottomFade' edge='bottom' color={COLORS.background} size={px(SCROLL_FADE.size)} />
			) : null}
		</>
	);
}
