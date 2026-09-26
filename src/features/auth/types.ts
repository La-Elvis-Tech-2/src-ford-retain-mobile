export type AuthUser = {
	id: string;
	name: string;
};

export type AuthTokens = {
	accessToken: string;
	refreshToken: string | null;
};

export type AuthSession = {
	user: AuthUser;
	vehicleId: string;
	tokens: AuthTokens;
};

export type ConnectVehicleInput = {
	plate: string;
};
