import { GSAP } from '@packages/gsap';
import styles from './style.module.css';
import clsx from 'clsx';

export function OptionCard(props) {
  return (
    <GSAP.div class={clsx(styles.container, styles[props.color])}>
      <h1 class={styles.text}>{props.text}</h1>
    </GSAP.div>
  );
}
