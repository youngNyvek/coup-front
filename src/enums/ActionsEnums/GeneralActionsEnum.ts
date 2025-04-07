import { ActionsEnumBase } from "./base";
import { RolesEnum } from "../RolesEnum";

export class GeneralActionsEnum extends ActionsEnumBase {
  private constructor(key: string, displayName: string, role?: RolesEnum) {
    super(key, displayName, role);
  }

  static readonly INCOME_KEY = "INCOME";
  static readonly FOREIGN_AID_KEY = "FOREIGN_AID";
  static readonly COUP_KEY = "COUP";

  static readonly INCOME = new GeneralActionsEnum(GeneralActionsEnum.INCOME_KEY, "Renda");
  static readonly FOREIGN_AID = new GeneralActionsEnum(GeneralActionsEnum.FOREIGN_AID_KEY, "Ajuda Externa");
  static readonly COUP = new GeneralActionsEnum(GeneralActionsEnum.COUP_KEY, "Golpe de Estado");

  static readonly map: Map<string, GeneralActionsEnum> = new Map([
    [GeneralActionsEnum.INCOME_KEY, GeneralActionsEnum.INCOME],
    [GeneralActionsEnum.FOREIGN_AID_KEY, GeneralActionsEnum.FOREIGN_AID],
    [GeneralActionsEnum.COUP_KEY, GeneralActionsEnum.COUP],
  ]);
}
