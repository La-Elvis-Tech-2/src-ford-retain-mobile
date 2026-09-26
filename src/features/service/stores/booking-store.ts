import { create } from 'zustand';
import type { Booking } from '../types';

export type BookingState = {
	/** A visita marcada. Uma de cada vez: o carro é um só. */
	booking: Booking | null;
	setBooking: (booking: Booking | null) => void;
};

/**
 * A visita marcada, compartilhada entre a aba da revisão, o cartão do
 * assistente na home e o perfil.
 *
 * TODO(api): hoje ela some ao fechar o app. Com backend, a visita passa a vir
 * do servidor e este store vira o cache dela.
 */
export const useBookingStore = create<BookingState>((set) => ({
	booking: null,
	setBooking: (booking) => set({ booking }),
}));
