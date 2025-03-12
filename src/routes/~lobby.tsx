import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useSessionStore } from '../store/sessionStore';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/lobby')({
  component: RouteComponent,
})

function RouteComponent() {
  const { sessionCode, connection, players } = useSessionStore();
  const [gameReady, setGameReady] = useState(false);
  const navigate = useNavigate();

  const handleCopyLink = () => {
    const inviteLink = `${window.location.origin}/join-session/${sessionCode}`;
    navigator.clipboard.writeText(inviteLink);
    alert("Link copiado para a área de transferência!");
  };

  useEffect(() => {
    if(players.length > 1)
      setGameReady(true);
  }, [players]);

  const handleStartGame = async () => {
    if (!connection) return;
    
    await connection.invoke("StartGame", sessionCode);
    navigate({to: "/match-room"});
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white">
      {/* Link de convite */}
      <div className="flex flex-col items-center mt-4">
        <h2 className="text-sm font-bold">{sessionCode}</h2>
      </div>
      <h1 className="text-3xl font-bold">Lobby da Partida</h1>

      <p className="text-lg mt-2">Aguardando jogadores...</p>

      <div className="bg-slate-800 p-4 rounded-md mt-4">
        <h2 className="text-xl font-semibold">Jogadores Conectados:</h2>
        <ul>
          {players.map((player) => (
            <li key={player.connectionId} className="text-lg">{player.nickname}</li>
          ))}
        </ul>
      </div>

      {gameReady && (
        <button
          onClick={handleStartGame}
          className="btn btn--teal mt-4"
        >
          Iniciar Jogo
        </button>
      )}
    </div>
  );

}
