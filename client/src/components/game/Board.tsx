import { createContext, For, onMount } from 'solid-js';
import { Column } from './Column';
import { Stage } from '@pixi/components/Stage';
import { P } from '@pixi/renderer';
import { gsap } from 'gsap';
import { useGame } from '@contexts/GameContext';
import { TEXTURES } from '@constants/game';

export const GameContext = createContext();

export function Board() {
  let board;
  const { state } = useGame();

  onMount(() => {
    gsap.fromTo(
      board,
      { alpha: 0, y: 128 },
      { alpha: 1, y: 64, duration: 1.5, ease: 'expo' },
    );
  });

  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        'place-items': 'center',
      }}
    >
      <Stage width={960 + 128} height={720 + 128} backgroundAlpha={0}>
        <P.Container position={{ x: 64, y: 64 }}>
          <For each={state.board}>
            {(column, index) => (
              <Column index={index()} state={column} x={32 + 128 * index()} />
            )}
          </For>
        </P.Container>
        <P.Sprite ref={board} x={64} texture={TEXTURES.BOARD} />
      </Stage>
    </div>
  );
}
