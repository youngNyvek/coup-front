import { create } from 'zustand';
import { ActionsEnumBase } from '../enums/ActionsEnums/base';
import { ModalType } from './types/ModalType';

interface NotificationStore {
  isOpen: boolean;
  message: string;
  modalType?: ModalType;
  availableActions: ActionsEnumBase[];
  canBeChallenged: boolean;

  openModal: (message:string, actions: ActionsEnumBase[], canBeChallenged: boolean) => void;
  closeModal: () => void;
}

const initialState = {
  isOpen: false,
  availableActions: [],
  message: "",
  canBeChallenged: false,
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  ...initialState,

  openModal: (message, actions, canBeChallenged) => 
    set({isOpen: true, message, availableActions: actions, canBeChallenged }),

  closeModal: () => set({ ...initialState }),
}));