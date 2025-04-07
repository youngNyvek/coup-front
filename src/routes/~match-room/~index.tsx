import { createFileRoute } from "@tanstack/react-router";
import { useSessionStore } from "../../store/sessionStore";
import { useEffect, useMemo } from "react";
import { MyPlayerCard } from "./components/MyPlayerCard";
import { CentralBank } from "./components/CentralBank";
import ActionModal, { ActionModalContainedOverlay } from "./components/ActionModal";
import { OtherPlayersCard } from "./components/OtherPlayersCard";
import { useNotificationStore } from "../../store/notificationStore";
import { CharacterActionEnum } from "../../enums/ActionsEnums/CharacterActionEnum";
import { CounterActionEnum } from "../../enums/ActionsEnums/CounterActionEnum";
import { GeneralActionsEnum } from "../../enums/ActionsEnums/GeneralActionsEnum";
import { ActionsEnumBase } from "../../enums/ActionsEnums/base";
import NotificationPopup from "./components/NotificationPopup";
import { useModalStore } from "../../store/modalStore";

export const Route = createFileRoute("/match-room/")({
  component: MatchRoomPage,
});

function MatchRoomPage() {
  const { players: playersStore, deckPlayer, connection } = useSessionStore();
  const { openModal } = useNotificationStore();
  const { closeModal } = useModalStore();
  const { myPlayer, otherPlayers } = useMemo(() => {
    let myPlayer = null;
    let otherPlayers = [];
    for (let player of playersStore) {
      if (player.connectionId == connection?.connectionId)
        myPlayer = player

      if (player.connectionId != connection?.connectionId) {
        otherPlayers.push(player)
      }
    }

    return { myPlayer, otherPlayers }
  }, [playersStore]);

  useEffect(() => {
    if(!connection) return;

    connection.on("Notify", ({ type, actionEntity }) => {
      if (type === "ActionDeclared") {
        const actions = new Map<string, ActionsEnumBase>([
          ...CharacterActionEnum.map,
          ...CounterActionEnum.map,
          ...GeneralActionsEnum.map,
        ]);
        
        const actorPlayerName = playersStore.find(p => p.connectionId === actionEntity.actorPlayerId)?.nickname;
        const targetPlayerName = playersStore.find(p => p.connectionId === actionEntity.targetPlayerId)?.nickname;
        const friendlyActionName = actions.get(actionEntity.actionName)?.displayName;

        let message = `${actorPlayerName} declarou: "${friendlyActionName}"`;

        if(targetPlayerName)
          message += ` | contra: ${targetPlayerName}`;

        openModal(message, actionEntity.counterActionChoices, actionEntity.canBeChallenged);
        closeModal();
      }
    });

    return () => connection.off("Notify");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 pixel-font relative">
      {/* Título */}
      <h1 className="text-2xl border-4 border-slate-500 p-6 bg-slate-800 shadow-md text-center">
        Sala de Partida
      </h1>
      {/* Container 3D */}
      <div className="[transform-style:preserve-3d] perspective-[1000px] relative flex-1 overflow-hidden flex flex-col items-center justify-center mb-8">
        <div className="transform-[rotatex(45deg)] flex items-center justify-center ">
          {/* Tabuleiro inclinado */}
          <div className=" flex-col mb-40 relative w-[800px] h-[500px] bg-slate-800 border-4 border-slate-500 rounded-md flex items-center justify-center">
            <div className="z-1 p-2 absolute top-0">
              {
                otherPlayers
                  .slice(0, 2)
                  .map(player => <OtherPlayersCard player={player} />)
              }
            </div>
            <div className="z-1 flex items-center justify-between">
              <div className="p-2 absolute left-0 h-full flex justify-evenly flex-col">
                {
                  otherPlayers
                    .slice(2, 4)
                    .map(player => <OtherPlayersCard player={player} />)
                }
              </div>
              <CentralBank />
              <div className="p-2 absolute right-0 h-full flex justify-evenly flex-col">
                {
                  otherPlayers
                    .slice(4, 6)
                    .map(player => <OtherPlayersCard player={player} />)
                }
              </div>
            </div>
            <ActionModalContainedOverlay />
          </div>
        </div>
        <MyPlayerCard myPlayer={myPlayer} deckPlayer={deckPlayer} />
      </div>
      <ActionModal />
      <NotificationPopup/>
    </div>
  );
}

export default MatchRoomPage;


