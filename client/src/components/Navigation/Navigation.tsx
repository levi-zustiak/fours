import { Logo } from '@components/Logo';
import styles from './style.module.css';
import { Motion, Presence } from '@motionone/solid';
import { For, Match, Show, Switch, createEffect, createSignal } from 'solid-js';
import { Menu, X, User, Settings, Bell, BellRing } from 'lucide-solid';
import { stagger } from 'motion';
import { PresenceList } from '@motionone/solid';

const Token = (props) => {
  const calculateFinal = () => {
    return 168 - (12 + 48) * props.index;
  };

  return (
    <Motion.svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', 'z-index': '-1', top: '-48px' }}
      initial={{ y: 0 }}
      animate={{
        y: calculateFinal(),
        transition: {
          duration: 0.33,
          easing: [0.32, 0, 0.67, 0],
          delay: 0.2 * props.index,
        },
      }}
      exit={{
        y: 168 + 48,
        transition: {
          delay: 0.1 * props.index,
          duration: 0.33,
          easing: [0.32, 0, 0.67, 0],
        },
      }}
    >
      <circle
        cx="24"
        cy="24"
        r="24"
        fill={props.color === 'red' ? '#F76D76' : '#FFDC97'}
      />
    </Motion.svg>
  );
};

// export function Navigation() {
//   const [open, setOpen] = createSignal(true);
//   const [hovered, setHovered] = createSignal<'user' | 'bell' | null>(null);

//   return (
//     <div class={styles.container}>
//       <Logo />
//       <div class={styles.actions}>
//         <div class={styles.action} onClick={() => setOpen((prev) => !prev)}>
//           <Switch>
//             <Match when={!open()}>
//               <Menu />
//             </Match>
//             <Match when={open()}>
//               <X />
//             </Match>
//           </Switch>
//           <div class={styles.mask} />
//         </div>
//         <Show when={open()}>
//           <Motion.div
//             class={styles.action}
//             onMouseEnter={() => setHovered('user')}
//             onMouseLeave={() => setHovered(null)}
//           >
//             <Presence exitBeforeEnter>
//               <Show when={hovered() === 'user'}>
//                 <Token />
//               </Show>
//             </Presence>
//             <User />
//             <div class={styles.mask} />
//           </Motion.div>
//           <Motion.div
//             class={styles.action}
//             onMouseEnter={() => setHovered('bell')}
//             onMouseLeave={() => setHovered(null)}
//           >
//             <Presence exitBeforeEnter>
//               <Show when={hovered() === 'bell'}>
//                 <Token />
//               </Show>
//             </Presence>
//             <Bell />
//             <div class={styles.mask} />
//           </Motion.div>
//         </Show>
//       </div>
//     </div>
//   );
// }

export function Navigation() {
  const [open, setOpen] = createSignal(true);
  const [tokens, setTokens] = createSignal([]);
  const [token, setToken] = createSignal<boolean>(true);

  const links = ['profile', 'settings'];

  const addToken = (count) => {
    console.log('count', count);
    if (count === 0) {
      return;
    }

    const next = token() ? 'red' : 'yellow';
    setTokens((prev) => [...prev, next]);
    setToken((prev) => !prev);

    addToken(--count);
  };

  const handleHover = (index) => {
    if (tokens().length - 1 < index) {
      addToken(index + 1 - tokens().length);
    }

    if (tokens().length - 1 > index) {
      setTokens((prev) => {
        const t = [...prev];

        t.shift();

        return t;
      });
    }
  };

  return (
    <nav class={styles.nav}>
      <Logo />
      <div
        onMouseLeave={() => {
          setTokens([]);
        }}
        style={{
          position: 'absolute',
          right: '48px',
        }}
      >
        <div class={styles.actions}>
          <div
            class={styles.action}
            onClick={() => setOpen((prev) => !prev)}
            onMouseEnter={() => handleHover(2)}
          >
            <Switch>
              <Match when={!open()}>
                <Menu />
              </Match>
              <Match when={open()}>
                <X />
              </Match>
            </Switch>
          </div>
          <Show when={open()}>
            <Motion.div
              class={styles.action}
              onMouseEnter={() => handleHover(1)}
            >
              <User />
            </Motion.div>
            <Motion.div
              class={styles.action}
              onMouseEnter={() => handleHover(0)}
            >
              <Settings />
            </Motion.div>

            <PresenceList>
              <For each={tokens()}>
                {(token, i) => (
                  <Show when={token}>
                    <Token index={i()} color={token} />p
                  </Show>
                )}
              </For>
            </PresenceList>
          </Show>
        </div>
      </div>
      <svg width="0" height="0">
        <defs>
          <clipPath id="mask">
            <circle cx="24" cy="24" r="24" />
            <circle cx="24" cy="84" r="24" />
            <circle cx="24" cy="144" r="24" />
          </clipPath>
        </defs>
      </svg>
    </nav>
  );
}
