import { QueryClient } from '@tanstack/react-query';

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
