import type { Dealer, ServicePackage } from '../types';

export const SAMPLE_PACKAGE: ServicePackage = {
	title: 'Revisão recomendada',
	subtitle: 'Resolve os 2 itens urgentes e os 2 filtros na mesma visita.',
	services: [
		'Troca de óleo sintético 5W30 e filtro de óleo',
		'Substituição das pastilhas de freio dianteiras',
		'Troca do filtro de ar do motor',
		'Troca do filtro de cabine (antipólen)',
		'Inspeção de 32 pontos e teste da bateria',
	],
	parts: [
		{ description: 'Óleo sintético 5W30 (7,7 L) e filtro', cents: 520_00 },
		{ description: 'Pastilhas dianteiras originais Ford', cents: 480_00 },
		{ description: 'Filtro de ar do motor', cents: 165_00 },
		{ description: 'Filtro de cabine', cents: 140_00 },
	],
	labor: [{ description: 'Mão de obra (1h30 de serviço)', cents: 290_00 }],
	durationLabel: '1h30',
	warranty: 'Peças e serviço com 1 ano de garantia na rede Ford.',
	later: {
		cents: 3_900_00,
		reason: 'Se a pastilha chegar ao disco, o reparo passa de R$ 3.900.',
		comparedToCents: 480_00,
	},
};

export const SAMPLE_DEALERS: Dealer[] = [
	{
		id: 'tatuape',
		name: 'Ford Tatuapé',
		address: 'R. Serra de Bragança, 1.302',
		district: 'Tatuapé, São Paulo',
		detourKm: '2,8 km',
		detourMinutes: 7,
		rating: 4.8,
		reviews: 2107,
		highlight: 'Mais perto da sua rota',
		openings: [
			{ weekday: 1, times: ['09:00'] },
			{ weekday: 3, times: ['14:00'] },
			{ weekday: 6, times: ['08:00', '10:30'] },
		],
	},
	{
		id: 'aricanduva',
		name: 'Ford Aricanduva',
		address: 'Av. Aricanduva, 5.555',
		district: 'Vila Matilde, São Paulo',
		detourKm: '4,2 km',
		detourMinutes: 9,
		rating: 4.7,
		reviews: 1284,
		openings: [
			{ weekday: 2, times: ['10:00'] },
			{ weekday: 4, times: ['09:00', '14:30'] },
			{ weekday: 5, times: ['08:30'] },
		],
	},
	{
		id: 'vila-prudente',
		name: 'Ford Vila Prudente',
		address: 'Av. Prof. Luiz Ignácio Anhaia Mello, 2.140',
		district: 'Vila Prudente, São Paulo',
		detourKm: '6,1 km',
		detourMinutes: 14,
		rating: 4.5,
		reviews: 862,
		openings: [
			{ weekday: 1, times: ['13:00'] },
			{ weekday: 5, times: ['08:30', '16:00'] },
		],
	},
];
