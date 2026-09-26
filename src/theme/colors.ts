/**
 * Espelho em JavaScript dos tokens de cor de `global.css`.
 *
 * A fonte da verdade continua sendo o CSS. Este arquivo existe só para as APIs
 * que NÃO aceitam classe e exigem cor crua — as opções do react-navigation, o
 * `placeholderTextColor`, a cor do `ActivityIndicator`, os ícones do lucide e
 * os `fill` do react-native-svg.
 *
 * Ao mudar um token lá, mude aqui também; são os dois únicos lugares com cor.
 */
export const COLORS = {
	background: '#F2F3F6',
	foreground: '#101430',
	card: '#FFFFFF',
	primary: '#00095B',
	primaryForeground: '#FFFFFF',
	accent: '#0562D2',
	accentSoft: '#E8F1FE',
	secondary: '#EDEFF3',
	secondaryForeground: '#2E3345',
	muted: '#E4E6EB',
	mutedForeground: '#5B6172',
	subtleForeground: '#9AA0AD',
	border: '#E3E5EA',
	field: '#F6F7F9',
	fieldBorder: '#D8DCE3',
	positive: '#097A3C',
	positiveSoft: '#E6F4EC',
	warning: '#A84700',
	warningSoft: '#FDF0E5',
	negative: '#C42B10',
	negativeSoft: '#FCEAE6',
	white: '#FFFFFF',
	/** A estrela da nota da concessionária — só ícone, sempre ao lado do número. */
	star: '#E3A008',
} as const;

/** Cinza do texto de exemplo dos campos — 3.5:1, o piso para texto não essencial. */
export const PLACEHOLDER_COLOR = '#878D9A';
