import { Board } from '@components/game/Board';
import { GameProvider, useGame } from '@contexts/GameContext';
import { Match, Show, Switch, createEffect, onMount } from 'solid-js';
import styles from './style.module.css';
import { Card } from '@components/Card';
import { animate, stagger } from 'motion';
import { Button } from '@components/Button';
import { router } from 'inertia-solid';
import { useAnimation } from '@contexts/AnimationContext';
import { GSAP } from '@packages/gsap';
import { Presence } from '@packages/gsap/presence';
import { gsap } from 'gsap';
import CustomEase from 'gsap/CustomEase';

CustomEase.create('custom', '0.6, -0.05, 0.01, 0.99');

gsap.registerPlugin(CustomEase);

function Waiting(props) {
  onMount(() => {
    animate(
      '.waiting',
      {
        transform: ['translateY(0)', 'translateY(-16px)', 'translateY(0)'],
      },
      {
        duration: 1.5,
        delay: stagger(0.1),
        repeat: Infinity,
      },
    );
  });

  return (
    <GSAP.div
      {...props}
      style={{
        display: 'inline-block',
      }}
    >
      <h1 style={{ display: 'flex', 'user-select': 'none' }}>
        <div class="waiting">W</div>
        <div class="waiting">a</div>
        <div class="waiting">i</div>
        <div class="waiting">t</div>
        <div class="waiting">i</div>
        <div class="waiting">n</div>
        <div class="waiting">g</div>
      </h1>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          gap: '2px',
          right: 0,
          bottom: 0,
          transform: 'translate(100%, -16px)',
        }}
      >
        <svg
          class="waiting"
          width="32"
          height="32"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" fill="#F76D76" />
          <circle
            cx="8"
            cy="8"
            r="5.23077"
            stroke="#F55761"
            stroke-width="1.53846"
          />
        </svg>
        <svg
          class="waiting"
          width="32"
          height="32"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" fill="#FFDC97" />
          <circle
            cx="8"
            cy="8"
            r="5.23077"
            stroke="#FFD179"
            stroke-width="1.53846"
          />
        </svg>
        <svg
          class="waiting"
          width="32"
          height="32"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="8" fill="#F76D76" />
          <circle
            cx="8"
            cy="8"
            r="5.23077"
            stroke="#F55761"
            stroke-width="1.53846"
          />
        </svg>
      </div>
    </GSAP.div>
  );
}

function Lobby() {
  const { state } = useGame();
  const { master } = useAnimation();

  return (
    <GSAP.div
      timeline={master}
      class={`${styles.lobby} skew`}
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
      exit={{ opacity: 0, duration: 1 }}
    >
      <h1 class={styles.heading}>Play</h1>

      <Show when={state.players[0]}>
        <div class={styles.players}>
          <Card
            timeline={master}
            from={{
              y: 200,
              opacity: 0,
              duration: 1,
              delay: 0.5,
              ease: 'custom',
            }}
            color="red"
            style={{ 'grid-area': 'player1', 'justify-self': 'end' }}
          >
            <Card.Content static>
              <h1>{state.players[0].name}</h1>
            </Card.Content>
          </Card>
          <GSAP.h1
            id={styles.vs}
            timeline={master}
            from={{
              y: 200,
              opacity: 0,
              duration: 1,
              ease: 'custom',
              at: '<0.2',
            }}
          >
            VS
          </GSAP.h1>

          <div class={styles.player2}>
            <Presence>
              <Show when={!state.players[1]}>
                <Waiting
                  timeline={master}
                  from={{
                    y: 200,
                    opacity: 0,
                    duration: 1,
                    ease: 'custom',
                    at: '<0.2',
                  }}
                  exit={{ y: -100, opacity: 0, duration: 1, ease: 'custom' }}
                />
              </Show>
              <Show when={state.players[1]}>
                <Card
                  timeline={master}
                  from={{
                    y: 200,
                    opacity: 0,
                    duration: 1,
                    ease: 'custom',
                    at: '<0.2',
                  }}
                  color="yellow"
                >
                  <Card.Content static>
                    <h1>{state.players[1].name}</h1>
                  </Card.Content>
                </Card>
              </Show>
            </Presence>
          </div>
        </div>

        <Presence>
          <Show when={state.stage === 'waiting'}>
            <GSAP.div
              class={styles.actions}
              timeline={master}
              from={{
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'custom',
                at: '<0.4',
              }}
              exit={{ y: 100, opacity: 0, duration: 1, ease: 'custom' }}
            >
              <Button
                variant="outlined"
                onClick={() => router.get('/')}
                style={{ flex: 1 }}
              >
                Leave
              </Button>
              <Button onClick={() => alert(state.id)} style={{ flex: 1 }}>
                Copy Id
              </Button>
            </GSAP.div>
          </Show>
        </Presence>
      </Show>
    </GSAP.div>
  );
}

function Test() {
  const { state } = useGame();

  return (
    // <Lobby />
    <Presence>
      <Switch fallback={<p>Loading...</p>}>
        <Match when={state.stage === 'waiting'}>
          <Lobby />
        </Match>
        <Match when={state.stage === 'playing' || state.stage === 'ended'}>
          <Board />
        </Match>
      </Switch>
    </Presence>
  );
}

export function Page(props) {
  return (
    <GameProvider initialState={props.game}>
      <Test />
    </GameProvider>
  );
}
