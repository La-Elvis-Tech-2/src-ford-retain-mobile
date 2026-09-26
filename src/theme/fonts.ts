import { Archivo_400Regular } from '@expo-google-fonts/archivo/400Regular';
import { Archivo_500Medium } from '@expo-google-fonts/archivo/500Medium';
import { Archivo_600SemiBold } from '@expo-google-fonts/archivo/600SemiBold';
import { Archivo_700Bold } from '@expo-google-fonts/archivo/700Bold';
import type { TextStyle } from 'react-native';

/**
 * Tipografia do app: Archivo, a mesma do site do laudo.
 *
 * É embarcada nas DUAS plataformas (licença OFL, pacote do Google Fonts): a
 * marca é a mesma no link do WhatsApp e no app, e as duas telas desenham igual.
 *
 * Peso NUNCA é classe do Tailwind neste app. Cada face está registrada como
 * família separada, e `fontWeight` não cruza famílias — no Android, no melhor
 * caso é ignorado, no pior o sistema sintetiza um negrito falso por cima da
 * face que já é a certa. Quem escolhe o peso é `FONT_STYLE`, aplicado pelo
 * `Text`.
 *
 * Os imports são por PESO, e não do índice do pacote: o índice faz `require`
 * das 18 faces, e o Metro empacota todo `require` que enxerga.
 */
export type FontWeightName = 'regular' | 'medium' | 'semibold' | 'bold';

export const FONT_STYLE: Record<FontWeightName, TextStyle> = {
	regular: { fontFamily: 'Archivo_400Regular' },
	medium: { fontFamily: 'Archivo_500Medium' },
	semibold: { fontFamily: 'Archivo_600SemiBold' },
	bold: { fontFamily: 'Archivo_700Bold' },
};

/** Mapa passado ao `useFonts` no layout raiz. As chaves viram o `fontFamily`. */
export const APP_FONTS = {
	Archivo_400Regular,
	Archivo_500Medium,
	Archivo_600SemiBold,
	Archivo_700Bold,
};
