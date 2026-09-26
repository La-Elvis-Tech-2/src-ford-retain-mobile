import { BatteryCharging, ShieldCheck } from 'lucide-react-native';
import { Image, View } from 'react-native';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';
import type { NewsArt as NewsArtKind } from '../types';

const RANGER = require('../../../../assets/images/ford-ranger-640.png');

const BACKDROPS: Record<NewsArtKind, string> = {
	ranger: '#E6ECF5',
	recall: COLORS.primary,
	battery: COLORS.accent,
};

export function NewsArt({ art, height }: { art: NewsArtKind; height: number }) {
	const px = useScaler();

	return (
		<View style={{ height, backgroundColor: BACKDROPS[art] }} className='items-center justify-center overflow-hidden'>
			{art === 'ranger' ? (
				<Image
					source={RANGER}
					resizeMode='contain'
					style={{ width: '80%', height: height * 0.84, marginTop: height * 0.1 }}
					accessibilityIgnoresInvertColors
				/>
			) : null}
			{art === 'recall' ? <ShieldCheck size={px(36)} color={COLORS.white} strokeWidth={1.5} /> : null}
			{art === 'battery' ? <BatteryCharging size={px(36)} color={COLORS.white} strokeWidth={1.5} /> : null}
		</View>
	);
}
