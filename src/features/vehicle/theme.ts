import { CircleCheck, Clock3, type LucideIcon, TriangleAlert } from 'lucide-react-native';
import { COLORS } from '@/theme/colors';
import type { ComponentStatus } from './types';

export const STATUS_META: Record<
	ComponentStatus,
	{
		label: string;
		Icon: LucideIcon;
		color: string;
		soft: string;
		tint: string;
		textClass: string;
		softClass: string;
	}
> = {
	ok: {
		label: 'Em dia',
		Icon: CircleCheck,
		color: COLORS.positive,
		soft: COLORS.positiveSoft,
		tint: '#C4E7D2',
		textClass: 'text-positive',
		softClass: 'bg-positive-soft',
	},
	attention: {
		label: 'Atenção próxima',
		Icon: Clock3,
		color: COLORS.warning,
		soft: COLORS.warningSoft,
		tint: '#F9DCC4',
		textClass: 'text-warning',
		softClass: 'bg-warning-soft',
	},
	urgent: {
		label: 'Urgente',
		Icon: TriangleAlert,
		color: COLORS.negative,
		soft: COLORS.negativeSoft,
		tint: '#F6CDC4',
		textClass: 'text-negative',
		softClass: 'bg-negative-soft',
	},
};

export function deltaClass(delta: number): string {
	if (delta === 0) {
		return 'text-muted-foreground';
	}
	return delta > 0 ? 'text-positive' : 'text-negative';
}
