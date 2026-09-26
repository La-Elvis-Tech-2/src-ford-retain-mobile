import { type ReactNode, useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scheduleOnRN } from 'react-native-worklets';
import { COLORS } from '@/theme/colors';
import { SCREEN_BOTTOM_SPACING, SCREEN_GUTTER } from '@/theme/layout';
import { useScaler } from '@/theme/scale';

export type SheetProps = {
	visible: boolean;
	onClose: () => void;
	children: ReactNode;
};

const OPEN = { duration: 280, easing: Easing.out(Easing.cubic) } as const;
const CLOSE = { duration: 200, easing: Easing.in(Easing.cubic) } as const;

const SCRIM_OPACITY = 0.4;

export function Sheet({ visible, onClose, children }: SheetProps) {
	const px = useScaler();
	const insets = useSafeAreaInsets();
	const { height: windowHeight } = useWindowDimensions();
	const [mounted, setMounted] = useState(visible);
	const progress = useSharedValue(0);

	useEffect(() => {
		if (visible) {
			setMounted(true);
			progress.value = withTiming(1, OPEN);
			return;
		}
		progress.value = withTiming(0, CLOSE, (finished) => {
			if (finished) {
				scheduleOnRN(setMounted, false);
			}
		});
	}, [visible, progress]);

	const scrimStyle = useAnimatedStyle(() => ({ opacity: progress.value * SCRIM_OPACITY }));
	const panelStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: (1 - progress.value) * windowHeight }],
	}));

	return (
		<Modal
			visible={mounted}
			transparent
			animationType='none'
			statusBarTranslucent
			navigationBarTranslucent
			onRequestClose={onClose}
		>
			<View className='flex-1 justify-end'>
				<Animated.View style={[StyleSheet.absoluteFill, styles.scrim, scrimStyle]}>
					<Pressable className='flex-1' onPress={onClose} accessibilityRole='button' accessibilityLabel='Fechar' />
				</Animated.View>
				<Animated.View
					style={[
						styles.panel,
						{
							borderTopLeftRadius: px(24),
							borderTopRightRadius: px(24),
							paddingHorizontal: px(SCREEN_GUTTER + 4),
							paddingTop: px(8),
							paddingBottom: insets.bottom + px(SCREEN_BOTTOM_SPACING),
						},
						panelStyle,
					]}
				>
					<View className='items-center' style={{ marginBottom: px(16) }}>
						<View className='rounded-full bg-muted' style={{ width: px(36), height: px(4) }} />
					</View>
					{children}
				</Animated.View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	scrim: { backgroundColor: COLORS.foreground },
	panel: { backgroundColor: COLORS.card },
});
