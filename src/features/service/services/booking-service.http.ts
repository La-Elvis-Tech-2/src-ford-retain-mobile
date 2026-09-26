import { httpClient } from '@/services/http/http-client';
import type { Booking, BookServiceInput } from '../types';
import type { BookingService } from './booking-service';

export const httpBookingService: BookingService = {
	book(input: BookServiceInput) {
		return httpClient.request<Booking>({ path: '/bookings', method: 'POST', body: input });
	},

	async cancel(bookingId: string) {
		await httpClient.request<void>({ path: `/bookings/${encodeURIComponent(bookingId)}`, method: 'DELETE' });
	},
};
