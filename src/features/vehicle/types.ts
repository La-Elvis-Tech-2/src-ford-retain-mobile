/** verde = em dia · âmbar = atenção próxima · vermelho = urgente */
export type ComponentStatus = 'ok' | 'attention' | 'urgent';

/** Chaves resolvidas para ícones do lucide em `ComponentIcon`. */
export type ComponentIconKey =
	| 'oil'
	| 'air-filter'
	| 'cabin-filter'
	| 'brake-pad'
	| 'brake-fluid'
	| 'battery'
	| 'belt'
	| 'spark-plugs'
	| 'tires'
	| 'cooling';

/**
 * Os quatro sistemas da home — as quatro linhas ao lado do orbe. Cada
 * componente do carro pertence a exatamente um deles.
 */
export type SystemId = 'engine' | 'brakes' | 'battery' | 'tires';

export type VehicleComponent = {
	id: string;
	name: string;
	icon: ComponentIconKey;
	systemId: SystemId;
	/**
	 * Saúde de 0 a 100, hoje. NÃO é vida útil restante: uma peça na metade da
	 * vida está perfeitamente saudável. É a nota que a leitura dos módulos dá ao
	 * componente, e o status sai dela (ver `statusOf`) — guardar os dois
	 * deixaria a barra e o rótulo livres para discordar.
	 */
	health: number;
	/** A mesma nota sete dias atrás. A variação da home sai da diferença. */
	healthLastWeek: number;
	/** Uma linha: a medida que justifica a nota. */
	detail: string;
	/** Revelado ao abrir o componente. */
	explanation: string;
	/** Só para itens em dia: quanta folga ainda existe. */
	slack?: string;
};

export type Vehicle = {
	id: string;
	model: string;
	year: number;
	color: string;
	/** Só os quatro últimos: a placa inteira não precisa aparecer em tela nenhuma. */
	maskedPlate: string;
	km: number;
	/** De onde veio a quilometragem — "Lida pelo módulo hoje, 07h12". */
	kmSource: string;
	/** Média mensal medida — é ela que transforma km restante em data. */
	monthlyKm: number;
};

/** A frase do assistente no topo da home. */
export type Insight = {
	/** O começo em negrito — "Ford Assist percebeu." */
	lead: string;
	body: string;
};

/** O histórico na rede e o quanto ele vale na revenda. */
export type Provenance = {
	servicesInNetwork: number;
	resaleGainCents: number;
	badge: string;
};

export type HealthReport = {
	vehicle: Vehicle;
	/** Quando os módulos foram lidos, já como texto de tela. */
	readAt: string;
	components: VehicleComponent[];
	insight: Insight;
	provenance: Provenance;
};

/** Um sistema já resumido para a tela — o que as linhas da home desenham. */
export type SystemSummary = {
	id: SystemId;
	name: string;
	score: number;
	delta: number;
	/** O pior status entre os componentes: um item urgente pinta o sistema. */
	status: ComponentStatus;
	components: VehicleComponent[];
};
