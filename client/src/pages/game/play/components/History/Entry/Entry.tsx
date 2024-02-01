import styles from './style.module.css';

import { Token } from '../../../../../../../../core/types/game';
import clsx from 'clsx';
import { GSAP } from '@packages/gsap';

function Icon({ playedBy }) {
  return (
    <svg
      class={styles.svg}
      viewBox="0 0 65 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="32.5"
        cy="32"
        r="32"
        fill={playedBy ? 'var(--yellow-main)' : 'var(--red-main)'}
      />
      <circle
        cx="32.5"
        cy="32"
        r="20.9471"
        stroke={playedBy ? 'var(--secondary-accent)' : 'var(--primary-accent)'}
        stroke-width="6.10577"
      />
    </svg>
  );
}

export function Entry(props: Token) {
  return (
    <GSAP.div
      from={{ opacity: 0 }}
      class={clsx(styles.entry_container, {
        [styles.winner]: props.winningToken,
      })}
    >
      <Icon playedBy={props.playedBy} />
      <p class={styles.text}>
        C: {props.coords.col} R: {props.coords.row}
      </p>
    </GSAP.div>
  );
}
