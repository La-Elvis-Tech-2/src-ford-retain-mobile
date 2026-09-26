import { create } from 'zustand';
import type { Booking } from '../types';

export type BookingState = {
	booking: Booking | null;
	setBooking: (booking: Booking | null) => void;
};

export const useBookingStore = create<BookingState>((set) => ({
	booking: null,
	setBooking: (booking) => set({ booking }),
}));
