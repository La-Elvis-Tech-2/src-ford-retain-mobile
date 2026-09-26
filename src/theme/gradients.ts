/**
 * As cores do orbe — o "sol" de barras da home e da abertura.
 *
 * O layout de referência pinta a esfera com barras verticais em degradê. Aqui
 * o degradê é o da Ford: do Ford Blue, à esquerda, ao azul vivo do ford.com,
 * clareando até o azul-céu na borda direita.
 *
 * Paradas ao longo do eixo X da esfera, da esquerda para a direita.
 */
export const ORB_STOPS = [
	{ at: 0, color: '#00095B' },
	{ at: 0.3, color: '#0A3FA8' },
	{ at: 0.6, color: '#0562D2' },
	{ at: 0.82, color: '#2D8CFF' },
	{ at: 1, color: '#6CB2FF' },
] as const;
