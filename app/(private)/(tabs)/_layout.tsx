import { Tabs } from 'expo-router';
import { House, MessageCircle, Wrench } from 'lucide-react-native';
import { TabBar } from '@/components/layout/tab-bar';
import { Avatar } from '@/components/ui/avatar';
import { useUnreadCount } from '@/features/assistant/stores/assistant-store';
import { useCurrentUser } from '@/features/auth/hooks/use-session';
import { COLORS } from '@/theme/colors';

/**
 * As quatro abas do layout — Início, Chat, Revisão e Perfil.
 *
 * A barra é a `TabBar` do app (a cápsula flutuante), passada como `tabBar`: o
 * navegador continua dono do estado de cada aba, e a barra só desenha. O
 * contador do Chat vem das falas do assistente ainda não lidas.
 *
 * O VOLTAR SEGUE O HISTÓRICO: quem foi do Início para a Revisão pelo cartão
 * do assistente volta para o Início, e não para a primeira aba por padrão.
 */
export default function TabsLayout() {
	const unread = useUnreadCount();
	const user = useCurrentUser();

	return (
		<Tabs
			backBehavior='history'
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={{
				headerShown: false,
				animation: 'fade',
				sceneStyle: { backgroundColor: COLORS.background },
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Início',
					tabBarIcon: ({ color, size }) => <House size={size} color={color} strokeWidth={1.9} />,
				}}
			/>
			<Tabs.Screen
				name='assistant'
				options={{
					title: 'Chat',
					tabBarBadge: unread > 0 ? unread : undefined,
					tabBarIcon: ({ color, size }) => <MessageCircle size={size} color={color} strokeWidth={1.9} />,
				}}
			/>
			<Tabs.Screen
				name='service'
				options={{
					title: 'Revisão',
					tabBarIcon: ({ color, size }) => <Wrench size={size} color={color} strokeWidth={1.9} />,
				}}
			/>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Perfil',
					// Inativa, a foto vai para o cinza dos outros ícones: sem isso o Perfil
					// parecia sempre selecionado.
					tabBarIcon: ({ focused }) => (
						<Avatar name={user?.name ?? ''} size={22} className={focused ? undefined : 'bg-muted-foreground'} />
					),
				}}
			/>
		</Tabs>
	);
}
