import type { AuthSession, ConnectVehicleInput } from '../types';

export type AuthService = {
	connectVehicle(input: ConnectVehicleInput): Promise<AuthSession>;
	signOut(): Promise<void>;
};
