import { createSignal, JSXElement, onMount, Show } from 'solid-js';
import styles from './style.module.css';
// import { Profile } from '@components/Profile';
import { SideNavigation } from '@components/SideNavigation';
import { Motion, Presence } from '@motionone/solid';
import { timeline } from 'motion';
import { Logo } from '@components/Logo';
import { Navigation } from '@components/Navigation';
import { useAnimation } from '@contexts/AnimationContext';
import gsap from 'gsap';

export function Layout(props: { children: JSXElement }) {
  let initialContainer, initialText, navigation, account, main;

  const [animated, setAnimated] = createSignal(false);

  const { master, addToTimeline } = useAnimation();

  onMount(() => {
    function intro() {
      const tl = gsap.timeline();

      tl.to(initialText, { fillOpacity: 1 });
      tl.to(initialText, { opacity: 0 });
      tl.to(initialContainer, { width: 0 });

      return tl;
    }

    master.add(intro()).addLabel('intro');
  });
  return (
    <div class={styles.container}>
      <Motion.div ref={initialContainer} class={styles.wipe}>
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
      </Motion.div>
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
      <Navigation />
      <main ref={main} class={styles.main}>
        {props.children}
      </main>
      {/* <SideNavigation ref={navigation} /> */}
    </div>
  );
}
