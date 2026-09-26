import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { ScreenScrollView } from '@/components/layout/screen-scroll-view';
import { Text } from '@/components/ui/text';
import { CARD_RADIUS } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import { SAMPLE_NEWS } from '../data/news';
import { NewsArt } from './news-art';

/** Uma novidade aberta. */
export function NewsDetailScreen() {
	const px = useScaler();
	const { newsId } = useLocalSearchParams<{ newsId: string }>();
	const item = SAMPLE_NEWS.find((candidate) => candidate.id === newsId);

	return (
		<Screen>
			<ScreenScrollView>
				<ScreenHeader title='Novidades' />
				{item ? (
					<>
						<View className='overflow-hidden' style={{ borderRadius: px(CARD_RADIUS) }}>
							<NewsArt art={item.art} height={px(168)} />
						</View>
						<View style={{ gap: px(6) }}>
							<Text variant='caption' font='semibold' className='text-accent'>
								{item.tag.toUpperCase()} · {item.dateLabel}
							</Text>
							<Text variant='title' accessibilityRole='header'>
								{item.title}
							</Text>
						</View>
						<View style={{ gap: px(12) }}>
							{item.body.map((paragraph) => (
								<Text key={paragraph} variant='body' className='text-secondary-foreground'>
									{paragraph}
								</Text>
							))}
						</View>
					</>
				) : (
					<Text variant='muted'>Essa novidade não está mais disponível.</Text>
				)}
			</ScreenScrollView>
		</Screen>
	);
}
