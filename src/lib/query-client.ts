import { QueryClient } from '@tanstack/react-query';

/**
 * Defaults pensados para mobile: rede instável e app indo para background.
 * `refetchOnWindowFocus` é substituído pelo `focusManager` ligado ao AppState
 * em src/providers/app-providers.tsx.
 */
export function createQueryClient(): QueryClient {
	return new QueryClient({
		defaultOptions: {
			queries: {
				retry: 2,
				staleTime: 30_000,
				gcTime: 5 * 60_000,
				refetchOnWindowFocus: true,
				refetchOnReconnect: true,
			},
			mutations: {
				retry: 0,
			},
		},
	});
}
