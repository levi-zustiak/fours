import { Board } from '@components/game/Board';
import { GameProvider, useGame } from '@contexts/GameContext';
import { Match, Show, Switch, createEffect, on, onMount } from 'solid-js';
import { Motion, Presence } from '@motionone/solid';
import styles from './style.module.css';
import { Card } from '@components/Card';
import { animate, timeline } from 'motion';

function Waiting() {
  const { state } = useGame();

  let total = 0;
  let host, vs, peer;

  onMount(() => {
    // animate(
    //   component,
    //   { y: ['200px', 0], opacity: [0, 1] },
    //   { delay: 0.1 * total, duration: 1, easing: [0.6, -0.05, 0.01, 0.99] },
    // );
  });

  const animateComponent = async (component) => {
    animate(
      component,
      { y: ['200px', 0], opacity: [0, 1] },
      { delay: 0.1 * total, duration: 1, easing: [0.6, -0.05, 0.01, 0.99] },
    ).finished.then(() => {
      console.log('finished');
      total--;
    });

    total++;
  };

  const stagger = (delay = 0.1) => {
    console.log(total, delay * total);
    return delay * total;
  };

  const complete = () => {
    total -= 1;
  };

  return (
    <>
      {/* <h1 class={styles.heading}>Play</h1> */}
      <div class={styles.player_container}>
        <Show when={state.host}>
          <Card
            ref={animateComponent}
            color="red"
            static
            // onMotionComplete={complete}
            // initial={{
            //   y: '200px',
            //   opacity: 0,
            // }}
            // animate={{ y: 0, opacity: 1 }}
            // transition={{
            //   delay: stagger(),
            //   duration: 1,
            //   easing: [0.6, -0.05, 0.01, 0.99],
            // }}
          >
            <Card.Content>
              <h1>{state.host.name}</h1>
            </Card.Content>
          </Card>
          <Motion.h1
            id={styles.vs}
            // initial={{
            //   y: '200px',
            //   opacity: 0,
            // }}
            // animate={{ y: 0, opacity: 1 }}
            // transition={{
            //   delay: stagger(),
            //   duration: 1,
            //   easing: [0.6, -0.05, 0.01, 0.99],
            // }}
            ref={animateComponent}
          >
            VS
          </Motion.h1>
        </Show>

        <Show when={state.peer} fallback={<p>waiting</p>}>
          <Card
            ref={animateComponent}
            color="yellow"
            static
            // initial={{
            //   y: '200px',
            //   opacity: 0,
            // }}
            // animate={{ y: 0, opacity: 1 }}
            // transition={{
            //   delay: stagger(),
            //   duration: 1,
            //   easing: [0.6, -0.05, 0.01, 0.99],
            // }}
          >
            <Card.Content>
              <h1>{state.peer.name}</h1>
            </Card.Content>
          </Card>
        </Show>
      </div>
    </>
  );
}

function Test() {
  const { state } = useGame();

  return (
    <Waiting />
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
