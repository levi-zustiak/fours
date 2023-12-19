import { Logo } from '@components/Logo';
import styles from './style.module.css';
import { Motion, Presence } from '@motionone/solid';
import { Match, Show, Switch, createEffect, createSignal } from 'solid-js';
import { Menu, X, User, Bell, BellRing } from 'lucide-solid';
import { glide, spring } from 'motion';

const Token = () => {
  return (
    <Motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', 'z-index': '-1' }}
      initial={{ y: '-96px' }}
      animate={{
        y: 0,
        transition: {
          duration: 0.5,
          easing: [0.32, 0, 0.67, 0],
        },
      }}
      exit={{
        y: '48px',
        transition: { duration: 0.33, easing: [0.32, 0, 0.67, 0] },
      }}
    >
      <circle cx="24" cy="24" r="24" fill="#F76D76" />
      <circle cx="24" cy="24" r="16.5" stroke="#F55761" stroke-width="3" />
    </Motion.svg>
  );
};

export function Navigation() {
  const [open, setOpen] = createSignal(true);
  const [hovered, setHovered] = createSignal<'user' | 'bell' | null>(null);

  return (
    <div class={styles.container}>
      <Logo />
      <div class={styles.actions}>
        <div class={styles.action} onClick={() => setOpen((prev) => !prev)}>
          <Switch>
            <Match when={!open()}>
              <Menu />
            </Match>
            <Match when={open()}>
              <X />
            </Match>
          </Switch>
          <div class={styles.mask} />
        </div>
        <Show when={open()}>
          <Motion.div
            class={styles.action}
            onMouseEnter={() => setHovered('user')}
            onMouseLeave={() => setHovered(null)}
          >
            <Presence exitBeforeEnter>
              <Show when={hovered() === 'user'}>
                <Token />
              </Show>
            </Presence>
            <User />
            <div class={styles.mask} />
          </Motion.div>
          <Motion.div
            class={styles.action}
            onMouseEnter={() => setHovered('bell')}
            onMouseLeave={() => setHovered(null)}
          >
            <Presence exitBeforeEnter>
              <Show when={hovered() === 'bell'}>
                <Token />
              </Show>
            </Presence>
            <Bell />
            <div class={styles.mask} />
          </Motion.div>
        </Show>
      </div>
    </div>
  );
}
