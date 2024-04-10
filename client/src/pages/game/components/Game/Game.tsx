import { useGame } from '@contexts/GameContext';
import { Board } from '../Board';
import { Chat } from './components/Chat';
import { History } from './components/History';
import { Info } from './components/Info';
import styles from './style.module.css';
import { Show } from 'solid-js';
import { usePage } from 'inertia-solid';
import { Modal } from '../../../../components/Modal';
import { Button } from '@components/Button';

function Modals() {
  const { state, rematch, accept } = useGame();
  const { user } = usePage().props;

  return (
    <>
      <Modal.Root>
        <Modal.Portal when={!state.engine?.playing}>
          <Modal.Content>
            <h3>Game Over</h3>
            <Modal.Actions>
              <Button onClick={rematch}>Rematch?</Button>
            </Modal.Actions>
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>
      <Show when={state.challenge?.challenger}>
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
      <Board />
      {/* <Chat /> */}
      <Info />
      <Modals />
    </div>
  );
}
