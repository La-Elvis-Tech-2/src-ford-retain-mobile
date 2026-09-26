import type { ConnectVehicleInput } from '../types';
import type { AuthService } from './auth-service';

const LATENCY_MS = 700;

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Sessão falsa para o app rodar sem backend.
 *
 * Qualquer placa válida encontra a mesma Ranger do laudo. A exceção é
 * `AAA0000`, que falha de propósito: sem ela o estado de erro da tela não
 * teria como ser visto rodando o app.
 */
export const mockAuthService: AuthService = {
	async connectVehicle({ plate }: ConnectVehicleInput) {
		await delay(LATENCY_MS);

		if (plate === 'AAA0000') {
			throw new Error('Não encontramos esse veículo na rede Ford. Confira a placa e tente de novo.');
		}

		return {
			user: { id: 'mock-owner', name: 'Vitor Alves' },
			vehicleId: 'ranger-4417',
			tokens: { accessToken: 'mock-access-token', refreshToken: null },
		};
	},

	async signOut() {
		await delay(LATENCY_MS / 2);
	},
};
