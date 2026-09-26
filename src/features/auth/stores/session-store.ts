import { create } from 'zustand';
import { httpClient } from '@/services/http/http-client';
import { secureStorage } from '@/services/storage/secure-storage';
import { authService } from '../services';
import type { AuthSession, AuthUser, ConnectVehicleInput } from '../types';

const SESSION_STORAGE_KEY = 'fordretain.session';

export type SessionStatus =
	/** Ainda lendo o storage no boot — não decida rota nesse estado. */
	'bootstrapping' | 'authenticated' | 'unauthenticated';

export type SessionState = {
	status: SessionStatus;
	user: AuthUser | null;
	vehicleId: string | null;
	accessToken: string | null;
	bootstrap: () => Promise<void>;
	connectVehicle: (input: ConnectVehicleInput) => Promise<void>;
	signOut: () => Promise<void>;
};

const SIGNED_OUT = { status: 'unauthenticated', user: null, vehicleId: null, accessToken: null } as const;

export const useSessionStore = create<SessionState>((set, get) => ({
	status: 'bootstrapping',
	user: null,
	vehicleId: null,
	accessToken: null,

	/** Restaura a sessão persistida. Chamado uma vez, no layout raiz. */
	async bootstrap() {
		// Keychain/Keystore podem falhar (aparelho bloqueado no boot, storage
		// corrompido). Cair como deslogado é ruim; ficar preso no splash à
		// espera de uma promise que rejeitou é pior.
		const stored = await secureStorage.getJson<AuthSession>(SESSION_STORAGE_KEY).catch(() => null);

		if (!stored) {
			set(SIGNED_OUT);
			return;
		}

		set({
			status: 'authenticated',
			user: stored.user,
			vehicleId: stored.vehicleId,
			accessToken: stored.tokens.accessToken,
		});
	},

	async connectVehicle(input) {
		const session = await authService.connectVehicle(input);
		await secureStorage.setJson(SESSION_STORAGE_KEY, session);

		set({
			status: 'authenticated',
			user: session.user,
			vehicleId: session.vehicleId,
			accessToken: session.tokens.accessToken,
		});
	},

	async signOut() {
		if (get().status === 'authenticated') {
			// Falha de rede no logout não pode prender a pessoa no app.
			await authService.signOut().catch(() => undefined);
		}

		await secureStorage.remove(SESSION_STORAGE_KEY);
		set(SIGNED_OUT);
	},
}));

// Liga o cliente HTTP à sessão sem criar import circular: o store conhece o
// cliente, o cliente só conhece estas duas funções.
httpClient.configure({
	getAccessToken: () => useSessionStore.getState().accessToken,
	onUnauthorized: () => {
		void useSessionStore.getState().signOut();
	},
});
