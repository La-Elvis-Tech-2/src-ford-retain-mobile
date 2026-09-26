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
	/** Bordas que respeitam a safe area. Padrão: as quatro. */
	edges?: readonly Edge[];
	/** Sem a margem lateral — para quem desenha de borda a borda (o painel da home). */
	bleed?: boolean;
	/**
	 * A cor da faixa da barra de status. É a do que "continua" por trás dela:
	 * na home, o branco do painel do topo.
	 */
	statusBarColor?: string;
};

/**
 * Casca padrão de toda tela: fundo do tema + safe area.
 * Telas não declaram background nem padding de status bar sozinhas.
 *
 * A safe area é uma FAIXA SÓLIDA em cima e outra embaixo, e o conteúdo mora
 * entre as duas: nada rola por baixo do relógio, do entalhe, do indicador de
 * gesto ou da barra de navegação do Android. No Android edge-to-edge as duas
 * barras do sistema são transparentes — sem as faixas, o texto que rola
 * aparecia atrás dos ícones da barra de status e dos botões de navegação.
 *
 * Os insets vêm do `useSafeAreaInsets`, que nasce com as medidas da janela
 * (`initialWindowMetrics` no provider): o primeiro quadro já é o certo.
 */
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
