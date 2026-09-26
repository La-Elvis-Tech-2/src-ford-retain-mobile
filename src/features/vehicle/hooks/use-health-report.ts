import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useVehicleId } from '@/features/auth/hooks/use-session';
import { scoreOf, summarizeSystems } from '../health';
import { vehicleService } from '../services';
import type { HealthReport, SystemSummary } from '../types';

export const healthReportKey = (vehicleId: string | null) => ['vehicle', vehicleId, 'health'] as const;

export function useHealthReport() {
	const vehicleId = useVehicleId();

	return useQuery({
		queryKey: healthReportKey(vehicleId),
		queryFn: () => vehicleService.getHealthReport(vehicleId ?? ''),
		enabled: vehicleId !== null,
		staleTime: 5 * 60_000,
	});
}

export type HealthOverview = {
	report: HealthReport;
	score: number;
	delta: number;
	systems: SystemSummary[];
};

export function useHealthOverview(): HealthOverview | null {
	const { data } = useHealthReport();

	return useMemo(() => {
		if (!data) {
			return null;
		}
		return { report: data, ...scoreOf(data.components), systems: summarizeSystems(data.components) };
	}, [data]);
}
