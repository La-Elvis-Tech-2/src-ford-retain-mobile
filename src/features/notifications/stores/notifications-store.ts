import { create } from 'zustand';
import { SAMPLE_NOTIFICATIONS } from '../data/notifications';
import type { AppNotification } from '../types';

export type NotificationsState = {
	items: AppNotification[];
	/** Tudo o que chegou depois da última vez que a pessoa abriu a lista. */
	hasUnread: boolean;
	markAllRead: () => void;
};

/**
 * Os avisos do sino. O ponto azul do sino é `hasUnread`: abrir a lista apaga
 * o ponto, mas não os avisos — eles continuam ali para consulta.
 */
export const useNotificationsStore = create<NotificationsState>((set) => ({
	items: SAMPLE_NOTIFICATIONS,
	hasUnread: true,
	markAllRead: () => set({ hasUnread: false }),
}));
