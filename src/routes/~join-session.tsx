import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useSessionStore } from '../store/sessionStore';
import { useState } from 'react';
import { z } from 'zod';

const productSearchSchema = z.object({
  sessionCode: z.string().catch(''),
});

export const Route = createFileRoute('/join-session')({
  component: RouteComponent,
  validateSearch: productSearchSchema,
});

function RouteComponent() {
  const { nickname, setNickname, connectToHub, joinSession } = useSessionStore();

  const { sessionCode: sessionCodeSearch } = Route.useSearch();

  const [sessionCode, setSessionCode] = useState(sessionCodeSearch || "");
  const navigate = useNavigate();

  const handleJoinSession = async () => {
    await connectToHub(); // Conecta ao SignalR Hub
    await joinSession(sessionCode); // Entra na sessão usando o código do path

    navigate({ to: '/lobby' });
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen bg-slate-900 text-slate-100 pixel-font p-8 relative">
      <h1 className="text-4xl md:text-5xl border-2 border-slate-500 p-6 bg-slate-800 shadow-md">
        Entrar em uma Sessão
      </h1>

      <input
        type="text"
        placeholder="Digite seu nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        className="border-2 border-slate-500 bg-slate-800 text-slate-100 p-4 w-80 text-center focus:outline-none focus:border-teal-500"
      />

      <input
        type="text"
        placeholder="Código da sessão"
        value={sessionCode}
        onChange={(e) => setSessionCode(e.target.value)}
        className="border-2 border-slate-500 bg-slate-800 text-slate-100 p-4 w-80 text-center focus:outline-none focus:border-purple-500"
      />

      <button
        onClick={handleJoinSession}
        disabled={!nickname || !sessionCode}
        className="btn btn--purple"
      >
        Entrar na Sala
      </button>
    </div>
  );
}
