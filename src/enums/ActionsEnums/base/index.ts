import { RolesEnum } from "../../RolesEnum";

export abstract class ActionsEnumBase {
  public readonly key: string;
  public readonly displayName: string; // Nome legível para exibição
  public readonly role?: RolesEnum;

  protected constructor(key: string, displayName: string, role?: RolesEnum) {
    this.key = key;
    this.displayName = displayName;
    this.role = role;
  }
}