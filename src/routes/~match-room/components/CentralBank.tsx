import { useModalStore } from "../../../store/modalStore";
import { useSessionStore } from "../../../store/sessionStore";
import { GeneralActionsEnum } from "../../../enums/ActionsEnums/GeneralActionsEnum";
import { CharacterActionEnum } from "../../../enums/ActionsEnums/CharacterActionEnum";
import { ActionsEnumBase } from "../../../enums/ActionsEnums/base";

const bankActions: ActionsEnumBase[] = [
  GeneralActionsEnum.INCOME ,
  GeneralActionsEnum.FOREIGN_AID,
  CharacterActionEnum.TAX
];

export function CentralBank({ bankBalance }: { bankBalance: number }) {
  const {   } = useSessionStore();
  const { openModal } = useModalStore();

  const handleAction = (action: ActionsEnumBase) => {
    console.log(`Ação selecionada no Banco Central: ${action.name}`);
  };

  return (
    <div
      className="relative w-40 h-32 bg-slate-700 border-2 border-slate-500 text-center flex flex-col items-center justify-center"
      onClick={(e) => openModal(e.clientX, e.clientY, bankActions, handleAction)}
    >
      <h3 className="text-sm font-bold mb-1">Banco Central</h3>
      <p className="text-lg font-bold">{bankBalance}</p>
    </div>
  );
}