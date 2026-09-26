import { httpClient } from '@/services/http/http-client';
import type { AuthSession, ConnectVehicleInput } from '../types';
import type { AuthService } from './auth-service';

/**
 * Implementação real. Os caminhos seguem o contrato combinado com o backend
 * da rede; enquanto ele não existe, `EXPO_PUBLIC_API_URL` fica vazio e o app
 * usa o mock.
 */
export const httpAuthService: AuthService = {
	connectVehicle(input: ConnectVehicleInput) {
		return httpClient.request<AuthSession>({
			path: '/auth/vehicle',
			method: 'POST',
			body: input,
			authenticated: false,
		});
	},

	async signOut() {
		await httpClient.request<void>({ path: '/auth/sign-out', method: 'POST' });
	},
};
