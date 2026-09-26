import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { IconDisc } from '@/components/ui/icon-disc';
import { Text } from '@/components/ui/text';
import { ROUTES } from '@/routes/routes';
import { COLORS } from '@/theme/colors';
import { useScaler } from '@/theme/scale';

export type ScreenHeaderProps = {
	title?: string;
	/** Peça do lado direito, no lugar do disco vazio que equilibra o voltar. */
	trailing?: ReactNode;
};

const DISC = 36;

/**
 * O topo das telas de pilha: o voltar em disco, o título centrado e uma peça
 * opcional à direita.
 *
 * O voltar cai no início quando não há para onde voltar — é o caso de quem
 * chegou à tela por um link (`fordretain://system/brakes`) com a pilha vazia.
 */
export function ScreenHeader({ title, trailing }: ScreenHeaderProps) {
	const router = useRouter();
	const px = useScaler();

	const goBack = () => {
		if (router.canGoBack()) {
			router.back();
			return;
		}
		router.replace(ROUTES.home);
	};

	return (
		<View className='flex-row items-center justify-between' style={{ minHeight: px(DISC) }}>
			<IconDisc onPress={goBack} accessibilityLabel='Voltar' size={DISC}>
				<ChevronLeft size={px(20)} color={COLORS.foreground} strokeWidth={2.25} />
			</IconDisc>

			{title ? (
				<Text
					variant='subtitle'
					accessibilityRole='header'
					className='flex-1 text-center'
					style={{ paddingHorizontal: px(8) }}
					numberOfLines={1}
				>
					{title}
				</Text>
			) : (
				<View className='flex-1' />
			)}

			{trailing ?? <View style={{ width: px(DISC) }} />}
		</View>
	);
}
