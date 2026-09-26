/** Um serviço registrado no chassi, na rede Ford. */
export type ServiceRecord = {
	id: string;
	dateLabel: string;
	km: number;
	title: string;
	dealer: string;
};

/**
 * O histórico na rede, o mais recente primeiro. As datas e quilometragens são
 * as do laudo do site: óleo aos 66.570 km (10/2025), fluido em 11/2025, correia
 * aos 61.300 km e velas aos 71.800 km — quatro registros, o "4 revisões" do
 * cartão de procedência.
 *
 * TODO(api): trocar pelo histórico do chassi que o backend da rede devolver.
 */
export const SAMPLE_HISTORY: ServiceRecord[] = [
	{ id: 'plugs', dateLabel: 'Fev 2026', km: 71_800, title: 'Troca das velas', dealer: 'Ford Aricanduva' },
	{ id: 'fluid', dateLabel: 'Nov 2025', km: 67_400, title: 'Troca do fluido de freio', dealer: 'Ford Tatuapé' },
	{ id: 'oil', dateLabel: 'Out 2025', km: 66_570, title: 'Revisão com troca de óleo', dealer: 'Ford Tatuapé' },
	{ id: 'belt', dateLabel: 'Mar 2025', km: 61_300, title: 'Troca da correia dentada', dealer: 'Ford Tatuapé' },
];
