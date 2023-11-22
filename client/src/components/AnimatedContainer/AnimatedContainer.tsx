import { Motion, Presence } from '@motionone/solid';
import { JSXElement } from 'solid-js';
import styles from './style.module.css';

export function AnimatedContainer(props: { children: JSXElement }) {
  return (
    <Presence exitBeforeEnter>
      <Motion.div
        initial={{ opacity: 0, y: '20px' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          easing: [0.6, -0.05, 0.01, 0.99],
        }}
        class={styles.container}
      >
        {props.children}
      </Motion.div>
    </Presence>
  );
}
