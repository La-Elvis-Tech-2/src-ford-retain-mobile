import type { Href } from 'expo-router';

export type NotificationKind = 'alert' | 'service' | 'offer';

export type AppNotification = {
	id: string;
	kind: NotificationKind;
	title: string;
	body: string;
	timeLabel: string;
	target?: Href;
};
