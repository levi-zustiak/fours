import { Link } from 'inertia-solid';
import styles from './style.module.css';

export function Logo() {
  return (
    <Link href="/">
      <div class={styles.container}>
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="36" r="12" fill="#FFDC97" />
          <circle
            cx="12"
            cy="36"
            r="7.84615"
            stroke="#FFD179"
            stroke-width="2.30769"
          />
          <circle cx="36" cy="12" r="12" fill="#FFDC97" />
          <circle
            cx="36"
            cy="12"
            r="7.84615"
            stroke="#FFD179"
            stroke-width="2.30769"
          />
          <circle cx="12" cy="12" r="12" fill="#F76D76" />
          <circle
            cx="12"
            cy="12"
            r="7.84615"
            stroke="#F55761"
            stroke-width="2.30769"
          />
          <circle cx="36" cy="36" r="12" fill="#F76D76" />
          <circle
            cx="36"
            cy="36"
            r="7.84615"
            stroke="#F55761"
            stroke-width="2.30769"
          />
        </svg>
        <h3 class={styles.text}>FOURS</h3>
      </div>
    </Link>
  );
}
