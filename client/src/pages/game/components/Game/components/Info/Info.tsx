import { useGame } from '@contexts/GameContext';
import styles from './style.module.css';
import { usePage } from 'inertia-solid';
import { Player, Position } from '@/types/game.types';

function Token({ position }: { position: Position }) {
  return (
    <svg width="32" height="32">
      <circle
        cx="16"
        cy="16"
        r="16"
        fill={position ? 'var(--yellow-main)' : 'var(--red-main)'}
      />
    </svg>
  );
}

export function Info() {
  const { state } = useGame();
  const { user } = usePage().props;

  const me = () =>
    state.players.find((player) => player.id === user.id) as Player;
  const opponent = () =>
    state.players.find((player) => player.id !== user.id) as Player;

  console.log(user, me, opponent);

  return (
    <div class={styles.info}>
      <div class={styles.player}>
        <Token position={me().playingAs} />
        <h3>{me().name}</h3>
      </div>
      <div class={styles.wins}>
        <p>{`${me().wins} : ${opponent().wins}`}</p>
      </div>
      <div
        class={styles.player}
        style={{
          'flex-direction': 'row-reverse',
        }}
      >
        <Token position={opponent().playingAs} />
        <h3>{opponent().name}</h3>
      </div>
    </div>
  );
}
