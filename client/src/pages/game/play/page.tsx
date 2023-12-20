import { Board } from '@components/game/Board';
import { GameProvider, useGame } from '@contexts/GameContext';
import { Match, Show, Switch, onMount } from 'solid-js';
import { Motion, Presence } from '@motionone/solid';
import styles from './style.module.css';
import { Card } from '@components/Card';
import { animate, stagger } from 'motion';
import { Button } from '@components/Button';
import { router } from 'inertia-solid';
import { Properties } from 'solid-js/web';

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
    <Motion.div
      ref={props.ref}
      style={{
        position: 'absolute',
        left: 'calc(50% + 128px)',
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
    </Motion.div>
  );
}

function Lobby() {
  const { state } = useGame();

  let total = 0;

  const animateComponent = async (component, animation = {}) => {
    animate(component, animation, {
      delay: delay(0.2),
      duration: 1,
      easing: [0.6, -0.05, 0.01, 0.99],
    }).finished.then(() => {
      total--;
    });

    total++;
  };

  const delay = (delay = 0.1) => {
    return delay * total;
  };

  return (
    <>
      <div
        class={styles.player_container}
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        <h1 class={styles.heading}>Play</h1>
        <Show when={state.host}>
          <Card
            ref={(ref) =>
              animateComponent(ref, { y: ['200px', 0], opacity: [0, 1] })
            }
            color="red"
            static
            style={{
              position: 'absolute',
              right: 'calc(50% + 144px)',
            }}
          >
            <Card.Content>
              <h1>{state.host.name}</h1>
            </Card.Content>
          </Card>
          <Motion.h1
            id={styles.vs}
            ref={(ref) =>
              animateComponent(ref, {
                y: ['200px', 0],
                x: ['-50px', '-50%'],
                opacity: [0, 1],
              })
            }
          >
            VS
          </Motion.h1>

          <Show
            when={state.peer}
            fallback={
              <Waiting
                ref={(ref) =>
                  animateComponent(ref, { y: ['200px', 0], opacity: [0, 1] })
                }
              />
            }
          >
            <Card
              ref={(ref) =>
                animateComponent(ref, { y: ['200px', 0], opacity: [0, 1] })
              }
              color="yellow"
              static
              style={{
                position: 'absolute',
                left: 'calc(50% + 128px)',
              }}
            >
              <Card.Content>
                <h1>{state.peer.name}</h1>
              </Card.Content>
            </Card>
          </Show>
          <Show when={state.stage === 'waiting'}>
            <Presence exitBeforeEnter>
              <Motion.div
                class={styles.actions}
                ref={(actions) =>
                  animateComponent(actions, {
                    y: ['200px', 0],
                    x: ['-50px', '-50%'],
                    opacity: [0, 1],
                  })
                }
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
              </Motion.div>
            </Presence>
          </Show>
        </Show>
      </div>
    </>
  );
}

function Test() {
  const { state } = useGame();

  return (
    <Lobby />
    // <Switch fallback={<p>Loading...</p>}>
    //   <Match when={state.stage === 'waiting'}>
    //     <Waiting />
    //   </Match>
    //   <Match when={state.stage === 'playing' || state.stage === 'ended'}>
    //     <Board />
    //   </Match>
    // </Switch>
  );
}

export function Page(props) {
  return (
    <GameProvider initialState={props.game}>
      <Test />
    </GameProvider>
  );
}
