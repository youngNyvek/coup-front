import { RolesEnum } from "../RolesEnum";
import { ActionsEnumBase } from "./base";

export class CharacterActionEnum extends ActionsEnumBase {
  private constructor(key: string, displayName: string, role: RolesEnum) {
    super(key, displayName, role);
  }

  static readonly TAX_KEY = "TAX";
  static readonly ASSASSINATE_KEY = "ASSASSINATE";
  static readonly STEAL_KEY = "STEAL";
  static readonly EXCHANGE_KEY = "EXCHANGE";

  static readonly TAX = new CharacterActionEnum(CharacterActionEnum.TAX_KEY, "Cobrar Taxa", RolesEnum.Duke);
  static readonly ASSASSINATE = new CharacterActionEnum(CharacterActionEnum.ASSASSINATE_KEY, "Assassinar", RolesEnum.Assassin);
  static readonly STEAL = new CharacterActionEnum(CharacterActionEnum.STEAL_KEY, "Roubar", RolesEnum.Captain);
  static readonly EXCHANGE = new CharacterActionEnum(CharacterActionEnum.EXCHANGE_KEY, "Trocar Cartas", RolesEnum.Ambassador);

  static readonly map: Map<string, CharacterActionEnum> = new Map([
    [CharacterActionEnum.TAX_KEY, CharacterActionEnum.TAX],
    [CharacterActionEnum.ASSASSINATE_KEY, CharacterActionEnum.ASSASSINATE],
    [CharacterActionEnum.STEAL_KEY, CharacterActionEnum.STEAL],
    [CharacterActionEnum.EXCHANGE_KEY, CharacterActionEnum.EXCHANGE],
  ]);
}
