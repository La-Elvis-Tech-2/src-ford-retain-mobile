export type ComponentStatus = 'ok' | 'attention' | 'urgent';

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

export type SystemId = 'engine' | 'brakes' | 'battery' | 'tires';

export type VehicleComponent = {
	id: string;
	name: string;
	icon: ComponentIconKey;
	systemId: SystemId;
	health: number;
	healthLastWeek: number;
	detail: string;
	explanation: string;
	slack?: string;
};

export type Vehicle = {
	id: string;
	model: string;
	year: number;
	color: string;
	maskedPlate: string;
	km: number;
	kmSource: string;
	monthlyKm: number;
};

export type Insight = {
	lead: string;
	body: string;
};

export type Provenance = {
	servicesInNetwork: number;
	resaleGainCents: number;
	badge: string;
};

export type HealthReport = {
	vehicle: Vehicle;
	readAt: string;
	components: VehicleComponent[];
	insight: Insight;
	provenance: Provenance;
};

export type SystemSummary = {
	id: SystemId;
	name: string;
	score: number;
	delta: number;
	status: ComponentStatus;
	components: VehicleComponent[];
};
