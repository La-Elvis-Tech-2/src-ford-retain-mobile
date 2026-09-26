import { View } from 'react-native';
import { BrandMark } from '@/components/brand/brand-mark';
import { useScaler } from '@/theme/scale';

/** O selo do Ford Assist: a marca do app num disco claro. */
export function AssistantAvatar({ size = 32 }: { size?: number }) {
	const px = useScaler();

	return (
		<View
			className='items-center justify-center rounded-full bg-accent-soft'
			style={{ width: px(size), height: px(size) }}
			accessibilityElementsHidden
			importantForAccessibility='no-hide-descendants'
		>
			<BrandMark size={px(size * 0.58)} />
		</View>
	);
}
