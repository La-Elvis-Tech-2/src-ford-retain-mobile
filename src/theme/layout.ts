/**
 * Medidas de layout compartilhadas entre telas.
 *
 * Os valores estão em pontos do frame de referência (393pt, o iPhone do layout
 * da home) e passam pelo `useScaler` antes de virar pixel — ver
 * src/theme/scale.tsx.
 *
 * Espaçamento de tela mora AQUI, não em classe do Tailwind: as utilitárias
 * (`p-4`, `gap-6`) são pixel fixo e não acompanham a escala do aparelho.
 */

/** Margem lateral de toda tela. No layout de referência os cartões ficam a 16 da borda. */
export const SCREEN_GUTTER = 16;

/** Respiro no topo de uma tela de conteúdo, abaixo da safe area. */
export const SCREEN_TOP_SPACING = 10;

/**
 * Os véus nas bordas das telas que rolam (ver `EdgeFade`): a altura da
 * dissolução e quanto a rolagem anda até o de cima acender por inteiro.
 */
export const SCROLL_FADE = { size: 20, appearDistance: 14 } as const;

/** Distância entre blocos independentes de uma tela. */
export const SECTION_GAP = 18;

/** Respiro no fim de uma tela rolável, acima da safe area. */
export const SCREEN_BOTTOM_SPACING = 20;

/** Distância entre itens de um mesmo bloco. */
export const ITEM_GAP = 8;

/** Padding interno e raio dos cartões. O layout usa cantos generosos. */
export const CARD_PADDING = 16;
export const CARD_RADIUS = 20;

/** Raio do painel branco do topo da home — o maior do app. */
export const PANEL_RADIUS = 28;
