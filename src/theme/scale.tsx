import { createContext, type ReactNode, useCallback, useContext, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

/**
 * Escala responsiva do app.
 *
 * As medidas do layout foram desenhadas num frame de 393pt de largura. Em
 * aparelho mais estreito que isso, toda medida é multiplicada pela razão entre
 * a largura real e a do frame, para a mesma composição caber sem quebrar.
 *
 * O fator é calculado UMA vez, no provider, e distribuído por contexto —
 * nenhum componente assina eventos de dimensão por conta própria.
 */

const DESIGN_WIDTH = 393;

/**
 * A escala só REDUZ. Em tela estreita (SE, 360dp do Android) as medidas
 * encolhem um pouco para o layout caber; em tela larga elas ficam no tamanho
 * do frame, e o espaço a mais vira conteúdo — ampliar tudo fazia o app parecer
 * de letra grande num aparelho de 430pt. O piso segura o texto legível.
 */
const MIN_SCALE = 0.9;
const MAX_SCALE = 1;

const ScaleContext = createContext(1);

export function ScaleProvider({ children }: { children: ReactNode }) {
	const { width } = useWindowDimensions();

	const scale = useMemo(() => Math.min(MAX_SCALE, Math.max(MIN_SCALE, width / DESIGN_WIDTH)), [width]);

	return <ScaleContext.Provider value={scale}>{children}</ScaleContext.Provider>;
}

/**
 * Converte uma medida do layout em pontos do aparelho atual.
 *
 * A função é estável enquanto a largura não muda, então dá para usá-la como
 * dependência de `useMemo` sem recriar estilo a cada render.
 *
 *     const px = useScaler();
 *     <View style={{ height: px(52) }} />
 */
export function useScaler(): (value: number) => number {
	const scale = useContext(ScaleContext);

	return useCallback((value: number) => Math.round(value * scale), [scale]);
}
