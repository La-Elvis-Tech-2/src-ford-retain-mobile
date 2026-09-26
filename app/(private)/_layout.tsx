import { Redirect, Stack } from 'expo-router';
import { useIsAuthenticated } from '@/features/auth/hooks/use-session';
import { ROUTES } from '@/routes/routes';

/**
 * Guard de rota PRIVADA: sem carro conectado, ninguém passa daqui. Quem chega
 * deslogado cai na abertura, que é a primeira tela do produto.
 */
export default function PrivateLayout() {
	const isAuthenticated = useIsAuthenticated();

	if (!isAuthenticated) {
		return <Redirect href={ROUTES.welcome} />;
	}

	return <Stack screenOptions={{ headerShown: false }} />;
}
