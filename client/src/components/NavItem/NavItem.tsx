import { Link, usePage } from 'inertia-solid';
import styles from './style.module.css';
import { Motion, Presence } from '@motionone/solid';
import { Icon } from '@components/Icon';
import { Show } from 'solid-js';

const easing = [0.6, -0.05, 0.01, 0.99];

const textAnimations = {
  initial: {
    opacity: 0,
    x: -10,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: {
      delay: 0,
    },
  },
  transition: {
    easing,
    delay: 0.1,
  },
};

type Props = {
  href: string;
  icon: string;
  show: boolean;
  label: string;
};

export function NavItem(props: Props) {
  const url = () => usePage().url;

  return (
    <Motion.div
      animate={{
        backgroundColor:
          url() === props.href ? 'var(--secondary-light)' : 'initial',
      }}
      hover={{ backgroundColor: 'var(--secondary-light)' }}
      style={{
        'border-radius': '8px',
        padding: '8px',
      }}
    >
      <Link href={props.href} class={styles.link} preserveState>
        <div style={{ height: '32px', width: '32px', padding: '4px' }}>
          <Icon name={props.icon} color="var(--primary-main)" />
        </div>
        <Presence exitBeforeEnter>
          <Show when={props.show}>
            <Motion.h4 {...textAnimations} class={styles.label}>
              {props.label}
            </Motion.h4>
          </Show>
        </Presence>
      </Link>
    </Motion.div>
  );
}
