import type { ReactNode } from 'react';
import { Platform, type ScrollViewProps } from 'react-native';
import Animated, {
	Extrapolation,
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { COLORS } from '@/theme/colors';
import { SCREEN_BOTTOM_SPACING, SCREEN_GUTTER, SCREEN_TOP_SPACING, SCROLL_FADE, SECTION_GAP } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import { EdgeFade } from './edge-fade';
import { useTabBarClearance } from './tab-bar';

export type ScreenScrollViewProps = Omit<
	ScrollViewProps,
	'children' | 'style' | 'contentContainerStyle' | 'onScroll'
> & {
	children: ReactNode;
	withTabBar?: boolean;
	withKeyboard?: boolean;
	bleed?: boolean;
	fadeColor?: string;
};

export function ScreenScrollView({
	children,
	withTabBar = false,
	withKeyboard = false,
	bleed = false,
	fadeColor = COLORS.background,
	...props
}: ScreenScrollViewProps) {
	const px = useScaler();
	const tabBarClearance = useTabBarClearance();
	const gutter = px(SCREEN_GUTTER);
	const outerGutter = bleed ? 0 : gutter;

	const scrollY = useSharedValue(0);
	const appearDistance = px(SCROLL_FADE.appearDistance);

	const handleScroll = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	});

	const fadeStyle = useAnimatedStyle(() => ({
		opacity: interpolate(scrollY.value, [0, appearDistance], [0, 1], Extrapolation.CLAMP),
	}));

	return (
		<>
			<Animated.ScrollView
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps={withKeyboard ? 'handled' : undefined}
				keyboardDismissMode={withKeyboard ? (Platform.OS === 'ios' ? 'interactive' : 'on-drag') : undefined}
				automaticallyAdjustKeyboardInsets={withKeyboard}
				{...props}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				style={{ flex: 1, marginHorizontal: -outerGutter }}
				contentContainerStyle={{
					paddingHorizontal: bleed ? 0 : gutter,
					paddingTop: bleed ? 0 : px(SCREEN_TOP_SPACING),
					paddingBottom: withTabBar ? tabBarClearance : px(SCREEN_BOTTOM_SPACING),
					gap: bleed ? 0 : px(SECTION_GAP),
				}}
			>
				{children}
			</Animated.ScrollView>

			<EdgeFade id='screenTopFade' edge='top' color={fadeColor} size={px(SCROLL_FADE.size)} style={fadeStyle} />
			{withTabBar ? (
				<EdgeFade id='screenBottomFade' edge='bottom' color={COLORS.background} size={px(SCROLL_FADE.size)} />
			) : null}
		</>
	);
}
