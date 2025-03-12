import { RolesEnum } from "../RolesEnum";
import { ActionsEnumBase } from "./base";

export class CharacterActionEnum extends ActionsEnumBase {
  private constructor(name: string, displayName: string, role: RolesEnum) {
    super(name, displayName, role);
  }

  static readonly TAX = new CharacterActionEnum("TAX", "Cobrar Taxa", RolesEnum.Duke);
  static readonly ASSASSINATE = new CharacterActionEnum("ASSASSINATE", "Assassinar", RolesEnum.Assassin);
  static readonly STEAL = new CharacterActionEnum("STEAL", "Roubar", RolesEnum.Captain);
  static readonly EXCHANGE = new CharacterActionEnum("EXCHANGE", "Trocar Cartas", RolesEnum.Ambassador);

  override values(): CharacterActionEnum[] {
    return [
      CharacterActionEnum.TAX,
      CharacterActionEnum.ASSASSINATE,
      CharacterActionEnum.STEAL,
      CharacterActionEnum.EXCHANGE,
    ];
  }
}
