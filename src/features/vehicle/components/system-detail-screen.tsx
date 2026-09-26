import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { ScreenScrollView } from '@/components/layout/screen-scroll-view';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QueryState } from '@/components/ui/query-state';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';
import { formatDelta } from '@/lib/format';
import { ROUTES } from '@/routes/routes';
import { ITEM_GAP } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import { byUrgency, countByStatus } from '../health';
import { useHealthOverview, useHealthReport } from '../hooks/use-health-report';
import { deltaClass, STATUS_META } from '../theme';
import type { SystemSummary } from '../types';
import { ComponentCard } from './component-card';
import { SystemIcon } from './component-icon';
import { StatusBadge } from './status-badge';

/** "1 urgente · 2 em atenção · 3 em dia", pulando o que for zero. */
function breakdown(system: SystemSummary): string {
	const counts = countByStatus(system.components);
	return [
		counts.urgent > 0 ? `${counts.urgent} urgente${counts.urgent > 1 ? 's' : ''}` : null,
		counts.attention > 0 ? `${counts.attention} em atenção` : null,
		counts.ok > 0 ? `${counts.ok} em dia` : null,
	]
		.filter(Boolean)
		.join(' · ');
}

/**
 * Um sistema do carro aberto: a nota, a variação e cada componente dele, do
 * mais grave para o mais tranquilo. É a porta de cada linha da home.
 */
export function SystemDetailScreen() {
	const px = useScaler();
	const router = useRouter();
	const { systemId } = useLocalSearchParams<{ systemId: string }>();
	const query = useHealthReport();
	const overview = useHealthOverview();
	const system = overview?.systems.find((candidate) => candidate.id === systemId);

	if (!overview) {
		return (
			<Screen>
				<ScreenScrollView>
					<ScreenHeader />
					<QueryState error={query.error} onRetry={() => void query.refetch()} />
				</ScreenScrollView>
			</Screen>
		);
	}

	if (!system) {
		return (
			<Screen>
				<ScreenScrollView>
					<ScreenHeader />
					<View style={{ gap: px(4) }}>
						<Text variant='title'>Sistema não encontrado</Text>
						<Text variant='muted'>O link que você abriu não aponta para nenhum sistema do seu carro.</Text>
					</View>
				</ScreenScrollView>
			</Screen>
		);
	}

	const meta = STATUS_META[system.status];
	const needsService = system.status !== 'ok';

	return (
		<Screen>
			<ScreenScrollView>
				<ScreenHeader title={system.name} />

				<Card style={{ gap: px(12) }}>
					<View className='flex-row items-center' style={{ gap: px(12) }}>
						<View
							className='items-center justify-center rounded-full'
							style={{ width: px(48), height: px(48), backgroundColor: meta.soft }}
						>
							<SystemIcon system={system.id} size={px(24)} color={meta.color} />
						</View>
						<View className='flex-1' style={{ gap: px(4) }}>
							<View className='flex-row items-baseline' style={{ gap: px(6) }}>
								<Text variant='score'>{system.score}%</Text>
								{/*
								 * `flex-1`: com a largura medida do próprio texto, o Android
								 * arredondava para baixo e quebrava o "semana" numa segunda
								 * linha que a altura de uma linha cortava.
								 */}
								<Text variant='muted' font='semibold' className={cn('flex-1', deltaClass(system.delta))}>
									{formatDelta(system.delta)} na semana
								</Text>
							</View>
							<StatusBadge status={system.status} />
						</View>
					</View>
					<Text variant='muted'>{breakdown(system)}</Text>
				</Card>

				<View style={{ gap: px(ITEM_GAP) }}>
					{byUrgency(system.components).map((component) => (
						<ComponentCard key={component.id} component={component} />
					))}
				</View>

				{needsService ? (
					<Card style={{ gap: px(12) }}>
						<View style={{ gap: px(4) }}>
							<Text variant='subtitle'>Resolve na mesma visita</Text>
							<Text variant='muted'>
								Os itens em atenção entram no pacote recomendado, com preço fechado e 1 ano de garantia na rede Ford.
							</Text>
						</View>
						<Button label='Ver revisão recomendada' onPress={() => router.navigate(ROUTES.service)} />
					</Card>
				) : null}
			</ScreenScrollView>
		</Screen>
	);
}
