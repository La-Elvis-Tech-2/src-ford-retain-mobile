import type { BookServiceInput } from '../types';
import type { BookingService } from './booking-service';

const LATENCY_MS = 900;

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Toda reserva passa: sem backend não há agenda de verdade para lotar. */
export const mockBookingService: BookingService = {
	async book(input: BookServiceInput) {
		await delay(LATENCY_MS);
		return { id: `booking-${input.slot.id}`, ...input };
	},

	async cancel(_bookingId: string) {
		await delay(LATENCY_MS / 2);
	},
};
