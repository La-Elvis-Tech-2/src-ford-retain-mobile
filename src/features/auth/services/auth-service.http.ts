import { httpClient } from '@/services/http/http-client';
import type { AuthSession, ConnectVehicleInput } from '../types';
import type { AuthService } from './auth-service';

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
