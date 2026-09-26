import { env } from '@/config/env';
import { HttpError } from './http-error';

export type HttpRequest = {
	path: string;
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	body?: unknown;
	query?: Record<string, string | number | boolean | undefined>;
	headers?: Record<string, string>;
	signal?: AbortSignal;
	authenticated?: boolean;
	timeoutMs?: number;
};

export type HttpClientOptions = {
	baseUrl: string;
	getAccessToken?: () => string | null;
	onUnauthorized?: () => void;
	timeoutMs?: number;
};

const DEFAULT_TIMEOUT_MS = 30_000;

export function createHttpClient(initialOptions: HttpClientOptions) {
	const options: HttpClientOptions = { ...initialOptions };

	function configure(patch: Partial<HttpClientOptions>): void {
		Object.assign(options, patch);
	}

	async function request<TResponse>({
		path,
		method = 'GET',
		body,
		query,
		headers,
		signal,
		authenticated = true,
		timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
	}: HttpRequest): Promise<TResponse> {
		const url = buildUrl(options.baseUrl, path, query);
		const token = authenticated ? options.getAccessToken?.() : null;

		const timeout = AbortSignal.timeout(timeoutMs);
		const abortSignal = signal ? AbortSignal.any([signal, timeout]) : timeout;

		let response: Response;

		try {
			response = await fetch(url, {
				method,
				signal: abortSignal,
				headers: {
					Accept: 'application/json',
					...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
					...(token ? { Authorization: `Bearer ${token}` } : {}),
					...headers,
				},
				body: body === undefined ? undefined : JSON.stringify(body),
			});
		} catch (error) {
			if (timeout.aborted) {
				throw new HttpError(408, 'Tempo limite da requisição esgotado', null);
			}

			throw error;
		}

		const payload = await parseBody(response);

		if (!response.ok) {
			if (response.status === 401) {
				options.onUnauthorized?.();
			}

			throw new HttpError(response.status, response.statusText, payload);
		}

		return payload as TResponse;
	}

	return { request, configure };
}

function buildUrl(baseUrl: string, path: string, query: HttpRequest['query']): string {
	const base = baseUrl.replace(/\/+$/, '');
	const suffix = path.startsWith('/') ? path : `/${path}`;

	const search = Object.entries(query ?? {})
		.filter(([, value]) => value !== undefined)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
		.join('&');

	return search ? `${base}${suffix}?${search}` : `${base}${suffix}`;
}

async function parseBody(response: Response): Promise<unknown> {
	if (response.status === 204) {
		return null;
	}

	const text = await response.text();

	if (!text) {
		return null;
	}

	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
}

export type HttpClient = ReturnType<typeof createHttpClient>;

export const httpClient = createHttpClient({ baseUrl: env.apiUrl });
