import { useMutation } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SAMPLE_DEALERS } from '../data/service';
import { bookingService } from '../services';
import { useBookingStore } from '../stores/booking-store';
import type { Booking, Dealer } from '../types';

export function useBooking(): Booking | null {
	return useBookingStore((state) => state.booking);
}

/** A visita marcada com a concessionária dela resolvida — o que as telas mostram. */
export function useBookingWithDealer(): { booking: Booking; dealer: Dealer } | null {
	const booking = useBooking();

	return useMemo(() => {
		const dealer = SAMPLE_DEALERS.find((candidate) => candidate.id === booking?.dealerId);
		return booking && dealer ? { booking, dealer } : null;
	}, [booking]);
}

/** Reserva o horário e, só com a resposta em mãos, publica a visita no store. */
export function useBookService() {
	const setBooking = useBookingStore((state) => state.setBooking);

	return useMutation({
		mutationFn: bookingService.book,
		onSuccess: (booking) => setBooking(booking),
	});
}

export function useCancelBooking() {
	const setBooking = useBookingStore((state) => state.setBooking);

	return useMutation({
		mutationFn: bookingService.cancel,
		onSuccess: () => setBooking(null),
	});
}
