import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Screen } from '@/components/layout/screen';
import { ScreenScrollView } from '@/components/layout/screen-scroll-view';
import { QueryState } from '@/components/ui/query-state';
import { HealthOrb } from '@/features/vehicle/components/health-orb';
import { ScorePill } from '@/features/vehicle/components/score-pill';
import { SystemRow } from '@/features/vehicle/components/system-row';
import { useHealthOverview, useHealthReport } from '@/features/vehicle/hooks/use-health-report';
import { ROUTES } from '@/routes/routes';
import { COLORS } from '@/theme/colors';
import { PANEL_RADIUS, SCREEN_GUTTER, SECTION_GAP } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import { useHomeStore } from '../stores/home-store';
import { HomeTopBar } from './home-top-bar';
import { InsightCard } from './insight-card';
import { NewsSection } from './news-section';
import { ProvenanceCard } from './provenance-card';

const ORB_SIZE = 140;

export function HomeScreen() {
	const px = useScaler();
	const router = useRouter();
	const query = useHealthReport();
	const overview = useHealthOverview();
	const provenanceHidden = useHomeStore((state) => state.provenanceHidden);
	const gutter = px(SCREEN_GUTTER);

	return (
		<Screen bleed statusBarColor={COLORS.card}>
			<ScreenScrollView withTabBar bleed fadeColor={COLORS.card}>
				<View
					className='bg-card'
					style={{
						paddingTop: px(8),
						paddingHorizontal: gutter,
						paddingBottom: px(16),
						borderBottomLeftRadius: px(PANEL_RADIUS),
						borderBottomRightRadius: px(PANEL_RADIUS),
						gap: px(16),
					}}
				>
					<View className='absolute right-0 left-0 bg-card' style={{ top: -1000, height: 1000 }} />

					<HomeTopBar vehicle={overview?.report.vehicle ?? null} />

					{overview ? (
						<>
							<View className='flex-row items-center' style={{ gap: px(8) }}>
								<HealthOrb size={px(ORB_SIZE)}>
									<ScorePill label='Saúde' score={overview.score} delta={overview.delta} />
								</HealthOrb>
								<View className='flex-1' style={{ gap: px(6) }}>
									{overview.systems.map((system) => (
										<SystemRow
											key={system.id}
											system={system}
											onPress={() => router.push({ pathname: ROUTES.system, params: { systemId: system.id } })}
										/>
									))}
								</View>
							</View>
							<InsightCard insight={overview.report.insight} />
						</>
					) : (
						<QueryState error={query.error} onRetry={() => void query.refetch()} />
					)}
				</View>

				<View style={{ paddingHorizontal: gutter, paddingTop: px(SECTION_GAP), gap: px(SECTION_GAP) }}>
					{overview && !provenanceHidden ? (
						<ProvenanceCard vehicle={overview.report.vehicle} provenance={overview.report.provenance} />
					) : null}
					<NewsSection />
				</View>
			</ScreenScrollView>
		</Screen>
	);
}
