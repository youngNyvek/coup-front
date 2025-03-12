import { ActionsEnumBase } from "./base";
import { RolesEnum } from "../RolesEnum";

export class CounterActionEnum extends ActionsEnumBase {
  private constructor(name: string, displayName: string, role?: RolesEnum) {
    super(name, displayName, role);
  }

  static readonly BLOCK_ASSASSINATE = new CounterActionEnum("BLOCK_ASSASSINATE", "Bloquear Assassinato", RolesEnum.Countess);
  static readonly BLOCK_STEAL_CAPTAIN = new CounterActionEnum("BLOCK_STEAL", "Bloquear Roubo (Capitão)", RolesEnum.Captain);
  static readonly BLOCK_STEAL_AMBASSADOR = new CounterActionEnum("BLOCK_STEAL", "Bloquear Roubo (Embaixador)", RolesEnum.Ambassador);
  static readonly BLOCK_FOREIGN_AID = new CounterActionEnum("BLOCK_FOREIGN_AID", "Bloquear Ajuda Externa", RolesEnum.Duke);

  override values(): CounterActionEnum[] {
    return [
      CounterActionEnum.BLOCK_ASSASSINATE,
      CounterActionEnum.BLOCK_STEAL_CAPTAIN,
      CounterActionEnum.BLOCK_STEAL_AMBASSADOR,
      CounterActionEnum.BLOCK_FOREIGN_AID,
    ];
  }
}
