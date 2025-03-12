import { create } from 'zustand';
import * as signalR from '@microsoft/signalr';
import { GamePhaseEnum } from '../enums/GamePhaseEnum';
import { useNavigate } from '@tanstack/react-router';
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

  setNickname: (nickname: string) => void;
  createSession: () => Promise<string | undefined>;
  joinSession: (sessionCode: string) => Promise<void>;
  connectToHub: () => Promise<void>;
  doAction: (actionType: string, payload?: any) => Promise<void>;
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

      connection.on('StartGame', (newPlayerDeck: ICard[]) => {
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

  doAction: async (actionType: string, payload?: any) => {
    const { connection, sessionCode } = get();
    if (connection && sessionCode) {
      try {
        await connection.invoke("ExecuteAction", sessionCode, actionType, payload);
      } catch (error) {
        console.error('Erro ao incrementar o contador:', error);
      }
    }
  },
}));