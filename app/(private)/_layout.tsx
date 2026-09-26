import { Redirect, Stack } from 'expo-router';
import { useIsAuthenticated } from '@/features/auth/hooks/use-session';
import { ROUTES } from '@/routes/routes';

export default function PrivateLayout() {
	const isAuthenticated = useIsAuthenticated();

	if (!isAuthenticated) {
		return <Redirect href={ROUTES.welcome} />;
	}

	return <Stack screenOptions={{ headerShown: false }} />;
}
