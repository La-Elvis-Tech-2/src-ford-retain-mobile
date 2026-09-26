import * as Haptics from 'expo-haptics';

export type HapticIntent = 'tap' | 'select' | 'success' | 'error';

const PATTERNS: Record<HapticIntent, () => Promise<void>> = {
	tap: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
	select: () => Haptics.selectionAsync(),
	success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
	error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
};

export function haptic(intent: HapticIntent): void {
	PATTERNS[intent]().catch(() => undefined);
}
