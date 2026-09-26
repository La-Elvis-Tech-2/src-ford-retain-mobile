export type ServiceRecord = {
	id: string;
	dateLabel: string;
	km: number;
	title: string;
	dealer: string;
};

export const SAMPLE_HISTORY: ServiceRecord[] = [
	{ id: 'plugs', dateLabel: 'Fev 2026', km: 71_800, title: 'Troca das velas', dealer: 'Ford Aricanduva' },
	{ id: 'fluid', dateLabel: 'Nov 2025', km: 67_400, title: 'Troca do fluido de freio', dealer: 'Ford Tatuapé' },
	{ id: 'oil', dateLabel: 'Out 2025', km: 66_570, title: 'Revisão com troca de óleo', dealer: 'Ford Tatuapé' },
	{ id: 'belt', dateLabel: 'Mar 2025', km: 61_300, title: 'Troca da correia dentada', dealer: 'Ford Tatuapé' },
];
