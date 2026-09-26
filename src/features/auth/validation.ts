/**
 * Placa brasileira: o padrão antigo (`ABC1234`) e o Mercosul (`ABC1D23`).
 * As duas convivem na rua, e a pessoa digita a que está no carro dela.
 */
const PLATE_PATTERN = /^[A-Z]{3}\d[A-Z0-9]\d{2}$/;

/** Tira traço e espaço e sobe para caixa alta — o que a pessoa digitar vira o formato da busca. */
export function normalizePlate(value: string): string {
	return value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}

export function isValidPlate(value: string): boolean {
	return PLATE_PATTERN.test(normalizePlate(value));
}

/**
 * `abc1d23` -> `ABC-1D23`. Só para exibir enquanto digita: o traço ajuda a
 * conferir a placa contra a do carro, mas não é parte dela.
 */
export function formatPlateInput(value: string): string {
	const plate = normalizePlate(value).slice(0, 7);
	return plate.length > 3 ? `${plate.slice(0, 3)}-${plate.slice(3)}` : plate;
}
