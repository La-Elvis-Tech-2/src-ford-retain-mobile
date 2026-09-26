import { type ReactNode, useEffect } from 'react';
import { useSessionStore } from '../stores/session-store';

export function SessionBootstrap({ children }: { children: ReactNode }) {
	const status = useSessionStore((state) => state.status);
	const bootstrap = useSessionStore((state) => state.bootstrap);

	useEffect(() => {
		void bootstrap();
	}, [bootstrap]);

	if (status === 'bootstrapping') {
		return null;
	}

	return <>{children}</>;
}
