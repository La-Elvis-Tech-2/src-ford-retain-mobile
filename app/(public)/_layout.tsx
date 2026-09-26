import { Redirect, Stack } from 'expo-router';
import { useIsAuthenticated } from '@/features/auth/hooks/use-session';
import { ROUTES } from '@/routes/routes';

/**
 * Guard de rota PÚBLICA: quem já conectou o carro não vê a abertura. É também
 * o que leva para a home ao fim da conexão — a tela da placa só abre a sessão.
 */
export default function PublicLayout() {
	const isAuthenticated = useIsAuthenticated();

	if (isAuthenticated) {
		return <Redirect href={ROUTES.home} />;
	}

	return <Stack screenOptions={{ headerShown: false }} />;
}
