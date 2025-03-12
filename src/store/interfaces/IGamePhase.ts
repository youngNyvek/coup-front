import { CounterActionEnum } from "../../enums/ActionsEnums/CounterActionEnum";

export interface IGamePhase {
  currentAction: ICurrentActionEntity;
  counterAction?: IActionEntity;
  IsActionChallenged: boolean;
}

export interface ICurrentActionEntity {
  targetPlayerId?: string;
  counterActionChoices: CounterActionEnum[];
}

export interface IActionEntity {

}