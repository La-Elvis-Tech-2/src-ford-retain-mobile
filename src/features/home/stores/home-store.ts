import { create } from 'zustand';

export type HomeState = {
	/** A pessoa escondeu o cartão de procedência ("Ocultar"). */
	provenanceHidden: boolean;
	hideProvenance: () => void;
};

/**
 * Preferências da home. Em memória: esconder um cartão vale para a sessão de
 * uso, e ele volta na próxima abertura — é o lembrete de que o histórico vale
 * dinheiro, e some só quando a pessoa pede.
 */
export const useHomeStore = create<HomeState>((set) => ({
	provenanceHidden: false,
	hideProvenance: () => set({ provenanceHidden: true }),
}));
