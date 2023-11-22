import styles from './style.module.css';
import { splitProps } from 'solid-js';

type Props = {
  type: any;
  children: any;
  variant: 'filled' | 'outlined' | 'text';
};

export function Button(props: Props) {
  const [local, rest] = splitProps(props, ['children']);

  const { variant = 'filled' } = props;

  return (
    <button {...rest} class={`${styles.button} ${styles[variant]}`}>
      {local.children}
    </button>
  );
}
