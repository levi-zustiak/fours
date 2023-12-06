import { createSignal, JSXElement, onMount, Show } from 'solid-js';
import styles from './style.module.css';
// import { Profile } from '@components/Profile';
import { SideNavigation } from '@components/SideNavigation';
import { Motion, Presence } from '@motionone/solid';
import { timeline } from 'motion';

export function DefaultLayout(props: { children: JSXElement }) {
  let initialContainer, initialText, navigation, account, main;

  const [animated, setAnimated] = createSignal(false);

  onMount(() => {
    timeline(
      [
        // [initialText, { fillOpacity: 1 }, { delay: 1, duration: 0.75 }],
        // [initialText, { opacity: 0 }],
        // [
        //   initialContainer,
        //   { width: 0 },
        //   { duration: 0.75, easing: [0.87, 0, 0.13, 1], at: '<' },
        // ],
        [navigation, { transform: 'translateX(0)' }],
        // [
        //   account,
        //   { opacity: [0, 1], right: '64px', transform: 'translateX(0)' },
        //   { at: '<' },
        // ],
        // [main, { y: [150, 0], opacity: [0, 1] }, { at: '<' }],
      ],
      { defaultOptions: { duration: 1, easing: [0.25, 1, 0.5, 1] } },
    );
  });
  return (
    <div class={styles.container}>
      {/* <Motion.div ref={initialContainer} class={styles.wipe}>
        <Presence>
          <Show when={!animated()}>
            <svg ref={initialText} class={styles.text}>
              <text
                x="50%"
                y="50%"
                dominant-baseline="middle"
                text-anchor="middle"
              >
                FOURS
              </text>
            </svg>
          </Show>
        </Presence>
      </Motion.div> */}
      {/* <div
        ref={account}
        style={{
          position: 'fixed',
          top: '64px',
          right: '0',
          transform: 'translateX(100%)',
          display: 'flex',
          gap: '2rem',
        }}
      > */}
      {/* <Profile /> */}
      {/* </div> */}
      <main ref={main} class={styles.main}>
        {props.children}
      </main>
      <SideNavigation ref={navigation} />
    </div>
  );
}
