export type LineItem = {
	description: string;
	cents: number;
};

export type ServicePackage = {
	title: string;
	subtitle: string;
	services: string[];
	parts: LineItem[];
	labor: LineItem[];
	durationLabel: string;
	warranty: string;
	later: { cents: number; reason: string; comparedToCents: number };
};

export type Opening = {
	weekday: number;
	times: string[];
};

export type Dealer = {
	id: string;
	name: string;
	address: string;
	district: string;
	detourKm: string;
	detourMinutes: number;
	rating: number;
	reviews: number;
	highlight?: string;
	openings: Opening[];
};

export type ServiceSlot = {
	id: string;
	dealerId: string;
	date: string;
	time: string;
	weekdayLabel: string;
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
