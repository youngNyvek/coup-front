import { CounterActionEnum } from "../../enums/ActionsEnums/CounterActionEnum";

export interface IActionEntity {
  actionName: string;
  actorPlayerId: string;
  canBeChallenged: boolean;
}

export interface ICurrentActionEntity extends IActionEntity {
  targetPlayerId?: string;
  counterActionChoices: CounterActionEnum[];
}

export interface IGamePhase {
  currentAction: ICurrentActionEntity;
  counterAction?: IActionEntity;
  challenge: IActionEntity;
}