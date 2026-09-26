import { ActivityIndicator, View } from 'react-native';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';
import { Button } from './button';
import { Text } from './text';

export type QueryStateProps = {
	error?: unknown;
	onRetry?: () => void;
};

export function QueryState({ error, onRetry }: QueryStateProps) {
	const px = useScaler();

	if (!error) {
		return (
			<View className='items-center justify-center' style={{ paddingVertical: px(40) }}>
				<ActivityIndicator color={COLORS.accent} accessibilityLabel='Carregando' />
			</View>
		);
	}

	return (
		<View className='items-center' style={{ paddingVertical: px(32), gap: px(8) }}>
			<Text variant='subtitle' className='self-stretch text-center'>
				Não conseguimos ler seu carro agora
			</Text>
			<Text variant='muted' className='self-stretch text-center'>
				Confira a conexão e tente de novo em instantes.
			</Text>
			{onRetry ? (
				<View style={{ paddingTop: px(4) }}>
					<Button label='Tentar de novo' variant='outline' size='sm' onPress={onRetry} />
				</View>
			) : null}
		</View>
	);
}
