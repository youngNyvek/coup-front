import { ICurrentActionEntity } from "../../../../../store/interfaces/IGamePhase";

export interface IUseActions {
  type: "ActionDeclared" | "ChallengeDeclared",
  actionEntity: ICurrentActionEntity,
}