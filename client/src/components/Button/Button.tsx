import styles from './style.module.css';
import { splitProps } from 'solid-js';

type Props = {
  onClick: any;
  children: any;
  variant?: 'filled' | 'outlined' | 'text';
  style?: any;
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
