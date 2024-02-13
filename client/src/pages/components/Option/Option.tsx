import { GSAP } from '@packages/gsap';
import { Presence } from '@packages/gsap/presence';
import { Show, createSignal } from 'solid-js';

export function Option(props) {
  const [hovered, setHovered] = createSignal(false);

  return (
    <div
      class="option"
      style={{
        position: 'relative',
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center',
        gap: '1rem',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          border: '5px solid black',
          height: '128px',
          width: '128px',
          'border-radius': '50%',
          // 'clip-path': 'url(#test)',
        }}
      >
        <div style={{ 'clip-path': 'url(#test)' }}>
          <Presence exitBeforeEnter>
            <Show when={hovered()}>
              <GSAP.svg
                // class={styles.svg}
                from={{ y: -256, ease: 'bounce', duration: 0.75 }}
                to={{ y: 0 }}
                exit={{ y: 256, ease: 'bounce' }}
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="32" cy="32" r="32" fill="var(--primary-main)" />
                <circle
                  cx="32"
                  cy="32"
                  r="20"
                  stroke="var(--primary-accent)"
                  stroke-width="6.10577"
                />
              </GSAP.svg>
            </Show>
          </Presence>
        </div>
      </div>
      <h2>{props.children}</h2>
      <svg width="0" height="0">
        <defs>
          <clipPath id="test">
            <circle cx="59" cy="59" r="59" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
