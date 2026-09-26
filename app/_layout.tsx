import '../global.css';

import { useFonts } from 'expo-font';
import { type ErrorBoundaryProps, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Screen } from '@/components/layout/screen';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { SessionBootstrap } from '@/features/auth/components/session-bootstrap';
import { useSessionStatus } from '@/features/auth/hooks/use-session';
import { AppProviders } from '@/providers/app-providers';
import { APP_FONTS } from '@/theme/fonts';
import { ITEM_GAP, SECTION_GAP } from '@/theme/layout';
import { useScaler } from '@/theme/scale';

// Em escopo global e sem await, como a documentação do expo-splash-screen pede:
// o splash nativo tem que ser segurado antes do primeiro render. O `.catch`
// evita a rejeição não tratada quando o splash já foi escondido (relançar o
// bundle em dev, retomar o app).
SplashScreen.preventAutoHideAsync().catch(() => undefined);
SplashScreen.setOptions({ duration: 250, fade: true });

/**
 * Última rede de proteção contra erro de render. Sem ela, em release, a tela
 * fica branca e o app parece travado.
 */
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
	return (
		<AppProviders>
			<Screen>
				<ErrorBoundaryContent error={error} retry={retry} />
			</Screen>
		</AppProviders>
	);
}

/** Separado para poder usar `useScaler`, que só existe dentro dos providers. */
function ErrorBoundaryContent({ error, retry }: ErrorBoundaryProps) {
	const px = useScaler();

	return (
		<View className='flex-1 justify-center' style={{ gap: px(ITEM_GAP) }}>
			<Text variant='title'>Algo deu errado</Text>
			<Text variant='muted'>
				O app encontrou um problema inesperado. Tente de novo. Se continuar, feche e abra o aplicativo.
			</Text>
			{__DEV__ ? <Text variant='danger'>{error.message}</Text> : null}
			<View style={{ paddingTop: px(SECTION_GAP) }}>
				<Button label='Tentar de novo' onPress={retry} />
			</View>
		</View>
	);
}

/**
 * Layout raiz — só infraestrutura. Nenhuma tela aqui.
 *
 * A divisão real acontece nos grupos filhos:
 *   (public)  -> sem carro conectado (abertura e placa)
 *   (private) -> exige sessão: as abas e as telas de pilha
 */
export default function RootLayout() {
	// A Archivo é embarcada: a primeira tela só pode ser pintada depois que as
	// faces estiverem registradas, senão o texto entra na fonte do sistema e
	// troca no quadro seguinte.
	const [fontsLoaded, fontError] = useFonts(APP_FONTS);
	const sessionStatus = useSessionStatus();

	// Erro de fonte não pode prender o app no splash: seguir com a face do
	// sistema é ruim, ficar preso na tela de abertura é pior.
	const fontsReady = fontsLoaded || fontError !== null;
	const isReady = fontsReady && sessionStatus !== 'bootstrapping';

	useEffect(() => {
		if (isReady) {
			SplashScreen.hideAsync().catch(() => undefined);
		}
	}, [isReady]);

	return (
		<AppProviders>
			{fontsReady ? (
				<SessionBootstrap>
					<Stack screenOptions={{ headerShown: false }} />
				</SessionBootstrap>
			) : null}
			<StatusBar style='dark' />
		</AppProviders>
	);
}
