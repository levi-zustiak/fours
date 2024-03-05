import { router } from 'inertia-solid';
import { onMount } from 'solid-js';
import { GSAP } from '@packages/gsap';
import { useAnimation } from '@contexts/AnimationContext';
import { gsap } from 'gsap';
import { Button } from '@components/Button';
import { Board } from './game/play/components/Board';

export function Page(page) {
  const { master } = useAnimation();
  let h1, text, actions;

  onMount(() => {
    function animation() {
      const tl = gsap.timeline();

      tl.from(h1, {
        y: 48,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 0.66,
        delay: 0.5,
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
          onClick={() => router.get('/game/create')}
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
      {/* <Board ref={board} /> */}
    </div>
  );
}
