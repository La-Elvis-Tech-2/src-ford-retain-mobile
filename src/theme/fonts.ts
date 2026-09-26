import { Archivo_400Regular } from '@expo-google-fonts/archivo/400Regular';
import { Archivo_500Medium } from '@expo-google-fonts/archivo/500Medium';
import { Archivo_600SemiBold } from '@expo-google-fonts/archivo/600SemiBold';
import { Archivo_700Bold } from '@expo-google-fonts/archivo/700Bold';
import type { TextStyle } from 'react-native';

export type FontWeightName = 'regular' | 'medium' | 'semibold' | 'bold';

export const FONT_STYLE: Record<FontWeightName, TextStyle> = {
	regular: { fontFamily: 'Archivo_400Regular' },
	medium: { fontFamily: 'Archivo_500Medium' },
	semibold: { fontFamily: 'Archivo_600SemiBold' },
	bold: { fontFamily: 'Archivo_700Bold' },
};

export const APP_FONTS = {
	Archivo_400Regular,
	Archivo_500Medium,
	Archivo_600SemiBold,
	Archivo_700Bold,
};
