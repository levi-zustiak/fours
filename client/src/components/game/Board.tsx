import { createContext, For, onMount } from 'solid-js';
import { Column } from './Column';
import { Stage } from '@pixi/components/Stage';
import { P } from '@pixi/renderer';
import { gsap } from 'gsap';
import { useGame } from '@contexts/GameContext';
import { TEXTURES } from '@constants/game';
import { GSAP } from '@packages/gsap';
import { useAnimation } from '@contexts/AnimationContext';
import styles from './style.module.css';

export const GameContext = createContext();

export function Board() {
  let board;
  const { state } = useGame();
  const { master } = useAnimation();

  // onMount(() => {
  //   gsap.fromTo(
  //     board,
  //     { alpha: 0, y: 128 },
  //     { alpha: 1, y: 64, duration: 1.5, ease: 'expo' },
  //   );
  // });

  return (
    <GSAP.div
      style={{
        height: '100vh',
        display: 'grid',
        'place-items': 'center',
      }}
      timeline={master}
      from={{ y: 128, opacity: 0, duration: 1, ease: 'expo' }}
    >
      {/* <Stage width={960 + 128} height={720 + 128} backgroundAlpha={0}>
        <P.Container position={{ x: 64, y: 64 }}>
          <For each={state.board}>
            {(column, index) => (
              <Column index={index()} state={column} x={32 + 128 * index()} />
            )}
          </For>
        </P.Container>
        <P.Sprite ref={board} x={64} texture={TEXTURES.BOARD} />
      </Stage> */}
      <div class={styles.board}>
        <For each={state.board}>
          {(column, index) => (
            <div class={styles.column}>
              <For each={column}>
                {(token, index) => {
                  console.log(token);
                  return (
                    <div class={styles.cell}>
                      <Show when={token}>
                        <div class={styles.token} />
                      </Show>
                    </div>
                  );
                }}
              </For>
            </div>
          )}
        </For>
      </div>
    </GSAP.div>
  );
}
