import { io } from 'socket.io-client';
import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext,
} from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';

type GameContext = {
  state: Game;
  play: (col: number) => void;
  ready: () => void;
};

type Message = {
  text: string;
  from: User;
};

const GameContext = createContext<GameContext>();

type User = {
  id: string;
  name: string;
};

type Player = User;

type Game = {
  id: string | null;
  host: User | null;
  peer: User | null;
  stage: string;
  board?: any;
  players: Record<string, Player>;
  currentPlayer: string;
  moveList: number[];
};

const GameProvider = (props: any) => {
  const socket = io('http://localhost:3000/game');

  const [state, setState] = createStore(props.initialState);
  const [chats, setChats] = createSignal<Array<Message>>([]);

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

  const rematch = () => {
    socket.emit('rematch', { gameId: state.id });
  };

  const accept = () => {
    socket.emit('accept', { gameId: state.id });
  };

  const sendChat = (message: string) => {
    socket.emit('chat', { gameId: state.id, message });
  };

  onMount(() => {
    if (state.id) {
      init();
    }
  });

  createEffect(() => console.log(chats()));

  const value = {
    state,
    ready,
    play,
    rematch,
    accept,
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
