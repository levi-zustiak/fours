import { useGame } from '@contexts/GameContext';
import { Board } from '../Board';
import { Info } from './components/Info';
import styles from './style.module.css';
import { Show } from 'solid-js';
import { usePage } from 'inertia-solid';
import { Button } from '@components/Button';

function Modal(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        'background-color': 'var(--background-main)',
        border: '3px solid var(--border-main)',
        'border-radius': '8px',
        padding: '1rem',
      }}
    >
      <h3>{props.title}</h3>
      {props.children}
    </div>
  );
}

function Modals() {
  const { state, rematch, accept } = useGame();
  const { user } = usePage().props;

  return (
    <>
      <Show when={!state.engine.playing && state.state.rematch === undefined}>
        {/* TODO: Show winner and loser modals */}
        <Modal title="Game over">
          <Button onClick={rematch}>Rematch</Button>
          <Button onClick={() => undefined} variant="outlined">
            Leave
          </Button>
        </Modal>
      </Show>
      <Show when={state.state.rematch?.recipient === user.id}>
        <Modal title="Rematch?">
          <Button onClick={accept}>Accept</Button>
          <Button onClick={() => undefined}>Leave</Button>
        </Modal>
      </Show>
      <Show when={state.state.rematch?.challenger === user.id}>
        <Modal title="Waiting">
          <Button onClick={() => undefined}>Cancel</Button>
          <Button onClick={() => undefined} variant="outlined">
            Leave
          </Button>
        </Modal>
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
