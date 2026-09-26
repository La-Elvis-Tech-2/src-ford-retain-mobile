import type { Dealer, LineItem, ServicePackage, ServiceSlot } from './types';

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'] as const;

/** Quantos dias à frente a agenda olha. Duas semanas cobrem qualquer concessionária da lista. */
const HORIZON_DAYS = 14;

function pad(value: number): string {
	return String(value).padStart(2, '0');
}

/**
 * Os próximos horários com vaga, a partir de AMANHÃ — hoje já não dá para
 * encaixar um carro na oficina.
 *
 * A data é montada com os campos locais do `Date`, e não com `toISOString`:
 * o ISO sai em UTC, e às 22h de São Paulo "amanhã" já seria depois de amanhã.
 */
export function upcomingSlots(dealer: Dealer, from: Date, limit = 6): ServiceSlot[] {
	const slots: ServiceSlot[] = [];

	for (let offset = 1; offset <= HORIZON_DAYS && slots.length < limit; offset += 1) {
		const day = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset);
		const opening = dealer.openings.find((candidate) => candidate.weekday === day.getDay());

		for (const time of opening?.times ?? []) {
			const date = `${day.getFullYear()}-${pad(day.getMonth() + 1)}-${pad(day.getDate())}`;
			slots.push({
				id: `${dealer.id}-${date}-${time}`,
				dealerId: dealer.id,
				date,
				time,
				weekdayLabel: WEEKDAYS[day.getDay()] ?? '',
				dayLabel: `${pad(day.getDate())}/${pad(day.getMonth() + 1)}`,
			});
		}
	}

	return slots.slice(0, limit);
}

/** "sáb 27/09 às 08:00" — como a data aparece dentro de uma frase. */
export function slotSentence(slot: ServiceSlot): string {
	return `${slot.weekdayLabel.toLowerCase()} ${slot.dayLabel} às ${slot.time}`;
}

export function sumCents(items: readonly LineItem[]): number {
	return items.reduce((total, item) => total + item.cents, 0);
}

/** Peças, mão de obra e total — o total nunca é digitado, sempre somado. */
export function packageTotals(pkg: ServicePackage): { partsCents: number; laborCents: number; totalCents: number } {
	const partsCents = sumCents(pkg.parts);
	const laborCents = sumCents(pkg.labor);
	return { partsCents, laborCents, totalCents: partsCents + laborCents };
}

/** Quantas vezes mais caro fica esperar — "8×". Arredondado para baixo: o número não pode exagerar. */
export function laterMultiplier(pkg: ServicePackage): number {
	return Math.floor(pkg.later.cents / pkg.later.comparedToCents);
}
