import type { HealthReport } from '../types';

/**
 * Contrato do veículo. As telas dependem SÓ desta interface (via
 * `useHealthReport`), então trocar o mock pela API não toca em componente.
 */
export type VehicleService = {
	/** A leitura mais recente dos módulos, já com o histórico na rede. */
	getHealthReport(vehicleId: string): Promise<HealthReport>;
};
