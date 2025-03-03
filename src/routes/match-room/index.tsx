import { createFileRoute } from '@tanstack/react-router';
import { useSessionStore } from '../../store/sessionStore';

export const Route = createFileRoute('/match-room/')({
  component: MatchRoomPage,
});

function MatchRoomPage() {
  const { counter, doAction, players, sessionCode } = useSessionStore();

  const handleCopyLink = () => {
    const inviteLink = `${window.location.origin}/match-room/match-room/${sessionCode}`;
    navigator.clipboard.writeText(inviteLink);
    alert('Link copiado para a área de transferência!');
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-slate-900 text-slate-100 pixel-font p-8 relative">
      <h1 className="text-4xl md:text-5xl border-4 border-slate-500 p-6 bg-slate-800 shadow-md">
        Sala de Partida
      </h1>

      <p className="text-lg">Compartilhe este código com seus amigos:</p>
      <h2 className="text-2xl font-bold">{sessionCode}</h2>

      <button onClick={handleCopyLink} className="btn btn--teal">
        Copiar Link de Convite
      </button>

      <div className="text-center">
        <h3 className="text-xl font-semibold mt-4">Contador: {counter}</h3>
        <div className="flex gap-4 mt-4 justify-center">
          <button onClick={() => doAction("IncrementCounter")} className="btn btn--purple">
            Incrementar
          </button>
          <button onClick={() => doAction("DecrementCounter")} className="btn btn--purple">
            Decrementar
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mt-6 mb-2">Jogadores Conectados:</h3>
        <ul className="list-disc list-inside">
          {players.map((player) => (
            <li key={player.connectionId}>{player.nickname}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
