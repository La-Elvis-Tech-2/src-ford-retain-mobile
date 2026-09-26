import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { ROUTES } from '@/routes/routes';
import { CARD_RADIUS } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import type { NewsItem } from '../types';
import { NewsArt } from './news-art';

export function NewsCard({ item }: { item: NewsItem }) {
	const px = useScaler();
	const router = useRouter();

	return (
		<PressableScale
			onPress={() => router.push({ pathname: ROUTES.news, params: { newsId: item.id } })}
			accessibilityRole='button'
			accessibilityLabel={`${item.tag}: ${item.title}. ${item.dateLabel}.`}
			className='overflow-hidden bg-card'
			style={{ borderRadius: px(CARD_RADIUS) }}
		>
			<NewsArt art={item.art} height={px(104)} />
			<View style={{ paddingHorizontal: px(12), paddingVertical: px(10), gap: px(2) }}>
				<Text variant='caption' font='semibold' className='text-accent'>
					{item.tag.toUpperCase()} · {item.dateLabel}
				</Text>
				<Text variant='bodySm' font='semibold' numberOfLines={2}>
					{item.title}
				</Text>
				<Text variant='detail' numberOfLines={2}>
					{item.summary}
				</Text>
			</View>
		</PressableScale>
	);
}
