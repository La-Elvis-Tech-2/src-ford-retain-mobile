export type AuthUser = {
	id: string;
	name: string;
};

export type AuthTokens = {
	accessToken: string;
	refreshToken: string | null;
};

/**
 * A sessão do app é a de um DONO DE VEÍCULO: ela nasce ao conectar o carro, e
 * o veículo vem junto. Uma conta sem carro não tem o que mostrar em tela
 * nenhuma do app.
 */
export type AuthSession = {
	user: AuthUser;
	vehicleId: string;
	tokens: AuthTokens;
};

export type ConnectVehicleInput = {
	/** Placa normalizada, sem traço e em caixa alta (`ABC1D23`). */
	plate: string;
};
