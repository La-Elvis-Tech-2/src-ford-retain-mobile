import { type ReactNode, useEffect } from 'react';
import { useSessionStore } from '../stores/session-store';

/**
 * Restaura a sessão persistida antes de qualquer decisão de rota.
 *
 * Sem isso, o app renderiza um frame como "deslogado" e joga a pessoa para o
 * login mesmo com sessão válida no storage.
 *
 * Enquanto o status é "bootstrapping" nada é renderizado de propósito: quem
 * cobre a tela nesse intervalo é o splash nativo, segurado no layout raiz.
 */
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
