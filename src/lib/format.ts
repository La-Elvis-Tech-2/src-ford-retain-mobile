/**
 * Números em texto, no formato do Brasil.
 *
 * Não usa `Intl`: o Hermes do Android só traz o `Intl` completo com a opção de
 * build ligada, e um separador de milhar diferente entre as duas plataformas é
 * o tipo de erro que só aparece na mão de quem usa.
 */

/** `78420` -> `78.420`. */
export function groupThousands(value: number): string {
	return Math.trunc(Math.abs(value))
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/** `78420` -> `78.420 km`. */
export function formatKm(km: number): string {
	return `${groupThousands(km)} km`;
}

/**
 * `159500` -> `R$ 1.595,00`.
 *
 * Dinheiro anda em CENTAVOS inteiros no app inteiro; a conversão para real
 * acontece só aqui, na última parada antes da tela. Somar reais em ponto
 * flutuante produz, cedo ou tarde, um orçamento que não fecha por um centavo.
 */
export function formatMoney(cents: number): string {
	const sign = cents < 0 ? '-' : '';
	const fixed = (Math.abs(cents) / 100).toFixed(2);
	return `${sign}R$ ${groupThousands(Number(fixed.slice(0, -3)))},${fixed.slice(-2)}`;
}

/** `159500` -> `R$ 1.595`. Sem centavos, para onde a largura é escassa. */
export function formatMoneyShort(cents: number): string {
	const sign = cents < 0 ? '-' : '';
	return `${sign}R$ ${groupThousands(cents / 100)}`;
}

/**
 * `2` -> `+2`; `-5` -> `–5`; `0` -> `0`.
 *
 * O negativo é travessão (–), não hífen: em corpo 12 o hífen colado no número
 * some, e "-5" passa a ser lido como "5".
 */
export function formatDelta(value: number): string {
	if (value === 0) {
		return '0';
	}

	return value > 0 ? `+${value}` : `–${Math.abs(value)}`;
}
