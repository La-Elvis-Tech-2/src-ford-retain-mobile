import type { HealthReport } from '../types';

/**
 * O laudo da Ranger do cenário "conectado" do site (ford/src/data/mock.ts):
 * mesmos componentes, mesmas medidas, mesmas explicações.
 *
 * O que o site não tinha e o app precisa é a NOTA de cada componente — o
 * site pintava por status, o app desenha barras e variações. As notas foram
 * escolhidas para cair no mesmo status que o site mostra (ver `statusOf`):
 * óleo e pastilha urgentes, filtros e bateria em atenção, o resto em dia.
 *
 * TODO(api): trocar pela leitura dos módulos que o backend da rede devolver.
 */
export const SAMPLE_REPORT: HealthReport = {
	vehicle: {
		id: 'ranger-4417',
		model: 'Ranger Limited 2.0',
		year: 2023,
		color: 'Preto Sublime',
		maskedPlate: '•••• 4417',
		km: 78_420,
		kmSource: 'Lida pelo módulo hoje, 07h12',
		monthlyKm: 1_180,
	},
	readAt: 'Hoje, 07h12',
	components: [
		{
			id: 'oil',
			name: 'Óleo e filtro',
			icon: 'oil',
			systemId: 'engine',
			health: 18,
			healthLastWeek: 26,
			detail: 'Vencido há 1.850 km · última troca aos 66.570 km',
			explanation:
				'O intervalo deste motor é de 10.000 km ou 12 meses. Rodando além disso, o óleo perde viscosidade e o desgaste interno acelera de forma que não volta atrás.',
		},
		{
			id: 'brake-pad',
			name: 'Pastilha de freio',
			icon: 'brake-pad',
			systemId: 'brakes',
			health: 31,
			healthLastWeek: 35,
			detail: 'Dianteira com 2,1 mm · ~1.100 km restantes',
			explanation:
				'O limite de segurança é 3 mm e o sensor já acusa 2,1 mm. Abaixo de 1,5 mm o material encosta no disco e o conserto deixa de ser só a pastilha.',
		},
		{
			id: 'battery',
			name: 'Bateria',
			icon: 'battery',
			systemId: 'battery',
			health: 55,
			healthLastWeek: 58,
			detail: '12,1 V na partida a frio · 3 anos e 2 meses de uso',
			explanation:
				'A tensão ainda está dentro do aceitável, mas vem caindo mês a mês. Testamos sem custo na visita e só trocamos se o teste reprovar.',
		},
		{
			id: 'air-filter',
			name: 'Filtro de ar',
			icon: 'air-filter',
			systemId: 'engine',
			health: 58,
			healthLastWeek: 61,
			detail: 'Saturação estimada em 78% · ~3.400 km restantes',
			explanation:
				'Filtro saturado faz o motor trabalhar mais para respirar e aparece no consumo. Ainda dá para rodar, mas vale aproveitar a mesma visita.',
		},
		{
			id: 'cabin-filter',
			name: 'Filtro de cabine',
			icon: 'cabin-filter',
			systemId: 'engine',
			health: 64,
			healthLastWeek: 66,
			detail: 'Em uso há 14 meses · ~2.900 km restantes',
			explanation:
				'É o filtro do ar que entra na cabine. Não afeta a mecânica, mas depois de um ano em rodízio urbano costuma estar bem carregado.',
		},
		{
			id: 'tires',
			name: 'Pneus e alinhamento',
			icon: 'tires',
			systemId: 'tires',
			health: 84,
			healthLastWeek: 82,
			detail: 'Sulco médio de 4,8 mm · desgaste uniforme nos quatro',
			explanation:
				'Desgaste uniforme indica alinhamento e calibragem em ordem; a calibragem de sábado subiu a nota. O limite legal é 1,6 mm de sulco.',
			slack: '~14.000 km de folga',
		},
		{
			id: 'spark-plugs',
			name: 'Velas',
			icon: 'spark-plugs',
			systemId: 'engine',
			health: 86,
			healthLastWeek: 87,
			detail: 'Trocadas aos 71.800 km · próxima aos 91.800 km',
			explanation: 'Intervalo de 20.000 km. Não há falha de combustão registrada nos últimos 90 dias.',
			slack: '~13.400 km de folga',
		},
		{
			id: 'brake-fluid',
			name: 'Fluido de freio',
			icon: 'brake-fluid',
			systemId: 'brakes',
			health: 88,
			healthLastWeek: 88,
			detail: 'Trocado em 11/2025 · próxima troca em 11/2027',
			explanation: 'Troca a cada 24 meses. O teor de umidade medido está em 1,4%, bem abaixo do limite de 3%.',
			slack: '14 meses de folga',
		},
		{
			id: 'belt',
			name: 'Correia',
			icon: 'belt',
			systemId: 'engine',
			health: 92,
			healthLastWeek: 92,
			detail: 'Trocada aos 61.300 km · próxima aos 121.300 km',
			explanation: 'A correia dentada deste motor tem intervalo de 60.000 km. A última troca está registrada na rede.',
			slack: '~42.900 km de folga',
		},
		{
			id: 'cooling',
			name: 'Arrefecimento',
			icon: 'cooling',
			systemId: 'engine',
			health: 95,
			healthLastWeek: 95,
			detail: 'Nível normal · temperatura estável em 91 °C',
			explanation: 'O aditivo foi trocado em 2024 e tem validade de 5 anos. Sem perda de nível no período monitorado.',
			slack: '~3 anos de folga',
		},
	],
	insight: {
		lead: 'Ford Assist percebeu.',
		body: 'O óleo venceu há 1.850 km e a pastilha dianteira está em 2,1 mm. A Ford Tatuapé fica a 7 min da sua rota e resolve os dois numa visita só.',
	},
	provenance: {
		servicesInNetwork: 4,
		resaleGainCents: 7_400_00,
		badge: 'Histórico Ford completo',
	},
};
