import { httpClient } from '@/services/http/http-client';
import type { HealthReport } from '../types';
import type { VehicleService } from './vehicle-service';

export const httpVehicleService: VehicleService = {
	getHealthReport(vehicleId: string) {
		return httpClient.request<HealthReport>({ path: `/vehicles/${encodeURIComponent(vehicleId)}/health` });
	},
};
