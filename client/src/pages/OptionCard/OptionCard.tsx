import { GSAP } from '@packages/gsap';
import styles from './style.module.css';
import clsx from 'clsx';

export function OptionCard(props) {
  return (
    <GSAP.div class={clsx(styles.container, styles[props.color])}>
      <span class={styles.text}>{props.text}</span>
    </GSAP.div>
  );
}
