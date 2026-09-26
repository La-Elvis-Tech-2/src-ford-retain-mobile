import { useEffect, useState } from 'react';
import { Keyboard, Platform } from 'react-native';

export function useKeyboardVisible(): boolean {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const show = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
		const hide = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
		const subscriptions = [
			Keyboard.addListener(show, () => setVisible(true)),
			Keyboard.addListener(hide, () => setVisible(false)),
		];

		return () => {
			for (const subscription of subscriptions) {
				subscription.remove();
			}
		};
	}, []);

	return visible;
}
