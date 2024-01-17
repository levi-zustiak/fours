import { useGame } from '@contexts/GameContext';
import styles from './style.module.css';

export function Players() {
  const { state } = useGame();

  return (
    <div class={styles.container}>
      <p>{state.players[0].name}</p>
      <p>{state.players[0].wins}</p>
      <p>{state.players[1].wins}</p>
      <p>{state.players[1].name}</p>
    </div>
  );
}
