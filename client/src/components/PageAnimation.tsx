import { Motion, Presence } from '@motionone/solid';
import { JSXElement } from 'solid-js';

export function PageAnimation(props: { children: JSXElement }) {
  return (
    <Presence exitBeforeEnter>
      <Motion.div
        initial={{ opacity: 0, y: '20px' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          easing: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        {props.children}
      </Motion.div>
    </Presence>
  );
}
