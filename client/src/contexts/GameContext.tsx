import { io } from 'socket.io-client';
import { createContext, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';

type GameContext = {
  wait: () => void;
  unwait: () => void;
  state: Game;
};

const GameContext = createContext<GameContext>();

type User = {
  id: string;
  name: string;
};

type Game = {
  id: string | null;
  host: User | null;
  peer: User | null;
  stage: string;
};

const GameProvider = (props: any) => {
  const socket = io('http://localhost:3000/game');

  const [state, setState] = createStore({
    id: null,
    host: null,
    peer: null,
    stage: 'waiting',
  });

  const wait = () => {
    socket.once('game:start', (data) => {
      console.log(data);
    });
  };

  const unwait = () => {
    socket.off('game:start');
  };

  return (
    <GameContext.Provider value={{ wait, unwait, state }}>
      {props.children}
    </GameContext.Provider>
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
