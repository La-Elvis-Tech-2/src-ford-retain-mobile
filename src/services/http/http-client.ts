import { env } from '@/config/env';
import { HttpError } from './http-error';

export type HttpRequest = {
	path: string;
	method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	body?: unknown;
	query?: Record<string, string | number | boolean | undefined>;
	headers?: Record<string, string>;
	signal?: AbortSignal;
	/** Envia o header Authorization. Padrão: true. */
	authenticated?: boolean;
	/** Sobrescreve o tempo limite da requisição, em milissegundos. */
	timeoutMs?: number;
};

export type HttpClientOptions = {
	baseUrl: string;
	/**
	 * Injetado pelo store de sessão. Fica como função para o cliente não
	 * importar o store (o que criaria um ciclo services -> features -> services).
	 */
	getAccessToken?: () => string | null;
	/** Chamado em 401 — normalmente derruba a sessão. */
	onUnauthorized?: () => void;
	/** Tempo limite padrão de toda requisição, em milissegundos. */
	timeoutMs?: number;
};

/**
 * O `fetch` do React Native não tem tempo limite: em rede ruim — túnel, elevador,
 * Wi-Fi que associou mas não roteia — a promise fica pendente para sempre e a
 * tela trava em "carregando" sem nunca dar erro. Trinta segundos é o limite
 * usado pelo NSURLSession do iOS por padrão.
 */
const DEFAULT_TIMEOUT_MS = 30_000;

export function createHttpClient(initialOptions: HttpClientOptions) {
	const options: HttpClientOptions = { ...initialOptions };

	/** Permite plugar token/handlers depois da criação (evita ciclo de import). */
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

		// `AbortSignal.any` combina o cancelamento de quem chamou com o do tempo
		// limite; sem ele, passar um `signal` desligaria o timeout.
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
			// Estouro de tempo vira 408 para a camada de cima não precisar
			// distinguir `AbortError` de queda de rede.
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

/**
 * Montagem manual da URL: a implementação de `URL`/`URLSearchParams` do React
 * Native é parcial, então não dependemos dela.
 */
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

/**
 * Instância única do app. `getAccessToken` e `onUnauthorized` são plugados via
 * `httpClient.configure(...)` em src/features/auth/stores/session-store.ts.
 */
export const httpClient = createHttpClient({ baseUrl: env.apiUrl });
