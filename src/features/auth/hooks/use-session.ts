import { useSessionStore } from '../stores/session-store';
import type { AuthUser } from '../types';

export function useSessionStatus() {
	return useSessionStore((state) => state.status);
}

export function useIsAuthenticated(): boolean {
	return useSessionStore((state) => state.status === 'authenticated');
}

export function useCurrentUser(): AuthUser | null {
	return useSessionStore((state) => state.user);
}

export function useVehicleId(): string | null {
	return useSessionStore((state) => state.vehicleId);
}

export function useConnectVehicle() {
	return useSessionStore((state) => state.connectVehicle);
}

export function useSignOut() {
	return useSessionStore((state) => state.signOut);
}
