import { For } from 'solid-js';
import styles from './style.module.css';
import { useGame } from '@contexts/GameContext';
import { Container } from '../../../Container';
import { Entry } from './Entry';

export function History() {
  const { state } = useGame();

  return (
    <Container
      title="History"
      style={{ 'grid-area': 'history', width: '400px', height: 'min-content' }}
    >
      <div
        style={{
          display: 'grid',
          'grid-template-columns': '1fr 1fr',
          'align-content': 'start',
          height: '260px',
          'overflow-x': 'scroll',
        }}
      >
        <For each={state.moveList}>
          {(move) => (
            <Entry {...move} />
            // <div>
            //   <p>
            //     col {move.coords.col + 1}; row {move.coords.row + 1}{' '}
            //   </p>
            // </div>
          )}
        </For>
      </div>
      <div class={styles.history_actions}></div>
    </Container>
  );
}
