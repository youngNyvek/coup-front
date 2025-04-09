import {  ICurrentActionEntity } from "../../../../../../store/interfaces/IGamePhase";

export interface IUseNotificationHandler {
  (actionEntity: ICurrentActionEntity): void;
}
