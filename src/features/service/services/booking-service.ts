import type { Booking, BookServiceInput } from '../types';

/** Contrato de agendamento. As telas dependem SÓ desta interface. */
export type BookingService = {
	book(input: BookServiceInput): Promise<Booking>;
	cancel(bookingId: string): Promise<void>;
};
