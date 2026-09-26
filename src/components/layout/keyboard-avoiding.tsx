import type { ReactNode } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Sobe o conteúdo da tela para o teclado não cobrir o campo nem o botão do
 * rodapé.
 *
 * `padding` nas DUAS plataformas: no Android edge-to-edge a janela não encolhe
 * com o teclado (o `adjustResize` não age mais), então sem o padding o botão
 * "Conectar" e o campo do chat ficavam atrás dele.
 *
 * O deslocamento é a faixa da barra de status do `Screen`: o
 * `KeyboardAvoidingView` mede a própria posição em relação ao pai, que começa
 * abaixo dessa faixa, e sem descontá-la a folga ficava curta nessa medida.
 */
export function KeyboardAvoiding({ children }: { children: ReactNode }) {
	const insets = useSafeAreaInsets();

	return (
		<KeyboardAvoidingView className='flex-1' behavior='padding' keyboardVerticalOffset={insets.top}>
			{children}
		</KeyboardAvoidingView>
	);
}
