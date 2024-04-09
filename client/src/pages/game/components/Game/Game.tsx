import { useGame } from '@contexts/GameContext';
import { Board } from '../Board';
import { Chat } from '../Chat';
import { History } from '../History';
import { Info } from '../Info';
import styles from './style.module.css';
import { Show } from 'solid-js';
import { usePage } from 'inertia-solid';

function Modals() {
  const { state, rematch, accept } = useGame();
  const { user } = usePage().props;

  return (
    <>
      <Show when={!state.engine?.playing}>
        <div style={{ position: 'absolute', border: '3px solid orange' }}>
          <h1>GameOver</h1>
          <button onClick={rematch}>Rematch?</button>
        </div>
      </Show>
      <Show when={state.challenge?.challenger}>
        <h1>Rematch?</h1>
        <button onClick={accept}>Accept</button>
      </Show>
    </>
  );
}

export function Game() {
  return (
    <div class={styles.container}>
      {/* <History /> */}
      <Board />
      {/* <Chat /> */}
      <Info />
      <Modals />
    </div>
  );
}
