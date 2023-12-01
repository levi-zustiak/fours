import { Motion } from '@motionone/solid';
import { ChevronsRight } from 'lucide-solid';
import { createSignal } from 'solid-js';
import styles from './style.module.css';
import { NavItem } from '@components/NavItem';
// import { Logo } from '@components/Logo';

const initialIcon = {
  rotate: 0,
};

const animateIcon = {
  rotate: -180,
};

const easing = [0.6, -0.05, 0.01, 0.99];

const initial = {
  width: '120px',
};

const animate = {
  width: '224px',
};

export function SideNavigation(props) {
  const [open, setOpen] = createSignal<boolean>(false);

  return (
    <Motion.div
      ref={props.ref}
      animate={open() ? animate : initial}
      transition={{ duration: 0.5, easing }}
      class={styles.container}
    >
      <div class={styles.toggleButton} onClick={() => setOpen((prev) => !prev)}>
        <Motion.div
          class={styles.toggleIcon}
          initial={{ rotate: open() ? -180 : 0 }}
          animate={open() ? animateIcon : initialIcon}
          transition={{ duration: 0.5, easing }}
        >
          <ChevronsRight size={18} strokeWidth={3} />
        </Motion.div>
      </div>
      {/* <Logo show={open()} /> */}
      <div class={styles.linkContainer}>
        <NavItem href="/" icon="Home" show={open()} label="Home" />
        {/* <NavItem href="/play" icon="Joystick" show={open()} label="Play" /> */}
        <NavItem href="/login" icon="User" show={open()} label="Login" />
        <NavItem href="/logout" icon="User" show={open()} label="Logout" />
      </div>
    </Motion.div>
  );
}
