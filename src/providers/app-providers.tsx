import { focusManager, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useEffect, useState } from 'react';
import { AppState, type AppStateStatus, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { createQueryClient } from '@/lib/query-client';
import { ScaleProvider } from '@/theme/scale';

export function AppProviders({ children }: { children: ReactNode }) {
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
			<SafeAreaProvider initialMetrics={initialWindowMetrics}>
				<QueryClientProvider client={queryClient}>
					<ScaleProvider>{children}</ScaleProvider>
				</QueryClientProvider>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}
