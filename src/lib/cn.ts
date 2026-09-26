import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Junta classes condicionais e resolve conflitos do Tailwind
 * (o último vence: `cn("p-2", "p-4")` => "p-4").
 *
 * Sempre use isto na prop `className` de componentes que aceitam override.
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}
