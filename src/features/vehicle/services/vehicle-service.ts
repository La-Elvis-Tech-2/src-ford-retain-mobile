import type { HealthReport } from '../types';

export type VehicleService = {
	getHealthReport(vehicleId: string): Promise<HealthReport>;
};
