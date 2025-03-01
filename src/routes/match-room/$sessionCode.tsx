import { useEffect, useRef } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useSessionStore } from '../../store/sessionStore';

export const Route = createFileRoute('/match-room/$sessionCode')({
  component: MatchRoomPage,
});

function MatchRoomPage() {
  const { sessionCode } = Route.useParams(); // Obtém o sessionCode do path

  const { joinSession, counter, incrementCounter, decrementCounter, players } =
    useSessionStore();

  const initialized = useRef(false);

  useEffect(() => {
    if(!initialized.current){
      joinSession(sessionCode); // Entra na sessão usando o código do path
    }

    initialized.current = true;
  }, []);

  const handleCopyLink = () => {
    const inviteLink = `${window.location.origin}/match-room/${sessionCode}`;
    navigator.clipboard.writeText(inviteLink);
    alert('Link copiado para a área de transferência!');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Sala de Partida</h1>
      <p>Compartilhe este código com seus amigos:</p>
      <h2>{sessionCode}</h2>
      <button onClick={handleCopyLink} style={{ marginBottom: '20px', padding: '10px 20px' }}>
        Copiar Link de Convite
      </button>
      <h3>Contador: {counter}</h3>
      <button onClick={incrementCounter} style={{ marginRight: '10px', padding: '10px 20px' }}>
        Incrementar
      </button>
      <button onClick={decrementCounter} style={{ padding: '10px 20px' }}>
        Decrementar
      </button>

      <h3>Jogadores Conectados:</h3>
      <ul>
        {players.map((player) => (
          <li key={player.connectionId}>{player.nickname}</li>
        ))}
      </ul>
    </div>
  );
}
