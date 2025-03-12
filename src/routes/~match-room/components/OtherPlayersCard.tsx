import { useModalStore } from "../../../store/modalStore";
import { CharacterActionEnum } from "../../../enums/ActionsEnums/CharacterActionEnum";
import { ActionsEnumBase } from "../../../enums/ActionsEnums/base";

const playerActions: ActionsEnumBase[] = [
  CharacterActionEnum.ASSASSINATE,
  CharacterActionEnum.STEAL,
  CharacterActionEnum.EXCHANGE
];

export function OtherPlayersCard({ player }: { player: any }) {
  const { openModal } = useModalStore();

  const handleAction = (action: ActionsEnumBase) => {
    console.log(`Ação '${action.name}' contra ${player.nickname}`);
  };

  return (
    <div
      className="relative w-32 h-32 bg-slate-700 border-2 border-slate-500 flex flex-col items-center justify-center"
      onClick={(e) => openModal(e.clientX, e.clientY, playerActions, handleAction)}
    >
      <h3 className="text-sm font-bold">{player.nickname}</h3>
      <div className="flex gap-1">
        <div className="w-8 h-12 border-2 border-slate-500 bg-slate-600">?</div>
        <div className="w-8 h-12 border-2 border-slate-500 bg-slate-600">?</div>
      </div>
    </div>
  );
}
