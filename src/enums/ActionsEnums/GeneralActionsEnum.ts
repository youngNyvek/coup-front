import { ActionsEnumBase } from "./base";
import { RolesEnum } from "../RolesEnum";

export class GeneralActionsEnum extends ActionsEnumBase {
  private constructor(name: string, displayName: string, role?: RolesEnum) {
    super(name, displayName, role);
  }

  static readonly INCOME = new GeneralActionsEnum("INCOME", "Renda");
  static readonly FOREIGN_AID = new GeneralActionsEnum("FOREIGN_AID", "Ajuda Externa");
  static readonly COUP = new GeneralActionsEnum("COUP", "Golpe de Estado");

  override values(): GeneralActionsEnum[] {
    return [
      GeneralActionsEnum.INCOME,
      GeneralActionsEnum.FOREIGN_AID,
      GeneralActionsEnum.COUP,
    ];
  }
}
