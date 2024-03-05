import { createContext, For, onMount, Show } from 'solid-js';
// import { Column } from './Column';
import { useGame } from '@contexts/GameContext';
import { GSAP } from '@packages/gsap';
import { useAnimation } from '@contexts/AnimationContext';
import styles from './style.module.css';
import gsap from 'gsap';

export const GameContext = createContext();

export function Board(props) {
  const { state, play } = useGame();
  const { master } = useAnimation();
  let ref;

  onMount(() => {
    function initial() {
      const tl = gsap.timeline();

      tl.fromTo(
        ref,
        {
          scale: 0.8,
          y: '100%',
          opacity: 0,
          position: 'absolute',
          bottom: 0,
          // transform: 'translateY(100%)',
        },
        {
          // scale: 0.9,
          scale: 1,
          ease: 'back.out(1)',
          y: '50%',
          // transform: 'translateY(50%)',
          opacity: 1,
          duration: 0.66,
        },
        '<+=0.33',
      );
    }

    function exit() {
      const tl = gsap.timeline();
      tl.to(ref, {
        scale: 0.8,
        y: '100%',
        opacity: 0,
        bottom: 0,
      });
    }

    function playing() {
      const tl = gsap.timeline();

      tl.from(ref, { opacity: 0 });
    }

    console.log(state.stage);

    switch (state?.stage) {
      case 'waiting':
        console.log('waiting');
        master.add(initial());
        break;
      case 'playing':
        master.add(playing());
        break;
      default:
        master.add(initial());
    }

    return () => {
      master.add(initial);
    };
    // master.add(initial());
  });

  return (
    <GSAP.div
      ref={ref}
      class={styles.board}
      // ref={props.ref}
      // timeline={master}
      // from={{
      //   transform: 'translateY(100%)',
      //   scale: 0.9,
      //   duration: 1,
      //   ease: 'expo',
      // }}
      // style={{
      //   position: 'absolute',
      //   bottom: 0,
      //   transform: 'translateY(50%)',
      //   scale: 0.9,
      // }}
    >
      <svg width="960" height="720" viewBox="-1.5 -1.5 963 723">
        <defs>
          <clipPath id="tokens">
            <For each={[...Array(7)]}>
              {(_, i) => (
                <For each={[...Array(6)]}>
                  {(_, j) => {
                    const y = 720 - 24 - 112 / 2 - 112 * j();
                    const x = ((960 - 64) / 7) * (i() + 1) - 32;
                    return <circle cx={x} cy={y} r="50" />;
                  }}
                </For>
              )}
            </For>
          </clipPath>
        </defs>

        <rect
          width="960"
          height="720"
          stroke="currentcolor"
          stroke-width="3"
          fill="var(--blue)"
          rx="32"
          ry="32"
        />

        <For each={[...Array(7)]}>
          {(_, i) => (
            <For each={[...Array(6)]}>
              {(_, j) => (
                <circle
                  cx={((960 - 64) / 7) * (i() + 1) - 32}
                  cy={720 - 24 - 112 / 2 - 112 * j()}
                  r="48"
                  fill="var(--white-main)"
                  stroke="black"
                  stroke-width="3"
                />
              )}
            </For>
          )}
        </For>

        <g clip-path="url(#tokens)">
          <For each={state.board}>
            {(column, idx) => (
              <>
                <rect
                  class={styles.column}
                  height={720}
                  width={(960 - 64) / 7}
                  x={((960 - 64) / 7) * idx() + 32}
                  fill="none"
                  pointer-events="all"
                  onMouseDown={() => play(idx())}
                />
                <For each={column}>
                  {(token, index) => {
                    const y = 720 - 24 - 112 / 2 - 112 * index();
                    const x = ((960 - 64) / 7) * (idx() + 1) - 32;

                    return (
                      <>
                        <Show when={token}>
                          <GSAP.circle
                            cx={x}
                            cy={y}
                            r="48"
                            fill={
                              token.playedBy === 0
                                ? 'var(--red-main)'
                                : 'var(--yellow-main)'
                            }
                            from={{ y: -960, duration: 1, ease: 'bounce.out' }}
                          />
                        </Show>
                      </>
                    );
                  }}
                </For>
              </>
            )}
          </For>
        </g>
      </svg>
    </GSAP.div>
  );
}
