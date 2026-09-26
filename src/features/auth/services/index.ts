import { env } from '@/config/env';
import type { AuthService } from './auth-service';
import { httpAuthService } from './auth-service.http';
import { mockAuthService } from './auth-service.mock';

/**
 * Ponto único de troca mock <-> HTTP: basta definir EXPO_PUBLIC_API_URL no
 * .env para o app passar a falar com o backend.
 */
export const authService: AuthService = env.hasApi ? httpAuthService : mockAuthService;

export type { AuthService };
