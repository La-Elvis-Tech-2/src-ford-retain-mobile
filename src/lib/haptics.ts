import * as Haptics from 'expo-haptics';

/**
 * Retorno tátil do app.
 *
 * Os motores de vibração são diferentes em cada plataforma — o Taptic Engine do
 * iPhone tem intensidade e duração próprias, o Android tem um motor comum e um
 * catálogo de efeitos do sistema. O `expo-haptics` já resolve isso; o que este
 * arquivo acrescenta é o VOCABULÁRIO: quem chama diz o que aconteceu ("um
 * toque", "escolheu", "deu erro"), nunca qual vibração tocar. Assim a mesma
 * intenção soa igual em todo o app, e ajustar a paleta tátil é mexer aqui.
 *
 * A regra de uso: a vibração NUNCA é o único aviso de alguma coisa. Ela dobra
 * um sinal que já existe na tela — o botão que encolhe, a marca de seleção que
 * acende, a mensagem de erro que aparece. Aparelho com vibração desligada,
 * emulador sem motor e quem não sente a diferença continuam entendendo o app.
 *
 * Por isso também nada aqui é `await`: uma falha do motor não pode segurar nem
 * quebrar a ação que a pessoa pediu.
 */

export type HapticIntent =
	/** Um controle foi acionado — o toque em um botão. */
	| 'tap'
	/** A escolha mudou dentro de uma lista de opções. */
	| 'select'
	/** A ação terminou bem. */
	| 'success'
	/** A ação não passou — validação, credencial recusada, rede fora. */
	| 'error';

const PATTERNS: Record<HapticIntent, () => Promise<void>> = {
	// `Light`, e não `Medium`: é o toque que acompanha CADA botão do app, e
	// nessa frequência qualquer coisa mais forte cansa a mão.
	tap: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
	// O efeito que o iOS usa em seletor e picker — o mais seco dos três.
	select: () => Haptics.selectionAsync(),
	success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
	error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
};

/**
 * Dispara a vibração de uma intenção. Não bloqueia e não lança: sem motor
 * (emulador, aparelho com háptica desligada) a chamada falha em silêncio.
 */
export function haptic(intent: HapticIntent): void {
	PATTERNS[intent]().catch(() => {
		// Sem motor ou sem permissão: seguir sem vibrar é o comportamento certo.
	});
}
