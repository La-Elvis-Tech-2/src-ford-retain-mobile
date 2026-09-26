const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? '';

export const env = {
	apiUrl,
	hasApi: apiUrl.length > 0,
	isDev: __DEV__,
} as const;
