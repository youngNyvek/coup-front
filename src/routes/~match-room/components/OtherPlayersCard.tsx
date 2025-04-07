import { useModalStore } from "../../../store/modalStore";
import { useSessionStore } from "../../../store/sessionStore";
import { ActionsEnumBase } from "../../../enums/ActionsEnums/base";
import { CharacterActionEnum } from "../../../enums/ActionsEnums/CharacterActionEnum";

const playerActions: ActionsEnumBase[] = [
  CharacterActionEnum.ASSASSINATE,
  CharacterActionEnum.STEAL,
  CharacterActionEnum.EXCHANGE
];

export function OtherPlayersCard({ player }: { player: any }) {
  // Modal local de clique
  const { openModal } = useModalStore();

  // Sessão e turno
  const { gamePhase, connection } = useSessionStore();
  
  const isCurrentTurn = gamePhase?.currentAction.actorPlayerId === connection?.connectionId;

  return (
    <div
      className={`relative w-32 h-32 bg-slate-700 flex flex-col items-center justify-center
        border-2 ${isCurrentTurn ? "border-yellow-500 cursor-pointer" : "border-slate-500 cursor-default"}
      `}
      onClick={(e) => {
        if (isCurrentTurn) {
          openModal(e.clientX, e.clientY, playerActions, player.connectionId);;
        }
      }}
    >
      <h3 className="text-sm font-bold">{player.nickname}</h3>
      <div className="flex gap-1">
        <div className="w-8 h-12 border-2 border-slate-500 bg-slate-600">?</div>
        <div className="w-8 h-12 border-2 border-slate-500 bg-slate-600">?</div>
      </div>
    </div>
  );
}
