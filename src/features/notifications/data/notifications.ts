import { ROUTES } from '@/routes/routes';
import type { AppNotification } from '../types';

export const SAMPLE_NOTIFICATIONS: AppNotification[] = [
	{
		id: 'oil-overdue',
		kind: 'alert',
		title: 'Óleo vencido há 1.850 km',
		body: 'Rodar além do intervalo acelera o desgaste interno do motor.',
		timeLabel: '07h12',
		target: { pathname: ROUTES.system, params: { systemId: 'engine' } },
	},
	{
		id: 'brake-pad',
		kind: 'alert',
		title: 'Pastilha dianteira em 2,1 mm',
		body: 'O limite de segurança é 3 mm. No seu ritmo, ela encosta no disco em umas 4 semanas.',
		timeLabel: '07h12',
		target: { pathname: ROUTES.system, params: { systemId: 'brakes' } },
	},
	{
		id: 'package-ready',
		kind: 'service',
		title: 'Seu orçamento está pronto',
		body: 'R$ 1.595 com preço fechado, resolvendo os itens urgentes e os filtros numa visita.',
		timeLabel: 'Ontem',
		target: ROUTES.service,
	},
	{
		id: 'battery-offer',
		kind: 'offer',
		title: 'Teste de bateria grátis',
		body: 'Até 31 de outubro, em toda a rede Ford.',
		timeLabel: 'Há 2 dias',
		target: { pathname: ROUTES.news, params: { newsId: 'battery-season' } },
	},
];
