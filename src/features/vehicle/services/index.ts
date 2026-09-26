import { env } from '@/config/env';
import type { VehicleService } from './vehicle-service';
import { httpVehicleService } from './vehicle-service.http';
import { mockVehicleService } from './vehicle-service.mock';

/** Ponto único de troca mock <-> HTTP (ver `EXPO_PUBLIC_API_URL`). */
export const vehicleService: VehicleService = env.hasApi ? httpVehicleService : mockVehicleService;

export type { VehicleService };
