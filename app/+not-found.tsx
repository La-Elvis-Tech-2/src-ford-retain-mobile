import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { Screen } from '@/components/layout/screen';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { ROUTES } from '@/routes/routes';
import { ITEM_GAP, SECTION_GAP } from '@/theme/layout';
import { useScaler } from '@/theme/scale';

/**
 * Rota inexistente — normalmente um link `fordretain://` desatualizado.
 * `replace` e não `push`: a rota quebrada não deve ficar na pilha.
 */
export default function NotFoundScreen() {
	const router = useRouter();
	const px = useScaler();

	return (
		<Screen>
			<View className='flex-1 items-center justify-center' style={{ gap: px(ITEM_GAP) }}>
				<Text variant='title' className='self-stretch text-center'>
					Página não encontrada
				</Text>
				<Text variant='muted' className='self-stretch text-center'>
					O endereço que você abriu não existe mais.
				</Text>
				<View className='w-full' style={{ paddingTop: px(SECTION_GAP) }}>
					<Button label='Ir para o início' onPress={() => router.replace(ROUTES.home)} />
				</View>
			</View>
		</Screen>
	);
}
