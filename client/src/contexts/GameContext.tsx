import { router } from 'inertia-solid';
import { io } from 'socket.io-client';
import { createContext, createEffect, onMount, useContext } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';

type GameContext = {
  state: Game;
  play: (col: number) => void;
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
  const socket = io('http://localhost:3000/games');

  const [state, setState] = createStore(props.initialState);

  const handleStart = ({ game }: any) => {
    setState(game);

    socket.on('game:update', handleUpdate);
  };

  const handleUpdate = ({ game }: any) => {
    setState(reconcile(game));
  };

  const init = () => {
    socket.emit('join', { gameId: state.id }, ({ game }: any) =>
      setState(game),
    );

    socket.once('game:start', handleStart);
  };

  const play = (col: number) => {
    // use callback for errors/validations
    socket.emit('UPDATE', { gameId: state.id, col });
  };

  onMount(() => {
    if (state.id) {
      init();
    }
  });

  const value = {
    state,
    play,
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
