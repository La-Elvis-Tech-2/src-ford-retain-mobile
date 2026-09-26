import { View } from 'react-native';
import { cn } from '@/lib/cn';
import { useScaler } from '@/theme/scale';
import { Text } from './text';

export type AvatarProps = {
	name: string;
	size?: number;
	className?: string;
};

function initials(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	const first = parts[0]?.[0] ?? '';
	const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
	return `${first}${last}`.toUpperCase();
}

export function Avatar({ name, size = 28, className }: AvatarProps) {
	const px = useScaler();

	return (
		<View
			className={cn('items-center justify-center bg-primary', className)}
			style={{ width: px(size), height: px(size), borderRadius: px(size) / 2 }}
			accessibilityElementsHidden
			importantForAccessibility='no-hide-descendants'
		>
			<Text
				variant='caption'
				font='semibold'
				className='text-primary-foreground'
				maxFontSizeMultiplier={1}
				style={{ fontSize: px(size * 0.4), lineHeight: px(size * 0.5) }}
			>
				{initials(name)}
			</Text>
		</View>
	);
}
