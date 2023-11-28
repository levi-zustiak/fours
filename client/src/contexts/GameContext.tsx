import { router } from 'inertia-solid';
import { io } from 'socket.io-client';
import { createContext, useContext } from 'solid-js';
import { createStore, reconcile } from 'solid-js/store';

type GameContext = {
  state: Game;
  join: (gameId: string) => void;
  unwait: () => void;
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

  const [state, setState] = createStore({
    id: null,
    host: null,
    peer: null,
    stage: 'waiting',
  });

  const unwait = () => {
    socket.off('game:start');
  };

  const join = (gameId: string) => {
    socket.emit('join', { gameId }, ({ game }: { game: any }) => {
      setState(game);
    });

    socket.once('game:start', ({ game }: { game: any }) => {
      console.log('game:start', game);
      setState(game);
      router.get(`/play/${game.id}`);
    });
  };

  const init = (initialState: any) => {
    setState(initialState);

    socket.on('game:update', ({ game }) => {
      console.log('game:update', game);
      setState(reconcile(game));
    });
  };

  const play = (col: number) => {
    console.log(col);
    socket.emit('UPDATE', { gameId: state.id, col }, (payload: any) =>
      console.log(payload),
    );
  };

  const value = {
    state,
    unwait,
    join,
    init,
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
