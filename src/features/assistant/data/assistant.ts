import { ROUTES } from '@/routes/routes';
import type { AssistantReply, ChatMessage } from '../types';

/**
 * As três falas que o assistente já deixou antes de a pessoa abrir o chat. São
 * elas o "3" em cima do ícone da aba: o chat não é só onde se pergunta, é onde
 * o carro avisa.
 */
export const PROACTIVE_MESSAGES: ChatMessage[] = [
	{
		id: 'proactive-oil',
		role: 'assistant',
		text: 'Oi, Vitor. O óleo da sua Ranger passou do prazo há 1.850 km. Rodar assim acelera o desgaste interno do motor, e esse desgaste não volta atrás.',
	},
	{
		id: 'proactive-brakes',
		role: 'assistant',
		text: 'A pastilha dianteira chegou a 2,1 mm (o limite é 3 mm). No seu ritmo de 1.180 km por mês, ela encosta no disco em umas 4 semanas.',
	},
	{
		id: 'proactive-package',
		role: 'assistant',
		text: 'Montei um pacote que resolve os dois e ainda troca os filtros numa visita só: R$ 1.595, 1h30, com 1 ano de garantia. A Ford Tatuapé fica a 7 min da sua rota.',
		action: { label: 'Ver revisão recomendada', route: ROUTES.service },
	},
];

/** As perguntas prontas embaixo da conversa. */
export const SUGGESTIONS = [
	'O que vence primeiro?',
	'Quanto custa a revisão?',
	'Dá para esperar?',
	'Quanto vale meu histórico?',
] as const;

type Rule = { match: RegExp; reply: AssistantReply };

/**
 * Respostas por palavra-chave, na ordem: a primeira regra que casar responde.
 * As mais específicas vêm antes ("esperar" antes de "pastilha"), senão "dá para
 * esperar a pastilha?" cairia na explicação da pastilha, e não no custo de
 * adiar.
 *
 * TODO(api): trocar pela resposta do modelo, que lê o laudo inteiro. Os
 * números aqui repetem o laudo de src/features/vehicle/data/report.ts.
 */
const RULES: Rule[] = [
	{
		match: /esperar|adiar|depois|segurar/,
		reply: {
			text: 'Óleo e pastilha não: os dois já passaram do ponto, e esperar a pastilha chegar ao disco transforma R$ 480 em mais de R$ 3.900. É 8× mais. Correia, velas, fluido de freio e arrefecimento estão em dia e podem esperar tranquilos.',
			action: { label: 'Ver o orçamento', route: ROUTES.service },
		},
	},
	{
		match: /vence|primeiro|urgente|prioridade/,
		reply: {
			text: 'Primeiro o óleo (vencido há 1.850 km), depois a pastilha dianteira (~1.100 km restantes). Em seguida vêm os dois filtros e a bateria, que pedem atenção mas não são urgentes.',
			action: { label: 'Ver freios', route: { pathname: ROUTES.system, params: { systemId: 'brakes' } } },
		},
	},
	{
		match: /quanto|preço|preco|custa|valor da revisão|orçamento|orcamento/,
		reply: {
			text: 'O pacote sai por R$ 1.595 com preço fechado: R$ 1.305 em peças originais e R$ 290 de mão de obra, 1h30 de serviço. Garantia de 1 ano em toda a rede.',
			action: { label: 'Agendar revisão', route: ROUTES.service },
		},
	},
	{
		match: /revenda|vender|histórico|historico|vale/,
		reply: {
			text: 'Sua Ranger tem 4 revisões registradas no chassi. Com o histórico Ford completo, ela vale até R$ 7.400 a mais na revenda do que a média do modelo sem histórico.',
		},
	},
	{
		match: /óleo|oleo/,
		reply: {
			text: 'A última troca foi aos 66.570 km, e o intervalo do motor é de 10.000 km ou 12 meses. Hoje ela está 1.850 km além do prazo.',
		},
	},
	{
		match: /pastilha|freio/,
		reply: {
			text: 'O sensor acusa 2,1 mm na dianteira. Abaixo de 1,5 mm o material encosta no disco e o conserto deixa de ser só a pastilha. O fluido de freio está em dia até 11/2027.',
		},
	},
	{
		match: /bateria/,
		reply: {
			text: 'A bateria marca 12,1 V na partida a frio, com 3 anos e 2 meses de uso. Ainda está no aceitável. O teste de carga na visita é gratuito, e só trocamos se reprovar.',
		},
	},
	{
		match: /concession|onde|perto|rota|oficina/,
		reply: {
			text: 'Pelo seu caminho diário, a Ford Tatuapé fica a 7 min (2,8 km de desvio), a Aricanduva a 9 min e a Vila Prudente a 14 min.',
			action: { label: 'Escolher concessionária', route: ROUTES.service },
		},
	},
];

const FALLBACK: AssistantReply = {
	text: 'Posso te ajudar com o estado da sua Ranger, a revisão, os preços e as concessionárias no seu caminho. Tente perguntar o que vence primeiro.',
};

export function replyTo(question: string): AssistantReply {
	const normalized = question.toLowerCase();
	return RULES.find((rule) => rule.match.test(normalized))?.reply ?? FALLBACK;
}
