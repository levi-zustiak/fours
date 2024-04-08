import { useGame } from '@contexts/GameContext';
import styles from './style.module.css';

function Players() {
  const { state } = useGame();

  console.log(state);

  return (
    <div class={styles.players}>
      <h4
        style={{
          'background-color': state.players[0].playingAs
            ? 'var(--yellow-main)'
            : 'var(--red-main)',
        }}
      >
        {state.players[0].name}
      </h4>
      <p>{`${state.players[0].wins} : ${state.players[1].wins}`}</p>
      <h4
        style={{
          'background-color': state.players[1].playingAs
            ? 'var(--yellow-main)'
            : 'var(--red-main)',
        }}
      >
        {state.players[1].name}
      </h4>
    </div>
  );
}

export function Info() {
  return (
    <div class={styles.info}>
      <Players />
      <div></div>
    </div>
  );
}
