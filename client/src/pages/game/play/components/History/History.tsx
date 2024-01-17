import { For } from 'solid-js';
import styles from './style.module.css';
import { useGame } from '@contexts/GameContext';

export function History() {
  const { state } = useGame();

  return (
    <div class={styles.history}>
      <div>
        <div style={{ height: '48px', 'background-color': 'black' }}>
          <h3 style={{ color: 'white' }}>History</h3>
        </div>
        <div>
          <For each={state.moveList}>
            {(move) => (
              <div>
                <p>
                  col {move.coords.col + 1}; row {move.coords.row + 1}{' '}
                </p>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
