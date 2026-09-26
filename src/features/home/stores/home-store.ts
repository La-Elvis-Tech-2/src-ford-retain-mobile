import { create } from 'zustand';

export type HomeState = {
	provenanceHidden: boolean;
	hideProvenance: () => void;
};

export const useHomeStore = create<HomeState>((set) => ({
	provenanceHidden: false,
	hideProvenance: () => set({ provenanceHidden: true }),
}));
