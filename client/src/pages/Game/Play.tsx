import { Board } from '@components/game/Board';
import { GameProvider, useGame } from '@contexts/GameContext';
import { Match, Show, Switch } from 'solid-js';
import { Motion } from '@motionone/solid';

function Waiting() {
  const { state } = useGame();

  console.log(state);
  return (
    <div style={{ display: 'flex ' }}>
      <Show when={state.host}>
        <Motion.div
          style={{
            display: 'flex',
            height: '100vh',
            width: '50%',
            'background-color': 'var(--yellow-main)',
          }}
          animate={{
            transform: ['translateY(-100%)', 0],
          }}
          transition={{ duration: 1, easing: [0.25, 1, 0.5, 1] }}
        >
          <h1>{state.host.name}</h1>
        </Motion.div>
      </Show>
      <Show when={state.peer}>
        <Motion.div
          style={{
            display: 'flex',
            height: '100vh',
            width: '50%',
            'background-color': 'var(--red-main)',
          }}
          animate={{
            transform: ['translateY(100%)', 0],
          }}
          transition={{ duration: 1, easing: [0.25, 1, 0.5, 1] }}
        >
          <h1>{state.peer.name}</h1>
        </Motion.div>
      </Show>
    </div>
  );
}

function Test() {
  const { state } = useGame();

  return (
    <Waiting />
    // <Switch fallback={<p>Loading...</p>}>
    //   <Match when={state.stage === 'waiting'}>
    //     <Waiting />
    //   </Match>
    //   <Match when={state.stage === 'playing' || state.stage === 'ended'}>
    //     <Board />
    //   </Match>
    // </Switch>
  );
}

export default function Play(props) {
  return (
    <GameProvider initialState={props.game}>
      <Test />
    </GameProvider>
  );
}
