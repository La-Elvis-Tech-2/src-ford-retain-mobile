import * as SecureStore from 'expo-secure-store';

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
