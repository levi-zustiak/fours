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
import gsap from 'gsap';
import { useAnimation } from '@contexts/AnimationContext';

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
  const { master, addToTimeline } = useAnimation();
  const tl = () => gsap.timeline();

  let items = [];

  let total = 0;

  onMount(() => {
    // function players() {
    //   const tl = gsap.timeline();

    //   tl.from(items, { y: 200, opacity: 0 });
    // }

    master.add(tl(), '>').addLabel('players');

    console.log(master.getChildren());

    // addToTimeline(tl, '>');
  });

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
        class={`${styles.waiting_container} skew`}
        style={{
          position: 'relative',
          height: '100%',
          width: '100%',
        }}
      >
        <h1 class={styles.heading}>Play</h1>

        <Show when={state.host}>
          <div class={styles.players}>
            <div class={styles.player1}>
              <Card
                // ref={(ref) => items.push(ref)}
                ref={(ref) => tl().from(ref, { y: 200, opacity: 0 })}
                color="red"
                static
              >
                <Card.Content>
                  <h1>{state.host.name}</h1>
                </Card.Content>
              </Card>
            </div>
            <Motion.h1
              id={styles.vs}
              ref={(ref) =>
                animateComponent(ref, {
                  y: ['200px', 0],
                  opacity: [0, 1],
                })
              }
            >
              VS
            </Motion.h1>

            <div class={styles.player2}>
              <Show
                when={state.peer}
                fallback={
                  <Waiting
                    ref={(ref) =>
                      animateComponent(ref, {
                        y: ['200px', 0],
                        opacity: [0, 1],
                      })
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
                >
                  <Card.Content>
                    <h1>{state.peer.name}</h1>
                  </Card.Content>
                </Card>
              </Show>
            </div>
          </div>

          <Presence>
            <Show when={state.stage === 'waiting'}>
              <Motion.div
                ref={addTotal}
                class={styles.actions}
                initial={{ y: 200, opacity: 0, x: -50 }}
                animate={{ x: '-50%', y: 0, opacity: 1 }}
                exit={{ y: 200, opacity: 0 }}
                transition={{
                  delay: delay(0.2),
                  duration: 1,
                  easing: [0.6, -0.05, 0.01, 0.99],
                }}
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
            </Show>
          </Presence>
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
