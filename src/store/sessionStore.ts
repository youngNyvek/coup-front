import { create } from 'zustand';
import * as signalR from '@microsoft/signalr';

interface Player {
  connectionId: string;
  nickname: string;
}

interface SessionState {
  nickname: string;
  sessionCode: string | null;
  counter: number;
  players: Player[];
  connection: signalR.HubConnection | null;

  setNickname: (nickname: string) => void;
  createSession: () => Promise<string | undefined>;
  joinSession: (sessionCode: string) => Promise<void>;
  connectToHub: () => Promise<void>;
  incrementCounter: () => Promise<void>;
  decrementCounter: () => Promise<void>;
}


export const useSessionStore = create<SessionState>((set, get) => ({
  nickname: '',
  sessionCode: null,
  counter: 0,
  players: [],
  connection: null,

  setNickname: (nickname) => set({ nickname }),


  // Conecta ao SignalR Hub e entra na sessão
  connectToHub: async () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44301/sessionHub') // URL do SignalR Hub
      .withAutomaticReconnect()
      .build();

    try {
      await connection.start();

      connection.on('UpdatePlayers', (players: Player[]) => {
        console.log('Lista de jogadores atualizada:', players);
        set({ players });
      });

      // Ouve atualizações do contador
      connection.on('UpdateCounter', (newCounter: number) => {
        console.log('Novo contador recebido:', newCounter);
        set({ counter: newCounter });
      });

      console.log('Conectado ao SignalR Hub');
      set({ connection });
    } catch (error) {
      console.error('Erro ao conectar ao SignalR Hub:', error);
    }
  },

  // Cria uma nova sessão
  createSession: async () => {
    const { connection } = get();

    if (!connection) {
      console.error('Conexão com o SignalR Hub não estabelecida');
      return;
    }

    try {
      // Chama o método CreateSession no backend e recebe o ConnectionId
      const sessionCode = await connection.invoke<string>('CreateSession');
      console.log('Sessão criada com ID:', sessionCode);

      // Armazena o ConnectionId como código da sessão
      set({ sessionCode });

      return sessionCode;
    } catch (error) {
      console.error('Erro ao criar a sessão:', error);
    }
  },

  // Entra em uma sessão existente
  joinSession: async (sessionCode: string) => {
    const { connection, nickname } = get();

    if (!connection) {
      console.error('Conexão com o SignalR Hub não estabelecida');
      return;
    }

    try {
      

      await connection.invoke('JoinSession', sessionCode, nickname);
    } catch (error) {
      console.error('Erro ao entrar na sessão:', error);
    }
  },

  

  // Incrementa o contador
  incrementCounter: async () => {
    const { connection, sessionCode } = get();
    if (connection && sessionCode) {
      try {
        await connection.invoke('IncrementCounter', sessionCode);
      } catch (error) {
        console.error('Erro ao incrementar o contador:', error);
      }
    }
  },

  // Decrementa o contador
  decrementCounter: async () => {
    const { connection, sessionCode } = get();
    if (connection && sessionCode) {
      try {
        await connection.invoke('DecrementCounter', sessionCode);
      } catch (error) {
        console.error('Erro ao decrementar o contador:', error);
      }
    }
  },
}));