import { usePage } from 'inertia-solid';
import styles from './style.module.css';
import clsx from 'clsx';
import { GSAP } from '@packages/gsap';

export function Message(props) {
  const page = usePage();

  console.log(props, page);

  const sender = props.from.id === page.props.user.id;

  return (
    <GSAP.div
      from={{
        y: 32,
      }}
      class={clsx(styles.container, {
        [styles.sent]: sender,
        [styles.received]: !sender,
      })}
    >
      <p>{props.text}</p>
    </GSAP.div>
  );
}
