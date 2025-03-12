import { create } from 'zustand';
import { ActionsEnumBase } from '../enums/ActionsEnums/base';

interface ModalStore {
  isOpen: boolean;
  position: { x: number; y: number };
  actions: ActionsEnumBase[];
  onSelect: ((action: ActionsEnumBase) => void) | null;

  openModal: (x: number, y: number, actions: ActionsEnumBase[], onSelect: (action: ActionsEnumBase) => void) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  position: { x: 0, y: 0 },
  actions: [],
  onSelect: null,

  openModal: (x, y, actions, onSelect) => 
    set({ isOpen: true, position: { x, y }, actions, onSelect }),

  closeModal: () => set({ isOpen: false }),
}));