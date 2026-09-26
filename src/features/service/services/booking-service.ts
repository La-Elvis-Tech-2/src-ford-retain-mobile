import type { Booking, BookServiceInput } from '../types';

export type BookingService = {
	book(input: BookServiceInput): Promise<Booking>;
	cancel(bookingId: string): Promise<void>;
};
