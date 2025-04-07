import { create } from 'zustand';
import * as signalR from '@microsoft/signalr';
import { IPlayer } from './interfaces/IPlayer';
import { ICard } from './interfaces/ICard';
import { IGamePhase } from './interfaces/IGamePhase';

interface SessionState {
  nickname: string;
  sessionCode: string | null;
  connection: signalR.HubConnection | null;
  
  deckPlayer: ICard[];
  players: IPlayer[];
  gamePhase: IGamePhase | null;
  isPlayerTurn: boolean;

  setNickname: (nickname: string) => void;
  createSession: () => Promise<string | undefined>;
  joinSession: (sessionCode: string) => Promise<void>;
  connectToHub: () => Promise<void>;
  declareAction: (actionType: string, payload?: any) => Promise<void>;
  declareChallenge: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  nickname: '',
  sessionCode: null,
  counter: 0,
  players: [],
  connection: null,
  setNickname: (nickname) => set({ nickname }),
  gamePhase: null,
  deckPlayer: [],
  isPlayerTurn: false,

  // Conecta ao SignalR Hub e entra na sessão
  connectToHub: async () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44301/sessionHub') // URL do SignalR Hub
      .withAutomaticReconnect()
      .build();

    try {
      await connection.start();

      connection.on('UpdatePlayers', (players: IPlayer[]) => {
        set({ players });
      });

      connection.on('UpdateGamePhase', (gamePhase: IGamePhase) => {
        set({ gamePhase });
      });

      connection.on('UpdateSession', ({gamePhase, players}: { players: IPlayer[], gamePhase: IGamePhase }) => {
        set({ gamePhase, players });
      });

      connection.on('UpdateDeck', (newPlayerDeck: ICard[]) => {
        set({ deckPlayer: newPlayerDeck});
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
  joinSession: async (sessionCodeParam: string) => {
    const { connection, nickname, sessionCode } = get();

    if (!connection) {
      console.error('Conexão com o SignalR Hub não estabelecida');
      return;
    }

    try {
      await connection.invoke('JoinSession', sessionCodeParam, nickname);

      if(!sessionCode){
        set({ sessionCode: sessionCodeParam })
      }
    } catch (error) {
      console.error('Erro ao entrar na sessão:', error);
    }
  },

  declareAction: async (actionType: string, targetId?: string) => {
    const { connection, sessionCode } = get();
    if (connection && sessionCode) {
      try {
        await connection.invoke("DeclareAction", sessionCode, actionType, targetId);
      } catch (error) {
        console.error('Erro ao incrementar o contador:', error);
      }
    }
  },

  declareChallenge: async () => {
    const { connection, sessionCode } = get();
    if (connection && sessionCode) {
      try {
        await connection.invoke("DeclareChallenge", sessionCode);
      } catch (error) {
        console.error('Erro ao incrementar o contador:', error);
      }
    }
  },
}));