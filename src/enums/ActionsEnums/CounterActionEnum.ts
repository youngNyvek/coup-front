import { ActionsEnumBase } from "./base";
import { RolesEnum } from "../RolesEnum";

export class CounterActionEnum extends ActionsEnumBase {
  private constructor(key: string, displayName: string, role?: RolesEnum) {
    super(key, displayName, role);
  }

  static readonly BLOCK_ASSASSINATE_KEY = "BLOCK_ASSASSINATE";
  static readonly BLOCK_STEAL_CAPTAIN_KEY = "BLOCK_STEAL_CAPTAIN";
  static readonly BLOCK_STEAL_AMBASSADOR_KEY = "BLOCK_STEAL_AMBASSADOR";
  static readonly BLOCK_FOREIGN_AID_KEY = "BLOCK_FOREIGN_AID";

  static readonly BLOCK_ASSASSINATE = new CounterActionEnum(
    CounterActionEnum.BLOCK_ASSASSINATE_KEY,
    "Bloquear Assassinato",
    RolesEnum.Countess
  );

  static readonly BLOCK_STEAL_CAPTAIN = new CounterActionEnum(
    CounterActionEnum.BLOCK_STEAL_CAPTAIN_KEY,
    "Bloquear Roubo (Capitão)",
    RolesEnum.Captain
  );

  static readonly BLOCK_STEAL_AMBASSADOR = new CounterActionEnum(
    CounterActionEnum.BLOCK_STEAL_AMBASSADOR_KEY,
    "Bloquear Roubo (Embaixador)",
    RolesEnum.Ambassador
  );

  static readonly BLOCK_FOREIGN_AID = new CounterActionEnum(
    CounterActionEnum.BLOCK_FOREIGN_AID_KEY,
    "Bloquear Ajuda Externa",
    RolesEnum.Duke
  );

  static readonly map: Map<string, CounterActionEnum> = new Map([
    [CounterActionEnum.BLOCK_ASSASSINATE_KEY, CounterActionEnum.BLOCK_ASSASSINATE],
    [CounterActionEnum.BLOCK_STEAL_CAPTAIN_KEY, CounterActionEnum.BLOCK_STEAL_CAPTAIN],
    [CounterActionEnum.BLOCK_STEAL_AMBASSADOR_KEY, CounterActionEnum.BLOCK_STEAL_AMBASSADOR],
    [CounterActionEnum.BLOCK_FOREIGN_AID_KEY, CounterActionEnum.BLOCK_FOREIGN_AID],
  ]);
}
