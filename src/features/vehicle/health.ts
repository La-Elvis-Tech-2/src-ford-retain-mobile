import type { ComponentStatus, SystemId, SystemSummary, VehicleComponent } from './types';

/**
 * As contas da saúde do carro — funções puras, sem tela e sem rede.
 *
 * Todas as notas da home saem daqui, a partir das notas dos componentes: o
 * orbe, as quatro linhas e as variações. Assim um número na tela nunca
 * discorda do outro, e trocar o mock pela API não muda conta nenhuma.
 */

/**
 * Onde a nota vira status. Os cortes seguem o laudo do site: abaixo de 40 o
 * item já passou do ponto (óleo vencido, pastilha abaixo de 3 mm); até 75 ele
 * pede atenção na próxima visita.
 */
const URGENT_BELOW = 40;
const ATTENTION_BELOW = 75;

export function statusOf(health: number): ComponentStatus {
	if (health < URGENT_BELOW) {
		return 'urgent';
	}
	return health < ATTENTION_BELOW ? 'attention' : 'ok';
}

const SEVERITY: Record<ComponentStatus, number> = { ok: 0, attention: 1, urgent: 2 };

/** O pior status de uma lista — é o que pinta um sistema. */
export function worstStatus(components: readonly VehicleComponent[]): ComponentStatus {
	return components.reduce<ComponentStatus>((worst, component) => {
		const status = statusOf(component.health);
		return SEVERITY[status] > SEVERITY[worst] ? status : worst;
	}, 'ok');
}

function mean(values: readonly number[]): number {
	return values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;
}

/**
 * A nota de um conjunto: a média simples, arredondada.
 *
 * A variação é a diferença entre as duas notas JÁ arredondadas, e não o
 * arredondamento da diferença: é o que garante que "71" na semana passada e
 * "69" hoje apareçam como –2, e não como um –3 que ninguém consegue conferir.
 */
export function scoreOf(components: readonly VehicleComponent[]): { score: number; delta: number } {
	const score = Math.round(mean(components.map((component) => component.health)));
	const last = Math.round(mean(components.map((component) => component.healthLastWeek)));
	return { score, delta: score - last };
}

/** Nome e ordem dos sistemas na home. */
export const SYSTEMS: readonly { id: SystemId; name: string }[] = [
	{ id: 'engine', name: 'Motor' },
	{ id: 'brakes', name: 'Freios' },
	{ id: 'battery', name: 'Bateria' },
	{ id: 'tires', name: 'Pneus' },
];

export function summarizeSystems(components: readonly VehicleComponent[]): SystemSummary[] {
	return SYSTEMS.map(({ id, name }) => {
		const members = components.filter((component) => component.systemId === id);
		return { id, name, ...scoreOf(members), status: worstStatus(members), components: members };
	});
}

/** Os componentes do mais grave para o mais tranquilo — a ordem de leitura do laudo. */
export function byUrgency(components: readonly VehicleComponent[]): VehicleComponent[] {
	return [...components].sort((a, b) => a.health - b.health);
}

export function countByStatus(components: readonly VehicleComponent[]): Record<ComponentStatus, number> {
	const counts: Record<ComponentStatus, number> = { ok: 0, attention: 0, urgent: 0 };

	for (const component of components) {
		counts[statusOf(component.health)] += 1;
	}

	return counts;
}
