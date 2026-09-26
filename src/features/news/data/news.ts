import type { NewsItem } from '../types';

/**
 * As novidades da home — a seção "Новини" do layout, com o que a rede Ford
 * tem para dizer ao dono de uma Ranger.
 *
 * TODO(api): trocar pelo feed da rede, filtrado pelo modelo e pela região.
 */
export const SAMPLE_NEWS: NewsItem[] = [
	{
		id: 'recall-check',
		tag: 'Segurança',
		title: 'Nenhum recall pendente no seu chassi',
		summary: 'Conferimos sua Ranger contra todas as campanhas abertas da Ford no Brasil.',
		body: [
			'Toda semana o app cruza o chassi da sua Ranger com as campanhas de recall abertas pela Ford no Brasil.',
			'Na última verificação, hoje às 07h12, não havia nenhuma campanha pendente para o seu veículo. Se alguma aparecer, você recebe um aviso aqui e o serviço é gratuito em qualquer concessionária da rede.',
		],
		dateLabel: 'Hoje',
		art: 'recall',
	},
	{
		id: 'battery-season',
		tag: 'Oferta',
		title: 'Teste de bateria grátis até 31 de outubro',
		summary: 'Com a virada do tempo, a partida a frio cobra mais da bateria. O teste leva 10 minutos.',
		body: [
			'Baterias com mais de três anos de uso, como a da sua Ranger, são as que mais falham nas manhãs frias.',
			'Até 31 de outubro, o teste de carga é gratuito em toda a rede. Se reprovar, a bateria Motorcraft sai com 15% de desconto e instalação inclusa.',
		],
		dateLabel: 'Há 2 dias',
		art: 'battery',
	},
	{
		id: 'ranger-raptor',
		tag: 'Lançamento',
		title: 'Ranger Raptor 2027 chega às concessionárias',
		summary: 'Motor V6 biturbo de 397 cv e suspensão Fox Live Valve. Test-drive já pode ser agendado.',
		body: [
			'A Ranger Raptor 2027 chega com motor V6 3.0 biturbo de 397 cv, suspensão Fox Live Valve e seis modos de condução.',
			'Clientes com histórico Ford completo têm avaliação do usado com prioridade na troca, e o seu histórico entra na conta.',
		],
		dateLabel: 'Há 5 dias',
		art: 'ranger',
	},
];
