import {
	BatteryMedium,
	CircleDashed,
	CircleDot,
	Cog,
	Droplet,
	Droplets,
	Fan,
	Gauge,
	type LucideIcon,
	Thermometer,
	Wind,
	Zap,
} from 'lucide-react-native';
import type { ComponentIconKey, SystemId } from '../types';

const COMPONENT_ICONS: Record<ComponentIconKey, LucideIcon> = {
	oil: Droplet,
	'air-filter': Wind,
	'cabin-filter': Fan,
	'brake-pad': CircleDashed,
	'brake-fluid': Droplets,
	battery: BatteryMedium,
	belt: Cog,
	'spark-plugs': Zap,
	tires: CircleDot,
	cooling: Thermometer,
};

const SYSTEM_ICONS: Record<SystemId, LucideIcon> = {
	engine: Gauge,
	brakes: CircleDashed,
	battery: BatteryMedium,
	tires: CircleDot,
};

export type IconProps = { size: number; color: string };

export function ComponentIcon({ icon, size, color }: IconProps & { icon: ComponentIconKey }) {
	const Icon = COMPONENT_ICONS[icon];
	return <Icon size={size} color={color} strokeWidth={1.75} />;
}

export function SystemIcon({ system, size, color }: IconProps & { system: SystemId }) {
	const Icon = SYSTEM_ICONS[system];
	return <Icon size={size} color={color} strokeWidth={1.75} />;
}
