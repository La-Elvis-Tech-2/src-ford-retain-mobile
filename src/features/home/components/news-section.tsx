import { View } from 'react-native';
import { SectionHeader } from '@/components/ui/section-header';
import { NewsCard } from '@/features/news/components/news-card';
import { SAMPLE_NEWS } from '@/features/news/data/news';
import { ITEM_GAP } from '@/theme/layout';
import { useScaler } from '@/theme/scale';

/** "Novidades" — o feed embaixo do painel. */
export function NewsSection() {
	const px = useScaler();

	return (
		<View style={{ gap: px(ITEM_GAP) }}>
			<SectionHeader title='Novidades' />
			{SAMPLE_NEWS.map((item) => (
				<NewsCard key={item.id} item={item} />
			))}
		</View>
	);
}
