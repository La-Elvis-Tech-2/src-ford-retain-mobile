import { useMemo } from 'react';
import { Text as RNText, type TextProps as RNTextProps, type TextStyle, useWindowDimensions } from 'react-native';
import { cn } from '@/lib/cn';
import { FONT_STYLE, type FontWeightName } from '@/theme/fonts';
import { useScaler } from '@/theme/scale';

/**
 * Escala tipográfica do app.
 *
 * Tamanho e entrelinha são NÚMEROS, não classes: passam pelo `useScaler` e
 * acompanham a largura do aparelho. Só a cor fica em classe, porque é token do
 * tema (global.css).
 *
 * Os degraus são os de um app nativo, não os de uma página: corpo em 15,
 * apoio em 13, título de tela em 24. O único número grande é o que É a
 * resposta da tela (a nota no orbe, o total do orçamento).
 */
const VARIANTS = {
	/** Título de tela e de abertura. */
	hero: { font: 'semibold', className: 'text-foreground', size: 24, lineHeight: 30 },
	/** O número que É a resposta da tela — a nota no orbe, o total do orçamento. */
	score: { font: 'semibold', className: 'text-foreground', size: 30, lineHeight: 34 },
	title: { font: 'semibold', className: 'text-foreground', size: 20, lineHeight: 26 },
	/** Cabeçalho de seção ("Novidades") e título de cartão. */
	subtitle: { font: 'semibold', className: 'text-foreground', size: 16, lineHeight: 22 },
	/** O valor de cada sistema da home ("64%"). */
	metric: { font: 'semibold', className: 'text-foreground', size: 18, lineHeight: 22 },
	body: { font: 'regular', className: 'text-foreground', size: 15, lineHeight: 21 },
	/** O corpo dos cartões de conteúdo — o do assistente, o da conversa, o de procedência. */
	bodySm: { font: 'regular', className: 'text-foreground', size: 14, lineHeight: 20 },
	/** Rótulo de botão e de controle — a cor vem de quem usa, porque varia. */
	label: { font: 'semibold', className: '', size: 14, lineHeight: 18 },
	muted: { font: 'regular', className: 'text-muted-foreground', size: 13, lineHeight: 18 },
	/** O rótulo pequeno de cima de um número ("Motor"). */
	detail: { font: 'regular', className: 'text-muted-foreground', size: 12, lineHeight: 16 },
	/** O menor degrau: legenda da barra de abas e do selo. */
	caption: { font: 'medium', className: 'text-muted-foreground', size: 11, lineHeight: 14 },
	danger: { font: 'regular', className: 'text-negative', size: 13, lineHeight: 18 },
} as const satisfies Record<string, { font: FontWeightName; className: string; size: number; lineHeight: number }>;

/**
 * Teto do ajuste de fonte do sistema: o texto continua acompanhando o "Tamanho
 * do texto" do aparelho, mas sem multiplicar sem limite. Acima de 1.3 as
 * linhas ao lado do orbe e a cápsula de abas deixam de caber em 360dp.
 */
const MAX_FONT_SCALE = 1.3;

export type TextVariant = keyof typeof VARIANTS;

export type TextProps = RNTextProps & {
	variant?: TextVariant;
	/** Troca só o peso da variante — útil em trecho destacado dentro de frase. */
	font?: FontWeightName;
	className?: string;
};

/**
 * Tipografia do app. Telas usam este `Text`, nunca o do react-native direto —
 * é o que garante uma escala tipográfica só.
 */
export function Text({
	variant = 'body',
	font,
	className,
	style,
	maxFontSizeMultiplier = MAX_FONT_SCALE,
	...props
}: TextProps) {
	const px = useScaler();
	const { fontScale } = useWindowDimensions();
	const variantStyle = VARIANTS[variant];
	const fontName = font ?? variantStyle.font;
	const { size, lineHeight } = variantStyle;

	const sizeStyle = useMemo<TextStyle>(() => {
		// O React Native multiplica pelo "Tamanho do texto" do sistema APENAS o
		// `fontSize`; o `lineHeight` fica no valor cru e o texto se sobrepõe.
		// `maxFontSizeMultiplier` 0 é a convenção do RN para "sem teto".
		const cap =
			maxFontSizeMultiplier !== null && maxFontSizeMultiplier > 0 ? maxFontSizeMultiplier : Number.POSITIVE_INFINITY;
		const applied = Math.min(Math.max(fontScale, 1), cap);

		return {
			...FONT_STYLE[fontName],
			fontSize: px(size),
			lineHeight: Math.round(px(lineHeight) * applied),
		};
	}, [px, size, lineHeight, fontScale, maxFontSizeMultiplier, fontName]);

	return (
		<RNText
			className={cn(variantStyle.className, className)}
			maxFontSizeMultiplier={maxFontSizeMultiplier}
			// O `style` de quem chama vem por último e vence o da variante.
			style={[sizeStyle, style]}
			{...props}
		/>
	);
}
