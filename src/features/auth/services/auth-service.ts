import type { AuthSession, ConnectVehicleInput } from '../types';

/**
 * Contrato de autenticação. As telas dependem SÓ desta interface, então trocar
 * o mock pela implementação real não toca em nenhum componente.
 */
export type AuthService = {
	/**
	 * Conecta o veículo pela placa e abre a sessão do dono.
	 *
	 * TODO(auth): no fluxo real a placa só IDENTIFICA o carro; a posse é
	 * provada pelo código enviado ao telefone do cadastro na rede Ford.
	 */
	connectVehicle(input: ConnectVehicleInput): Promise<AuthSession>;
	signOut(): Promise<void>;
};
