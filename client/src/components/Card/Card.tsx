import { Motion } from '@motionone/solid';
import styles from './style.module.css';

type CardProps = {
  children: any;
  color?: 'red' | 'yellow';
  static?: boolean;
  style?: any;
};

function Card(props: CardProps) {
  const color = props.color || 'default';

  return (
    <Motion.div
      {...props}
      classList={{
        [styles.container]: true,
        [styles[color]]: true,
        [styles.static]: props.static,
      }}
    >
      {props.children}
    </Motion.div>
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
};

function Content(props: ContentProps) {
  return <div class={styles.content}>{props.children}</div>;
}

Card.Heading = Heading;
Card.Content = Content;

export { Card };
