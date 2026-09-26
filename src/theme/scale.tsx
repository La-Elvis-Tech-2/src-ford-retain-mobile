import { createContext, type ReactNode, useCallback, useContext, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

const DESIGN_WIDTH = 393;

const MIN_SCALE = 0.9;
const MAX_SCALE = 1;

const ScaleContext = createContext(1);

export function ScaleProvider({ children }: { children: ReactNode }) {
	const { width } = useWindowDimensions();

	const scale = useMemo(() => Math.min(MAX_SCALE, Math.max(MIN_SCALE, width / DESIGN_WIDTH)), [width]);

	return <ScaleContext.Provider value={scale}>{children}</ScaleContext.Provider>;
}

export function useScaler(): (value: number) => number {
	const scale = useContext(ScaleContext);

	return useCallback((value: number) => Math.round(value * scale), [scale]);
}
