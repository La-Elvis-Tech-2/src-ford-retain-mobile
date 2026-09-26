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

SplashScreen.preventAutoHideAsync().catch(() => undefined);
SplashScreen.setOptions({ duration: 250, fade: true });

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
	return (
		<AppProviders>
			<Screen>
				<ErrorBoundaryContent error={error} retry={retry} />
			</Screen>
		</AppProviders>
	);
}

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

export default function RootLayout() {
	const [fontsLoaded, fontError] = useFonts(APP_FONTS);
	const sessionStatus = useSessionStatus();

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
