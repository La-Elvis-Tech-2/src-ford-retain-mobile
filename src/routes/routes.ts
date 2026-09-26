/**
 * Caminhos das rotas em um só lugar.
 *
 * O Expo Router deriva as rotas da árvore de arquivos em `app/`; estas
 * constantes existem para que nenhuma tela escreva a string à mão (e para o
 * rename de uma rota ser um find/replace de um símbolo só).
 */
export const ROUTES = {
	// públicas
	/** A abertura — o orbe e a promessa do app. */
	welcome: '/welcome',
	/** Conectar o veículo pela placa. */
	connect: '/connect',

	// privadas — abas
	home: '/',
	/** Ford Assist — a conversa com o assistente. É a aba "Chat" do layout. */
	assistant: '/assistant',
	/** A revisão recomendada: orçamento, concessionária e horário. */
	service: '/service',
	profile: '/profile',

	// privadas — pilha
	/** Um sistema do carro (motor, freios...) com os componentes dele. */
	system: '/system/[systemId]',
	notifications: '/notifications',
	news: '/news/[newsId]',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
