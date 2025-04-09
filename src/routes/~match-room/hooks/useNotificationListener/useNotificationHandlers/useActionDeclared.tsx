import { ICurrentActionEntity } from "../../../../../store/interfaces/IGamePhase";
import { useModalStore } from "../../../../../store/modalStore";
import { useNotificationStore } from "../../../../../store/notificationStore";
import { useSessionStore } from "../../../../../store/sessionStore";
import { actions } from "./constants";
import { IUseNotificationHandler } from "./interfaces/IUseNotificationHandler";

export const useActionDeclaredHandler: IUseNotificationHandler = (actionEntity) => {
  const { openModal } = useNotificationStore();
  const { players: playersStore, isPlayerTurn } = useSessionStore();
  const { closeModal: closeModalStore  } = useModalStore();

  const createActionDeclaredMessage = (actionEntity: ICurrentActionEntity) => {
    const actorPlayerName = playersStore.find(p => p.connectionId === actionEntity.actorPlayerId)?.nickname;
    const targetPlayerName = playersStore.find(p => p.connectionId === actionEntity.targetPlayerId)?.nickname;
    const friendlyActionName = actions.get(actionEntity.actionName)?.displayName;
  
    let message = `${actorPlayerName} declarou: "${friendlyActionName}"`;
  
    if (targetPlayerName)
      message += ` | contra: ${targetPlayerName}`;
    return message;
  }

  const message = createActionDeclaredMessage(actionEntity);
  const counterActionChoices = actionEntity.counterActionChoices;
  const canBeChallenged = actionEntity.canBeChallenged && !isPlayerTurn;

  openModal(message, counterActionChoices, canBeChallenged);
  closeModalStore();
};


