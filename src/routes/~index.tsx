import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useSessionStore } from '../store/sessionStore';

// Exemplo de como definir estilos de botões usando @layer components em seu CSS:
// global.css
// @layer components {
//   .btn {
//     @apply border border-slate-500 text-slate-100 px-5 py-3 font-bold transition-colors disabled:cursor-not-allowed;
//   }
//   .btn--teal {
//     @apply bg-teal-600 hover:bg-teal-700 disabled:bg-gray-700;
//   }
//   .btn--purple {
//     @apply bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700;
//   }
// }

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { nickname, setNickname, connectToHub, createSession, joinSession } = useSessionStore();
  const navigate = useNavigate();

  const handleCreateSession = async () => {
    await connectToHub(); // Conecta ao SignalR Hub
    const sessionCode = await createSession(); // Cria a sessão no backend

    if (sessionCode) {
      await joinSession(sessionCode); // Entra na sessão
      navigate({ to: '/lobby' });
    }
  };

  return (
    <div
      className="flex flex-col gap-8 items-center justify-center min-h-screen bg-slate-900 text-slate-100 pixel-font p-8 relative"
    >
      <h1 className="text-2xl md:text-3xl border-2 border-slate-500 p-6 bg-slate-800 shadow-md">
        Bem-vindo ao Coup Game
      </h1>

      <input
        type="text"
        placeholder="Digite seu nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="border-2 border-slate-500 bg-slate-800 text-slate-100 p-4 w-80 text-center focus:outline-none focus:border-teal-500"
      />

      <div className="flex gap-8">
        <button
          onClick={handleCreateSession}
          disabled={!nickname}
          className="btn btn--teal"
        >
          Criar Sessão
        </button>
        <Link to="/join-session">
          <button
            disabled={!nickname}
            className="btn btn--purple"
          >
            Entrar em Sessão
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;