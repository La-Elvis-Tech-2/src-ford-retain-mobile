import { useState } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { Screen } from '@/components/layout/screen';
import { ScreenHeader } from '@/components/layout/screen-header';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';
import { haptic } from '@/lib/haptics';
import { COLORS, PLACEHOLDER_COLOR } from '@/theme/colors';
import { FONT_STYLE } from '@/theme/fonts';
import { SCREEN_BOTTOM_SPACING, SCREEN_TOP_SPACING } from '@/theme/layout';
import { useScaler } from '@/theme/scale';
import { useConnectVehicle } from '../hooks/use-session';
import { formatPlateInput, isValidPlate, normalizePlate } from '../validation';

/**
 * Conectar o carro pela placa.
 *
 * Não navega ao terminar: com a sessão aberta, o guard das rotas públicas
 * leva a pessoa para a home sozinho (ver app/(public)/_layout.tsx).
 */
export function ConnectScreen() {
	const px = useScaler();
	const connectVehicle = useConnectVehicle();
	const [plate, setPlate] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const valid = isValidPlate(plate);

	const submit = async () => {
		if (!valid || loading) {
			return;
		}
		setLoading(true);
		setError(null);

		try {
			await connectVehicle({ plate: normalizePlate(plate) });
			haptic('success');
		} catch (cause) {
			haptic('error');
			setError(cause instanceof Error ? cause.message : 'Não foi possível conectar agora. Tente de novo.');
			setLoading(false);
		}
	};

	return (
		<Screen>
			<KeyboardAvoidingView className='flex-1' behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
				<ScreenHeader />

				<View className='flex-1' style={{ paddingTop: px(SCREEN_TOP_SPACING), gap: px(20) }}>
					<View style={{ gap: px(6) }}>
						<Text variant='hero' accessibilityRole='header'>
							Qual é a placa do seu Ford?
						</Text>
						<Text variant='body' className='text-muted-foreground'>
							A gente encontra o carro na rede e lê o histórico dele. Placa antiga ou Mercosul.
						</Text>
					</View>

					<View style={{ gap: px(8) }}>
						<TextInput
							value={formatPlateInput(plate)}
							onChangeText={(value) => {
								setPlate(normalizePlate(value).slice(0, 7));
								setError(null);
							}}
							placeholder='ABC-1D23'
							placeholderTextColor={PLACEHOLDER_COLOR}
							autoCapitalize='characters'
							autoCorrect={false}
							autoComplete='off'
							autoFocus
							maxLength={8}
							returnKeyType='go'
							onSubmitEditing={submit}
							accessibilityLabel='Placa do veículo'
							maxFontSizeMultiplier={1.2}
							className={cn(
								'border-2 bg-card text-center text-foreground',
								error ? 'border-negative' : 'border-transparent',
							)}
							style={{
								...FONT_STYLE.semibold,
								fontSize: px(26),
								letterSpacing: px(3),
								height: px(64),
								borderRadius: px(16),
								paddingVertical: 0,
							}}
							selectionColor={COLORS.accent}
						/>
						{error ? (
							<Text variant='danger' accessibilityLiveRegion='polite'>
								{error}
							</Text>
						) : (
							<Text variant='detail'>Está no documento do carro (CRLV) e na própria placa.</Text>
						)}
					</View>
				</View>

				<View style={{ paddingBottom: px(SCREEN_BOTTOM_SPACING) }}>
					<Button size='lg' label='Conectar' disabled={!valid} loading={loading} onPress={submit} />
				</View>
			</KeyboardAvoidingView>
		</Screen>
	);
}
