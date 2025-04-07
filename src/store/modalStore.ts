import { create } from 'zustand';
import { ActionsEnumBase } from '../enums/ActionsEnums/base';

interface ModalStore {
  isOpen: boolean;
  position: { x: number; y: number };
  actions: ActionsEnumBase[];
  targetPlayerId?: string;

  openModal: (x: number, y: number, actions: ActionsEnumBase[], targetPlayerId?: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  position: { x: 0, y: 0 },
  actions: [],
  onSelect: null,

  openModal: (x, y, actions, targetPlayerId) => 
    set({ isOpen: true, position: { x, y }, actions, targetPlayerId }),

  closeModal: () => set({ isOpen: false }),
}));