import type { ComponentStatus, SystemId, SystemSummary, VehicleComponent } from './types';

const URGENT_BELOW = 40;
const ATTENTION_BELOW = 75;

export function statusOf(health: number): ComponentStatus {
	if (health < URGENT_BELOW) {
		return 'urgent';
	}
	return health < ATTENTION_BELOW ? 'attention' : 'ok';
}

const SEVERITY: Record<ComponentStatus, number> = { ok: 0, attention: 1, urgent: 2 };

export function worstStatus(components: readonly VehicleComponent[]): ComponentStatus {
	return components.reduce<ComponentStatus>((worst, component) => {
		const status = statusOf(component.health);
		return SEVERITY[status] > SEVERITY[worst] ? status : worst;
	}, 'ok');
}

function mean(values: readonly number[]): number {
	return values.length === 0 ? 0 : values.reduce((sum, value) => sum + value, 0) / values.length;
}

export function scoreOf(components: readonly VehicleComponent[]): { score: number; delta: number } {
	const score = Math.round(mean(components.map((component) => component.health)));
	const last = Math.round(mean(components.map((component) => component.healthLastWeek)));
	return { score, delta: score - last };
}

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
