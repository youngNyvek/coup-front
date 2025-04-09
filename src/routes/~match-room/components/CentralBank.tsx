import { useModalStore } from "../../../store/modalStore";
import { useSessionStore } from "../../../store/sessionStore";
import { GeneralActionsEnum } from "../../../enums/ActionsEnums/GeneralActionsEnum";
import { CharacterActionEnum } from "../../../enums/ActionsEnums/CharacterActionEnum";
import { ActionsEnumBase } from "../../../enums/ActionsEnums/base";

const bankActions: ActionsEnumBase[] = [
  GeneralActionsEnum.INCOME,
  GeneralActionsEnum.FOREIGN_AID,
  CharacterActionEnum.TAX
];

export function CentralBank() {
  const { openModal } = useModalStore();
  const { isPlayerTurn } = useSessionStore(); // Obtém o estado do jogo

  return (
    <div
      className={`relative w-40 h-32 bg-slate-700 
      border-2 ${isPlayerTurn ? "border-yellow-500 cursor-pointer" : "border-slate-500 cursor-default"} 
      text-center flex flex-col items-center justify-center`}
      onClick={(e) => isPlayerTurn && openModal(e.clientX, e.clientY, bankActions)}
    >
      <h3 className="text-sm font-bold mb-1">Banco Central</h3>
    </div>
  );
}
