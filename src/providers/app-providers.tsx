import { focusManager, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useEffect, useState } from 'react';
import { AppState, type AppStateStatus, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { createQueryClient } from '@/lib/query-client';
import { ScaleProvider } from '@/theme/scale';

/**
 * Providers de infraestrutura do app, por fora de qualquer navegação.
 *
 * TODO(offline): para pausar queries sem rede, instalar
 * @react-native-community/netinfo e ligar o `onlineManager` do React Query aqui.
 */
export function AppProviders({ children }: { children: ReactNode }) {
	// Instância criada uma vez por montagem do app (nunca no módulo, para não
	// vazar cache entre testes / fast refresh).
	const [queryClient] = useState(createQueryClient);

	useEffect(() => {
		const subscription = AppState.addEventListener('change', (status: AppStateStatus) => {
			if (Platform.OS !== 'web') {
				focusManager.setFocused(status === 'active');
			}
		});

		return () => subscription.remove();
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			{/*
			 * Com as medidas iniciais da janela, o primeiro quadro já nasce com a
			 * safe area certa — sem elas, a primeira tela pinta com inset zero e
			 * pula para baixo da barra de status um quadro depois.
			 */}
			<SafeAreaProvider initialMetrics={initialWindowMetrics}>
				<QueryClientProvider client={queryClient}>
					<ScaleProvider>{children}</ScaleProvider>
				</QueryClientProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}
