/**
 * Variáveis de ambiente.
 *
 * No Expo só o prefixo `EXPO_PUBLIC_` chega ao bundle, e o valor é inlinado em
 * build time — por isso `process.env.EXPO_PUBLIC_X` precisa ser lido de forma
 * literal (destructuring dinâmico não funciona).
 *
 * Defina em `.env` na raiz. Nada de segredo aqui: tudo que está no bundle é
 * legível por quem instalar o app.
 */
const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? '';

export const env = {
	apiUrl,
	/** Sem API configurada o app roda inteiro sobre os mocks de `services`. */
	hasApi: apiUrl.length > 0,
	isDev: __DEV__,
} as const;
