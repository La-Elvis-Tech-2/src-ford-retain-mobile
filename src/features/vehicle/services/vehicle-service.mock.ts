import { SAMPLE_REPORT } from '../data/report';
import type { VehicleService } from './vehicle-service';

const LATENCY_MS = 450;

export const mockVehicleService: VehicleService = {
	async getHealthReport(_vehicleId: string) {
		await new Promise((resolve) => setTimeout(resolve, LATENCY_MS));
		return SAMPLE_REPORT;
	},
};
