import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSessionStore } from '../store/sessionStore';

export const Route =  createFileRoute('/join-session')({
component: JoinSessionPage,
});

function JoinSessionPage() {
const { nickname, setNickname, connectToHub } = useSessionStore();
const [sessionCode, setSessionCode] = useState('');
const navigate = useNavigate();

const handleJoinSession = async () => {
  await connectToHub(); // Conecta ao SignalR Hub

  navigate({ to: "/match-room/$sessionCode", params: {sessionCode} }); 
};

return (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <h1>Entrar em uma Sessão</h1>
    <input
      type="text"
      placeholder="Digite seu nickname"
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
      style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
    />
    <br />
    <input
      type="text"
      placeholder="Código da sessão"
      value={sessionCode}
      onChange={(e) => setSessionCode(e.target.value)}
      style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
    />
    <br />
    <button
      onClick={handleJoinSession}
      disabled={!nickname || !sessionCode}
      style={{ padding: '10px 20px' }}
    >
      Entrar na Sala
    </button>
  </div>
);
}