import { router } from 'inertia-solid';
import { onMount } from 'solid-js';
import { GSAP } from '@packages/gsap';
import { useAnimation } from '@contexts/AnimationContext';
import { gsap } from 'gsap';
import { Button } from '@components/Button';
import { Board } from '@pages/game/components/Board';

export function Page() {
  const { master } = useAnimation();
  let h1, text, actions, board;

  console.log(master);

  onMount(() => {
    function animation() {
      const tl = gsap.timeline();

      tl.from(h1, {
        y: 48,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.66,
        // delay: 0.5,
      });
      tl.from(
        text,
        { y: 32, opacity: 0, ease: 'power2.inOut', duration: 0.66 },
        '<+=0.1',
      );
      tl.from(
        actions,
        { y: 32, opacity: 0, ease: 'power2.inOut', duration: 0.66 },
        '<+=0.1',
      );
      tl.fromTo(
        board,
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

      return tl;
    }

    master.add(animation());
  });

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'grid', 'place-items': 'center' }}>
        <h1
          ref={h1}
          style={{
            'font-size': 'clamp(64px, 10vw, 160px)',
            'line-height': 'clamp(64px, 10vw, 160px)',
          }}
        >
          Fours
        </h1>
        <p ref={text} style={{ 'font-size': '48px' }}>
          Best way to play connect 4 with friends.
        </p>
      </div>
      <div
        ref={actions}
        style={{
          'margin-top': '96px',
          display: 'flex',
          height: '250px',
          gap: '32px',
        }}
      >
        <Button
          onClick={() => router.get('/game')}
          size="lg"
          style={{ width: '180px' }}
        >
          Create
        </Button>
        <Button
          onClick={() => router.get('/game/join')}
          variant="outlined"
          size="lg"
          style={{ width: '180px' }}
        >
          Join
        </Button>
      </div>
      <Board ref={board} />
    </div>
  );
}
