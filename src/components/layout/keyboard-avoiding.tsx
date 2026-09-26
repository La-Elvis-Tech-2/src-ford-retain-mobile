import type { ReactNode } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function KeyboardAvoiding({ children }: { children: ReactNode }) {
	const insets = useSafeAreaInsets();

	return (
		<KeyboardAvoidingView className='flex-1' behavior='padding' keyboardVerticalOffset={insets.top}>
			{children}
		</KeyboardAvoidingView>
	);
}
