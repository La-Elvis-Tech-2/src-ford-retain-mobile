import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useVehicleId } from '@/features/auth/hooks/use-session';
import { scoreOf, summarizeSystems } from '../health';
import { vehicleService } from '../services';
import type { HealthReport, SystemSummary } from '../types';

export const healthReportKey = (vehicleId: string | null) => ['vehicle', vehicleId, 'health'] as const;

/**
 * O laudo do carro da sessão.
 *
 * Todas as telas que mostram o carro leem daqui — a home, o detalhe de um
 * sistema, o perfil e o assistente —, então há uma requisição só, e o cache
 * do React Query é o que mantém os números iguais entre elas.
 */
export function useHealthReport() {
	const vehicleId = useVehicleId();

	return useQuery({
		queryKey: healthReportKey(vehicleId),
		queryFn: () => vehicleService.getHealthReport(vehicleId ?? ''),
		enabled: vehicleId !== null,
		// A leitura dos módulos muda uma vez por dia; mais que isso é rede à toa.
		staleTime: 5 * 60_000,
	});
}

export type HealthOverview = {
	report: HealthReport;
	score: number;
	delta: number;
	systems: SystemSummary[];
};

/** O laudo já com as contas da home feitas. `null` enquanto não chega. */
export function useHealthOverview(): HealthOverview | null {
	const { data } = useHealthReport();

	return useMemo(() => {
		if (!data) {
			return null;
		}
		return { report: data, ...scoreOf(data.components), systems: summarizeSystems(data.components) };
	}, [data]);
}
