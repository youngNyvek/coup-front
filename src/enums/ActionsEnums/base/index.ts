import { RolesEnum } from "../../RolesEnum";

export abstract class ActionsEnumBase {
  public readonly name: string;
  public readonly displayName: string; // Nome legível para exibição
  public readonly role?: RolesEnum;

  protected constructor(name: string, displayName: string, role?: RolesEnum) {
    this.name = name;
    this.displayName = displayName;
    this.role = role;
  }

  // Método abstrato que cada subclasse deve implementar
  abstract values(): ActionsEnumBase[];
}