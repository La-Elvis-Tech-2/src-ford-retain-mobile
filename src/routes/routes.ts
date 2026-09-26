export const ROUTES = {
	welcome: '/welcome',
	connect: '/connect',

	home: '/',
	assistant: '/assistant',
	service: '/service',
	profile: '/profile',

	system: '/system/[systemId]',
	notifications: '/notifications',
	news: '/news/[newsId]',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
