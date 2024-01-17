import { createContext, For, onMount, Show } from 'solid-js';
// import { Column } from './Column';
import { useGame } from '@contexts/GameContext';
import { GSAP } from '@packages/gsap';
import { useAnimation } from '@contexts/AnimationContext';
import styles from './style.module.css';

export const GameContext = createContext();

export function Board() {
  const { state, play } = useGame();
  const { master } = useAnimation();

  return (
    <GSAP.div
      timeline={master}
      from={{ y: 128, opacity: 0, duration: 1, ease: 'expo' }}
      class={styles.board}
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
          fill="none"
          rx="32"
          ry="32"
        />

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

                        <circle
                          cx={x}
                          cy={y}
                          r="48"
                          fill="none"
                          stroke="black"
                          stroke-width="3"
                        />
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
