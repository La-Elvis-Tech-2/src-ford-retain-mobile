import type { Href } from 'expo-router';

export type NotificationKind = 'alert' | 'service' | 'offer';

export type AppNotification = {
	id: string;
	kind: NotificationKind;
	title: string;
	body: string;
	timeLabel: string;
	/** Para onde o toque leva. Sem destino, o aviso é só leitura. */
	target?: Href;
};
