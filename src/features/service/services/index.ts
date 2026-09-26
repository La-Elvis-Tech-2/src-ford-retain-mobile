import { env } from '@/config/env';
import type { BookingService } from './booking-service';
import { httpBookingService } from './booking-service.http';
import { mockBookingService } from './booking-service.mock';

/** Ponto único de troca mock <-> HTTP (ver `EXPO_PUBLIC_API_URL`). */
export const bookingService: BookingService = env.hasApi ? httpBookingService : mockBookingService;

export type { BookingService };
