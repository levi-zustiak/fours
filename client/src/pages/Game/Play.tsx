import { Board } from '@components/game/Board';
import { GameProvider, useGame } from '@contexts/GameContext';
import { Match, Switch, createEffect, onMount } from 'solid-js';

function Test() {
  const { state } = useGame();

  return (
    <Switch fallback={<p>Loading...</p>}>
      <Match when={state.stage === 'waiting'}>
        <p>Waiting...</p>
      </Match>
      <Match when={state.stage === 'playing'}>
        <Board />
      </Match>
    </Switch>
  );
}

export default function Play(props) {
  console.log(props.game);
  return (
    <GameProvider initialState={props.game}>
      <Test />
    </GameProvider>
  );
}
