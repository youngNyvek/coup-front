import { create } from 'zustand';
import { ActionsEnumBase } from '../enums/ActionsEnums/base';
import { ModalType } from './types/ModalType';
import { CounterActionEnum } from '../enums/ActionsEnums/CounterActionEnum';

type OpenModal = {
  (message: string): void;
  (message: string, actions: CounterActionEnum[]): void;
  (message: string, actions: CounterActionEnum[], canBeChallenged: boolean): void;
};

interface NotificationStore {
  isOpen: boolean;
  message: string;
  modalType?: ModalType;
  availableActions: ActionsEnumBase[];
  canBeChallenged: boolean;

  openModal: OpenModal;
  closeModal: () => void;
}

const initialState = {
  isOpen: false,
  availableActions: [],
  message: "",
  canBeChallenged: false,
};

export const useNotificationStore = create<NotificationStore>((set) => {
  const openModal: OpenModal = (message: string, actions?: CounterActionEnum[], canBeChallenged: boolean = false) => {
    set({
      isOpen: true,
      message,
      availableActions: actions ?? [],
      canBeChallenged,
    });
  };

  return {
    isOpen: false,
    message: "",
    availableActions: [],
    canBeChallenged: false,
    openModal,
    closeModal: () => set({ ...initialState }),
  };
});