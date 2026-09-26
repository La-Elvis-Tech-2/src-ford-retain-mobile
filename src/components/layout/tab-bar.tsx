import type { BottomTabBarProps } from 'expo-router/tabs';
import { useEffect, useState } from 'react';
import { type LayoutChangeEvent, Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { useKeyboardVisible } from '@/hooks/use-keyboard-visible';
import { cn } from '@/lib/cn';
import { haptic } from '@/lib/haptics';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';

const SIZES = {
	height: 58,
	sideMargin: 20,
	padding: 4,
	icon: 20,
	badge: 16,
	floor: 12,
} as const;

const CLEARANCE_GAP = 16;

function barBottom(insetBottom: number, px: (value: number) => number): number {
	return Math.max(insetBottom, px(SIZES.floor));
}

export function useTabBarOverlap(): number {
	const px = useScaler();
	const insets = useSafeAreaInsets();
	return barBottom(insets.bottom, px) - insets.bottom + px(SIZES.height);
}

export function useTabBarClearance(): number {
	const px = useScaler();
	return useTabBarOverlap() + px(CLEARANCE_GAP);
}

const INDICATOR_SPRING = { damping: 20, stiffness: 220, mass: 0.7 } as const;

export function TabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
	const px = useScaler();
	const keyboardVisible = useKeyboardVisible();
	const [innerWidth, setInnerWidth] = useState(0);
	const slot = innerWidth / state.routes.length;

	const position = useSharedValue(state.index);

	useEffect(() => {
		position.value = withSpring(state.index, INDICATOR_SPRING);
	}, [position, state.index]);

	const indicatorStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: position.value * slot }],
	}));

	const handleLayout = (event: LayoutChangeEvent) => {
		setInnerWidth(event.nativeEvent.layout.width - px(SIZES.padding) * 2);
	};

	if (keyboardVisible) {
		return null;
	}

	const height = px(SIZES.height);
	const padding = px(SIZES.padding);
	const bottom = barBottom(insets.bottom, px);

	return (
		<View
			pointerEvents='box-none'
			className='absolute right-0 left-0'
			style={{ bottom, paddingHorizontal: px(SIZES.sideMargin) }}
		>
			<View
				onLayout={handleLayout}
				accessibilityRole='tablist'
				className='flex-row bg-card'
				style={{
					height,
					padding,
					borderRadius: height / 2,
					boxShadow: '0px 8px 24px rgba(16, 20, 48, 0.12), 0px 1px 3px rgba(16, 20, 48, 0.06)',
				}}
			>
				{slot > 0 ? (
					<Animated.View
						style={[
							{
								position: 'absolute',
								backgroundColor: COLORS.accentSoft,
								top: padding,
								left: padding,
								width: slot,
								height: height - padding * 2,
								borderRadius: (height - padding * 2) / 2,
							},
							indicatorStyle,
						]}
					/>
				) : null}

				{state.routes.map((route, index) => {
					const descriptor = descriptors[route.key];

					if (!descriptor) {
						return null;
					}

					const { options } = descriptor;
					const focused = state.index === index;
					const label = options.title ?? route.name;
					const color = focused ? COLORS.primary : COLORS.mutedForeground;
					const badge = options.tabBarBadge;

					const onPress = () => {
						const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });

						if (!(focused || event.defaultPrevented)) {
							haptic('select');
							navigation.navigate(route.name, route.params);
						}
					};

					return (
						<Pressable
							key={route.key}
							onPress={onPress}
							accessibilityRole='tab'
							accessibilityState={{ selected: focused }}
							accessibilityLabel={badge === undefined ? label : `${label}, ${badge} novas`}
							className='flex-1 items-center justify-center'
							style={{ gap: px(2) }}
						>
							<View>
								{options.tabBarIcon?.({ focused, color, size: px(SIZES.icon) })}
								{badge === undefined ? null : (
									<View
										className='absolute items-center justify-center rounded-full border-2 border-card bg-accent'
										style={{
											top: -px(6),
											right: -px(10),
											minWidth: px(SIZES.badge + 4),
											height: px(SIZES.badge + 4),
											paddingHorizontal: px(3),
										}}
									>
										<Text
											variant='caption'
											font='semibold'
											className='text-white'
											maxFontSizeMultiplier={1}
											style={{ fontSize: px(10), lineHeight: px(12) }}
										>
											{String(badge)}
										</Text>
									</View>
								)}
							</View>
							<Text
								variant='caption'
								font={focused ? 'semibold' : 'medium'}
								className={cn(focused ? 'text-primary' : 'text-muted-foreground')}
								maxFontSizeMultiplier={1.15}
								numberOfLines={1}
							>
								{label}
							</Text>
						</Pressable>
					);
				})}
			</View>
		</View>
	);
}
