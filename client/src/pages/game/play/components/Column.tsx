import { For, Show } from 'solid-js';
import { Token } from './Token';
import { P } from '@pixi/renderer';
import { useGame } from '@contexts/GameContext';
import { TEXTURES } from '@constants/game';

export function Column(props: any) {
  const { play } = useGame();

  return (
    <P.Sprite
      {...props}
      texture={TEXTURES.COLUMN}
      eventMode="static"
      cursor="pointer"
      pointerdown={() => play(props.index)}
    >
      <For each={props.state}>
        {(token) => (
          <Show when={token}>
            <Token {...token} />
          </Show>
        )}
      </For>
    </P.Sprite>
  );
}
