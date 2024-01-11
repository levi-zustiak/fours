import { Motion } from '@motionone/solid';
import styles from './style.module.css';
import { GSAP } from '@packages/gsap';

type CardProps = {
  children: any;
  color?: 'red' | 'yellow';
  style?: any;
};

function Card(props: CardProps) {
  const color = props.color || 'default';

  return (
    <GSAP.div {...props} class={styles.container}>
      <div classList={{ [styles.background]: true, [styles[color]]: true }} />
      {props.children}
    </GSAP.div>
  );
}

type HeadingProps = {
  color?: 'red' | 'yellow';
  children: any;
};

function Heading(props: HeadingProps) {
  const color = props.color || 'default';
  return (
    <div
      class={styles.heading}
      classList={{
        [styles.heading]: true,
        [styles[color]]: true,
      }}
    >
      {props.children}
    </div>
  );
}

type ContentProps = {
  children: any;
  static?: boolean;
};

function Content(props: ContentProps) {
  const stat = props.static || false;

  return (
    <GSAP.div
      {...props}
      classList={{ [styles.content]: true, [styles.static]: stat }}
    >
      {props.children}
    </GSAP.div>
  );
}

Card.Heading = Heading;
Card.Content = Content;

export { Card };
