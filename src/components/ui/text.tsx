import { useMemo } from 'react';
import { Text as RNText, type TextProps as RNTextProps, type TextStyle, useWindowDimensions } from 'react-native';
import { cn } from '@/lib/cn';
import { FONT_STYLE, type FontWeightName } from '@/theme/fonts';
import { useScaler } from '@/theme/scale';

const VARIANTS = {
	hero: { font: 'semibold', className: 'text-foreground', size: 24, lineHeight: 30 },
	score: { font: 'semibold', className: 'text-foreground', size: 30, lineHeight: 34 },
	title: { font: 'semibold', className: 'text-foreground', size: 20, lineHeight: 26 },
	subtitle: { font: 'semibold', className: 'text-foreground', size: 16, lineHeight: 22 },
	metric: { font: 'semibold', className: 'text-foreground', size: 18, lineHeight: 22 },
	body: { font: 'regular', className: 'text-foreground', size: 15, lineHeight: 21 },
	bodySm: { font: 'regular', className: 'text-foreground', size: 14, lineHeight: 20 },
	label: { font: 'semibold', className: '', size: 14, lineHeight: 18 },
	muted: { font: 'regular', className: 'text-muted-foreground', size: 13, lineHeight: 18 },
	detail: { font: 'regular', className: 'text-muted-foreground', size: 12, lineHeight: 16 },
	caption: { font: 'medium', className: 'text-muted-foreground', size: 11, lineHeight: 14 },
	danger: { font: 'regular', className: 'text-negative', size: 13, lineHeight: 18 },
} as const satisfies Record<string, { font: FontWeightName; className: string; size: number; lineHeight: number }>;

const MAX_FONT_SCALE = 1.3;

export type TextVariant = keyof typeof VARIANTS;

export type TextProps = RNTextProps & {
	variant?: TextVariant;
	font?: FontWeightName;
	className?: string;
};

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
			style={[sizeStyle, style]}
			{...props}
		/>
	);
}
