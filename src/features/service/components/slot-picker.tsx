import { View } from 'react-native';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Text } from '@/components/ui/text';
import { PRESS_SCALE } from '@/hooks/use-press-scale';
import { cn } from '@/lib/cn';
import { useScaler } from '@/theme/scale';
import type { ServiceSlot } from '../types';

export type SlotPickerProps = {
	slots: ServiceSlot[];
	selectedId: string | null;
	onSelect: (slot: ServiceSlot) => void;
};

const COLUMNS = 3;

/**
 * Os horários em linhas de três. Cada linha é montada à parte, com as casas em
 * `flex: 1`: com largura fixa e `flex-wrap`, a grade não fechava na margem
 * direita — sobrava um vão diferente em cada aparelho.
 */
function rowsOf(slots: ServiceSlot[]): (ServiceSlot | null)[][] {
	const rows: (ServiceSlot | null)[][] = [];
	for (let index = 0; index < slots.length; index += COLUMNS) {
		const row: (ServiceSlot | null)[] = slots.slice(index, index + COLUMNS);
		// A última linha é completada com casas vazias, para não esticar as que sobram.
		while (row.length < COLUMNS) {
			row.push(null);
		}
		rows.push(row);
	}
	return rows;
}

/** Os horários com vaga, em cartões de três linhas: dia da semana, data e hora. */
export function SlotPicker({ slots, selectedId, onSelect }: SlotPickerProps) {
	const px = useScaler();
	const gap = px(8);

	if (slots.length === 0) {
		return <Text variant='muted'>Sem vagas nas próximas duas semanas. Escolha outra concessionária.</Text>;
	}

	return (
		<View style={{ gap }} accessibilityRole='radiogroup'>
			{rowsOf(slots).map((row) => (
				<View key={row.map((slot) => slot?.id ?? 'empty').join('|')} className='flex-row' style={{ gap }}>
					{row.map((slot, column) => {
						if (!slot) {
							// biome-ignore lint/suspicious/noArrayIndexKey: casa vazia, sem id — a coluna é a identidade
							return <View key={`empty-${column}`} className='flex-1' />;
						}

						const selected = slot.id === selectedId;

						return (
							<PressableScale
								key={slot.id}
								scaleTo={PRESS_SCALE.control}
								haptic='select'
								onPress={() => onSelect(slot)}
								accessibilityRole='radio'
								accessibilityState={{ checked: selected }}
								accessibilityLabel={`${slot.weekdayLabel} ${slot.dayLabel} às ${slot.time}`}
								containerStyle={{ flex: 1 }}
								className={cn('items-center', selected ? 'bg-primary' : 'bg-card')}
								style={{ borderRadius: px(16), paddingVertical: px(9) }}
							>
								<Text variant='detail' className={selected ? 'text-white/80' : undefined}>
									{slot.weekdayLabel}
								</Text>
								<Text variant='body' font='semibold' className={selected ? 'text-white' : undefined}>
									{slot.dayLabel}
								</Text>
								<Text variant='muted' font='medium' className={selected ? 'text-white' : 'text-foreground'}>
									{slot.time}
								</Text>
							</PressableScale>
						);
					})}
				</View>
			))}
		</View>
	);
}
