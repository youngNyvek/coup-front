import { ActionsEnumBase } from "../../../../../enums/ActionsEnums/base";
import { CharacterActionEnum } from "../../../../../enums/ActionsEnums/CharacterActionEnum";
import { CounterActionEnum } from "../../../../../enums/ActionsEnums/CounterActionEnum";
import { GeneralActionsEnum } from "../../../../../enums/ActionsEnums/GeneralActionsEnum";

export const actions = new Map<string, ActionsEnumBase>([
  ...CharacterActionEnum.map,
  ...CounterActionEnum.map,
  ...GeneralActionsEnum.map,
]);