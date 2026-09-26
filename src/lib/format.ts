export function groupThousands(value: number): string {
	return Math.trunc(Math.abs(value))
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatKm(km: number): string {
	return `${groupThousands(km)} km`;
}

export function formatMoney(cents: number): string {
	const sign = cents < 0 ? '-' : '';
	const fixed = (Math.abs(cents) / 100).toFixed(2);
	return `${sign}R$ ${groupThousands(Number(fixed.slice(0, -3)))},${fixed.slice(-2)}`;
}

export function formatMoneyShort(cents: number): string {
	const sign = cents < 0 ? '-' : '';
	return `${sign}R$ ${groupThousands(cents / 100)}`;
}

export function formatDelta(value: number): string {
	if (value === 0) {
		return '0';
	}

	return value > 0 ? `+${value}` : `–${Math.abs(value)}`;
}
