import { useNotificationStore } from "../../../store/notificationStore";
import { useSessionStore } from "../../../store/sessionStore";
import { getRoleColor } from "../../../utils/getRoleColor";

export default function NotificationPopup() {
  const { isOpen, message, availableActions, closeModal, canBeChallenged } = useNotificationStore();
  const { declareAction, declareChallenge } = useSessionStore(); // Obtém o estado do jogo

  if(!isOpen) return;

  return (
    <div className="absolute w-full flex justify-center z-50">
      <div
        id="global-action-modal"
        className="mt-32 bg-slate-800 border border-slate-500 p-2 rounded-md shadow-lg text-white"
      >
        <h3 className="text-xs text-center">AÇÃO DECLARADA</h3>
        <p className="mt-5">{message}</p>
        <div className="flex mt-5 gap-1 justify-center">
          {availableActions.map((action) => (
            <button
              key={action.key}
              onClick={() => {
                closeModal();
                declareAction(action.key);
              }}
              className={`btn text-xs ${getRoleColor(action.role)}`}
            >
              {action.displayName}
            </button>
          ))}
          {canBeChallenged && (
            <button
              onClick={() => {
                closeModal();
                declareChallenge();
              }}
              className="btn btn--purple text-xs"
            >
              Contestar
            </button>)}
        </div>
      </div>
    </div>

  );
}