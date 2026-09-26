import { env } from '@/config/env';
import type { AuthService } from './auth-service';
import { httpAuthService } from './auth-service.http';
import { mockAuthService } from './auth-service.mock';

export const authService: AuthService = env.hasApi ? httpAuthService : mockAuthService;

export type { AuthService };
