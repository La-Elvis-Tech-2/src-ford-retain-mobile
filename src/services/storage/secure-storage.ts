import * as SecureStore from 'expo-secure-store';

/**
 * Armazenamento criptografado (Keychain no iOS, Keystore no Android).
 *
 * Use para credenciais e tokens. Preferências e cache de UI devem ir para
 * AsyncStorage — o SecureStore tem limite prático de alguns KB por chave.
 *
 * Chaves aceitam apenas [A-Za-z0-9._-].
 */
export const secureStorage = {
	getString(key: string): Promise<string | null> {
		return SecureStore.getItemAsync(key);
	},

	setString(key: string, value: string): Promise<void> {
		return SecureStore.setItemAsync(key, value);
	},

	async getJson<T>(key: string): Promise<T | null> {
		const raw = await SecureStore.getItemAsync(key);

		if (!raw) {
			return null;
		}

		try {
			return JSON.parse(raw) as T;
		} catch {
			// Valor corrompido ou de uma versão anterior do app: descarta.
			await SecureStore.deleteItemAsync(key);
			return null;
		}
	},

	setJson(key: string, value: unknown): Promise<void> {
		return SecureStore.setItemAsync(key, JSON.stringify(value));
	},

	remove(key: string): Promise<void> {
		return SecureStore.deleteItemAsync(key);
	},
};
