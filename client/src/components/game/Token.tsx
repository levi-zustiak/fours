import { gsap } from 'gsap';
import { P } from '@pixi/renderer';
import { JSXElement, Show, onMount } from 'solid-js';
import { TEXTURES } from '@constants/game';

export function Token(props: any): JSXElement {
  let ref;

  const texture = props.playedBy ? TEXTURES.RED_TOKEN : TEXTURES.YELLOW_TOKEN;

  onMount(() => {
    const y = 720 - 24 - 112 / 2 - 112 * props.coords.row;

    gsap.fromTo(
      ref,
      { y: -128 },
      { y, duration: 1 - 0.1 * props.coords.row, ease: 'bounce.out' },
    );
  });

  return (
    <>
      <P.Sprite
        ref={ref}
        texture={texture}
        x={128 / 2}
        anchor={{ x: 0.5, y: 0.5 }}
      />
      <Show when={props.winningToken}>
        <P.Graphics
          lineStyle={[10, 'blue', 1]}
          // beginFill="0xFEEB77"
          drawCircle={[
            128 / 2,
            720 - 24 - 112 / 2 - 112 * props.coords.row,
            40,
          ]}
          endFill
        />
      </Show>
    </>
  );
}
