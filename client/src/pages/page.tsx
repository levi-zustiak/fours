import { Card } from '@components/Card';
import { Link } from 'inertia-solid';
import { OptionCard } from './OptionCard';
import { Token } from './game/play/components/History/Entry/Entry';
import { Option } from './components/Option';
import { For, Show, createSignal, onMount } from 'solid-js';
import { GSAP } from '@packages/gsap';
import { useAnimation } from '@contexts/AnimationContext';
import { Presence, PresenceList } from '@packages/gsap/presence';
import { gsap } from 'gsap';

function Text() {
  const { master } = useAnimation();

  onMount(() => {
    master.from('.class', { y: -200, ease: 'bounce', stagger: 0.1 });
  });

  const [text, setText] = createSignal(true);

  const u = () => {
    setText((prev) => !prev);
  };

  return (
    <>
      <button onClick={u}>button</button>
      <h1
        style={{
          display: 'flex',
          padding: '1rem',
          'clip-path': 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
          // border: '1px solid red',
        }}
      >
        <PresenceList>
          <Show when={text()}>
            <GSAP.div class="class" exit={{ y: 200, ease: 'bounce' }}>
              F
            </GSAP.div>
            <div class="class">o</div>
            <div class="class">u</div>
            <div class="class">r</div>
            <div class="class">s</div>
          </Show>
        </PresenceList>
      </h1>
    </>
  );
}

export function Page(page) {
  console.log(page);
  const { master } = useAnimation();

  onMount(() => {
    function option() {
      const tl = gsap.timeline();

      tl.from('.option', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 0.75,
        ease: 'inOut',
      });

      return tl;
    }

    master.add(option());
  });

  return (
    // <div style={{ transform: 'skew(-3deg, -3deg)' }}>
    <div
      style={{
        height: '100%',
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center',
      }}
    >
      <div style={{ display: 'grid', 'place-items': 'center' }}>
        <h1
          style={{
            'font-family': 'Rubik Mono One',
            'font-size': '128px',
            // 'font-size': 'clamp(16px, 20vw, 50vw)',
            'line-height': 'clamp(16px, 20vw, 50vw)',
          }}
        >
          <Text />
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          height: '250px',
          gap: '32px',
        }}
      >
        <Link href="/game/create">
          <Option>Create</Option>
        </Link>
        <Link href="/game/join">
          <Option>Join</Option>
        </Link>
      </div>
    </div>
  );
}
