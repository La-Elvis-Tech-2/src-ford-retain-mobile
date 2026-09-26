import { create } from 'zustand';
import { SAMPLE_NOTIFICATIONS } from '../data/notifications';
import type { AppNotification } from '../types';

export type NotificationsState = {
	items: AppNotification[];
	hasUnread: boolean;
	markAllRead: () => void;
};

export const useNotificationsStore = create<NotificationsState>((set) => ({
	items: SAMPLE_NOTIFICATIONS,
	hasUnread: true,
	markAllRead: () => set({ hasUnread: false }),
}));
