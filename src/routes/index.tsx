import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useSessionStore } from '../store/sessionStore';

export const Route = createFileRoute('/')({
component: HomePage,
});

function HomePage() {
const { nickname, setNickname, connectToHub, createSession } = useSessionStore();
const navigate = useNavigate();

const handleCreateSession = async () => {
  await connectToHub(); // Conecta ao SignalR Hub
  const sessionCode = await createSession(); // Cria a sessão no backend

  if(sessionCode){
    navigate({ to: "/match-room/$sessionCode", params: {sessionCode} }); // Redireciona para a sala de partida
  }
};

return (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <h1>Bem-vindo ao Coup Game</h1>
    <input
      type="text"
      placeholder="Digite seu nickname"
      value={nickname}
      onChange={(e) => setNickname(e.target.value)}
      style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
    />
    <br />
    <button
      onClick={handleCreateSession}
      disabled={!nickname}
      style={{ padding: '10px 20px', marginRight: '10px' }}
    >
      Criar Sessão
    </button>
    <Link to='/join-session'>
      <button
        disabled={!nickname}
        style={{ padding: '10px 20px' }}
      >
        Entrar em Sessão
      </button>
    </Link>
    
  </div>
);
}