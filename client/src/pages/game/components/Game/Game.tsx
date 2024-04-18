import { useGame } from '@contexts/GameContext';
import { Board } from '../Board';
import { Info } from './components/Info';
import styles from './style.module.css';
import { Show } from 'solid-js';
import { usePage } from 'inertia-solid';
import { Button } from '@components/Button';

function Modals() {
  const { state, rematch, accept } = useGame();
  const { user } = usePage().props;

  return (
    <>
      <Show when={!state.engine.playing}>
        <div style={{ position: 'absolute', border: '3px solid orange' }}>
          <h1>Game over</h1>
          <button onClick={rematch}>Rematch</button>
        </div>
      </Show>
      <Show when={state.state.rematch?.challenger}>
        <div style={{ position: 'absolute', border: '3px solid orange' }}>
          <h1>Rematch?</h1>
          <button onClick={accept}>Accept</button>
        </div>
      </Show>
    </>
  );
}

export function Game() {
  return (
    <div class={styles.container}>
      {/* <History /> */}
      <Info />
      <Board />
      {/* <Chat /> */}
      <Modals />
    </div>
  );
}
