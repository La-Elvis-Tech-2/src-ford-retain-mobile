export type LineItem = {
	description: string;
	cents: number;
};

/** O pacote que o laudo recomenda — preço fechado, peças e mão de obra. */
export type ServicePackage = {
	title: string;
	subtitle: string;
	services: string[];
	parts: LineItem[];
	labor: LineItem[];
	durationLabel: string;
	warranty: string;
	/** O que custa deixar para depois — e por quê. */
	later: { cents: number; reason: string; comparedToCents: number };
};

/** Um horário da semana com vaga — `weekday` no padrão do `Date` (0 = domingo). */
export type Opening = {
	weekday: number;
	times: string[];
};

export type Dealer = {
	id: string;
	name: string;
	address: string;
	district: string;
	/** O desvio a partir da rota diária — não a distância de casa. */
	detourKm: string;
	detourMinutes: number;
	rating: number;
	reviews: number;
	/** O selo de "melhor opção", com o motivo. */
	highlight?: string;
	openings: Opening[];
};

export type ServiceSlot = {
	id: string;
	dealerId: string;
	/** `2026-09-27`. */
	date: string;
	/** `08:00`. */
	time: string;
	/** `Sáb`. */
	weekdayLabel: string;
	/** `27/09`. */
	dayLabel: string;
};

export type Booking = {
	id: string;
	dealerId: string;
	slot: ServiceSlot;
	totalCents: number;
};

export type BookServiceInput = {
	dealerId: string;
	slot: ServiceSlot;
	totalCents: number;
};
