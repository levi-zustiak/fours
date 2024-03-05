import { createSignal, JSXElement, onMount, Show } from 'solid-js';
import styles from './style.module.css';
// import { Profile } from '@components/Profile';
import { SideNavigation } from '@components/SideNavigation';
import { timeline } from 'motion';
import { Logo } from '@components/Logo';
import { Navigation } from '@components/Navigation';
import { useAnimation } from '@contexts/AnimationContext';
import gsap from 'gsap';
import { Board } from './game/play/components/Board';

export function Layout(props: { children: JSXElement }) {
  let container, text, navigation, account, main;

  console.log('layout', props);

  return (
    <div class={styles.container}>
      {/* <div
        ref={account}
        style={{
          position: 'fixed',
          top: '64px',
          right: '0',
          transform: 'translateX(100%)',
          display: 'flex',
          gap: '2rem',
        }}
      > */}
      {/* <Profile /> */}
      {/* </div> */}
      {/* <Navigation /> */}
      <main ref={main} class={styles.main}>
        {props.children}
        {/* <Board /> */}
      </main>
      {/* <SideNavigation ref={navigation} /> */}
    </div>
  );
}
