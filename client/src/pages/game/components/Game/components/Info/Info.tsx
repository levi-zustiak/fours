import { useGame } from '@contexts/GameContext';
import styles from './style.module.css';
import { usePage } from 'inertia-solid';
import { Player } from '@/types/game.types';
import { clsx } from 'clsx';

export function Info() {
  const { state } = useGame();
  const { user } = usePage().props;

  const me = () =>
    state.players.find((player) => player.id === user.id) as Player;
  const opponent = () =>
    state.players.find((player) => player.id !== user.id) as Player;

  return (
    <div class={styles.info}>
      <div class={styles.player}>
        <div class={clsx(styles.token, styles[me().playingAs])}></div>
        <h3>{me().name}</h3>
      </div>
      <div class={styles.wins}>
        <h4>{me().wins}</h4>
        <h4>:</h4>
        <h4>{opponent().wins}</h4>
      </div>
      <div
        class={styles.player}
        style={{
          'flex-direction': 'row-reverse',
        }}
      >
        <div class={clsx(styles.token, styles[opponent().playingAs])}></div>
        <h3>{opponent().name}</h3>
      </div>
    </div>
  );
}
