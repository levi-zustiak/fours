import { Button } from '@components/Button';
import { PageContainer } from '@components/PageContainer';
import { useAnimation } from '@contexts/AnimationContext';
import { Board } from '@pages/game/components/Board';
import gsap from 'gsap';
import { router, usePage } from 'inertia-solid';
import { JSXElement, createEffect, onMount, useContext } from 'solid-js';

// const boardContext = useContext()

export function Layout({ children }: { children: JSXElement }) {
  const { master } = useAnimation();
  const page = usePage();
  let board: HTMLDivElement | undefined;

  console.log({ page });

  createEffect(() => {
    function homeAnmiation() {
      const tl = gsap.timeline();

      if (board == null) return;

      tl.to(board, {
        y: '100%',
        scale: 1,
        bottom: 0,
        duration: 0.5,
      });

      return tl;
    }

    function gameAnimation() {
      const tl = gsap.timeline();

      if (board == null) return;

      tl.to(board, {
        y: '50%',
        scale: 0.8,
        bottom: 0,
        duration: 0.5,
      });
    }

    if (page.component.includes('home')) {
      master.add(homeAnmiation());
    } else {
      master.add(gameAnimation());
    }
  });

  // onMount(() => {
  //   function animation() {
  //     const tl = gsap.timeline();
  //
  //     if (board != null) {
  //       // tl.to(board, { y: '50%', duration: 0.5, ease: 'power1' });
  //
  //       tl.fromTo(
  //         board,
  //         {
  //           y: '100%',
  //           opacity: 0,
  //           position: 'absolute',
  //           bottom: 0,
  //           // transform: 'translateY(100%)',
  //         },
  //         {
  //           // scale: 0.9,
  //           scale: 1,
  //           ease: 'back.out(1)',
  //           y: '50%',
  //           // transform: 'translateY(50%)',
  //           opacity: 1,
  //           duration: 0.66,
  //         },
  //         '<+=0.33',
  //       );
  //     }
  //
  //     return tl;
  //   }
  //
  //   master.add(animation());
  // });

  return (
    <PageContainer>
      <div style={{ display: 'flex', 'flex-direction': 'row', gap: '1rem' }}>
        <Button onClick={() => router.get('/')}>Home</Button>
        <Button onClick={() => router.get('/game')}>Game</Button>
      </div>
      {children}
      <Board ref={board} />
    </PageContainer>
  );
}
