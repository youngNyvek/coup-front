import { IActionEntity, ICurrentActionEntity } from "../../../../../store/interfaces/IGamePhase";
import { useModalStore } from "../../../../../store/modalStore";
import { useNotificationStore } from "../../../../../store/notificationStore";
import { useSessionStore } from "../../../../../store/sessionStore";
import { IUseNotificationHandler } from "./interfaces/IUseNotificationHandler";

// hooks/useChallengeDeclaredHandler.ts
export const useChallengeDeclaredHandler: IUseNotificationHandler = (actionEntity) => {
  const { openModal } = useNotificationStore();
  const { closeModal: closeModalStore  } = useModalStore();
  const { players: playersStore, gamePhase, isPlayerTurn } = useSessionStore();

  const createChallengeDeclaredMessage = (actionEntity: IActionEntity) => {
    const challengerName = playersStore.find(p => p.connectionId === actionEntity.actorPlayerId)?.nickname;
    const principalActionActorName = playersStore.find(p => p.connectionId === gamePhase?.currentAction.actorPlayerId)?.nickname;

    if (isPlayerTurn)
      return `${challengerName} te contestou! \nSelecione uma de suas cartas para responder a contestação`;

    return `${challengerName} contestou a ação de ${principalActionActorName}!`;
  }

  const message = createChallengeDeclaredMessage(actionEntity);

  openModal(message, [], false);
  closeModalStore();
};

