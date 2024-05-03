import { Game } from '@/types/game.types';
import { User } from '@/types/auth.types';
import { io } from 'socket.io-client';
import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext,
} from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';

interface GameContext {
  state: Game;
  play: (col: number) => void;
  ready: () => void;
  rematch: () => void;
  accept: () => void;
}

interface Message {
  text: string;
  from: User;
}

const GameContext = createContext<GameContext>();

const GameProvider = (props: any) => {
  const socket = io('http://localhost:3000/game');

  const [state, setState] = createStore(props.initialState);
  const [chats, setChats] = createSignal<Message[]>([]);

  const handleUpdate = ({ game }: any) => setState(reconcile(game));

  const init = () => {
    socket.on('update', handleUpdate);
    socket.on('chat', (chat) => setChats((prev) => [...prev, chat]));

    socket.emit('join', { gameId: state.id });
  };

  const ready = () => {
    socket.emit('ready', { gameId: state.id });
  };

  const play = (col: number) => {
    // use callback for errors/validations
    socket.emit('update', { gameId: state.id, col });
  };

  const rematch = () => socket.emit('rematch', { gameId: state.id });

  const cancel = () => socket.emit('cancel', { gameId: state.id });

  const accept = () => socket.emit('accept', { gameId: state.id });

  const decline = () => socket.emit('decline', { gameId: state.id });

  const sendChat = (message: string) => {
    socket.emit('chat', { gameId: state.id, message });
  };

  onMount(() => {
    registerListeners();

    if (state.id) {
      init();
    }

    return () => {
      socket.removeAllListeners();
    };
  });

  createEffect(() => console.log(chats()));
  createEffect(() => console.log(state));

  const registerListeners = () => {
    socket.on('update', handleUpdate);
    socket.on('chat', (chat) => setChats((prev) => [...prev, chat]));
  };

  const value = {
    state,
    ready,
    play,
    rematch,
    cancel,
    accept,
    decline,
    chats,
    sendChat,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};

function useGame() {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("GameContext was used outside of it's provider");
  }

  return context;
}

export { GameContext, GameProvider, useGame };
