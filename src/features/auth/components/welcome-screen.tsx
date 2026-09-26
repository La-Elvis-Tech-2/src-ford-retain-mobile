import { useRouter } from 'expo-router';
import { BellRing, CalendarCheck, ShieldCheck } from 'lucide-react-native';
import { useState } from 'react';
import { type LayoutChangeEvent, ScrollView, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { BrandMark } from '@/components/brand/brand-mark';
import { Screen } from '@/components/layout/screen';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { HealthOrb } from '@/features/vehicle/components/health-orb';
import { ROUTES } from '@/routes/routes';
import { COLORS } from '@/theme/colors';
import { SCREEN_BOTTOM_SPACING, SCREEN_GUTTER } from '@/theme/layout';
import { useScaler } from '@/theme/scale';

const PROMISES = [
	{ Icon: BellRing, text: 'Avisa antes de um item virar problema' },
	{ Icon: CalendarCheck, text: 'Agenda na rede Ford com preço fechado' },
	{ Icon: ShieldCheck, text: 'Guarda o histórico que vale na revenda' },
] as const;

/** O orbe nunca passa disto, nem em tela alta; abaixo do piso ele sai. */
const ORB_MAX = 230;
const ORB_MIN = 96;

/**
 * A abertura do app, para quem ainda não conectou o carro: o orbe grande, a
 * promessa em três linhas e uma ação só.
 *
 * O orbe ocupa o espaço que SOBRA depois do texto — medido, e não fixo. Com
 * 250pt cravados ele passava por cima do título em tela baixa (SE, Android de
 * 640dp); agora encolhe, ou sai. Se nem o texto couber (fonte do sistema no
 * máximo), a tela rola.
 */
export function WelcomeScreen() {
	const px = useScaler();
	const router = useRouter();
	const gutter = px(SCREEN_GUTTER);
	const [stage, setStage] = useState({ width: 0, height: 0 });
	const orbSize = Math.floor(Math.min(px(ORB_MAX), stage.height - px(16), stage.width * 0.72));

	const handleStageLayout = (event: LayoutChangeEvent) => {
		const { width, height } = event.nativeEvent.layout;
		setStage({ width, height });
	};

	return (
		<Screen>
			<ScrollView
				style={{ marginHorizontal: -gutter }}
				contentContainerStyle={{ flexGrow: 1, paddingHorizontal: gutter }}
				showsVerticalScrollIndicator={false}
				bounces={false}
			>
				<View className='flex-row items-center' style={{ gap: px(8), paddingTop: px(8) }}>
					<BrandMark size={px(22)} />
					<Text variant='body' font='semibold'>
						Ford Retain
					</Text>
				</View>

				<View className='flex-1 items-center justify-center' onLayout={handleStageLayout}>
					{orbSize >= px(ORB_MIN) ? <HealthOrb size={orbSize} id='welcome-orb' /> : null}
				</View>

				<Animated.View
					entering={FadeInDown.duration(400)}
					style={{ gap: px(18), paddingBottom: px(SCREEN_BOTTOM_SPACING) }}
				>
					<View style={{ gap: px(6) }}>
						<Text variant='hero' accessibilityRole='header'>
							Seu Ford avisa antes.
						</Text>
						<Text variant='body' className='text-muted-foreground'>
							A saúde do carro lida pelos módulos, em linguagem de gente. E a revisão certa, na hora certa.
						</Text>
					</View>

					<View style={{ gap: px(10) }}>
						{PROMISES.map(({ Icon, text }) => (
							<View key={text} className='flex-row items-center' style={{ gap: px(12) }}>
								<View
									className='items-center justify-center rounded-full bg-accent-soft'
									style={{ width: px(28), height: px(28) }}
								>
									<Icon size={px(15)} color={COLORS.accent} />
								</View>
								<Text variant='bodySm' className='flex-1'>
									{text}
								</Text>
							</View>
						))}
					</View>

					<Button size='lg' label='Conectar meu Ford' onPress={() => router.push(ROUTES.connect)} />
				</Animated.View>
			</ScrollView>
		</Screen>
	);
}
