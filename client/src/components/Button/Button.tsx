import clsx from 'clsx';
import styles from './style.module.css';
import { splitProps } from 'solid-js';

type Props = {
  onClick: any;
  children: any;
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'sm' | 'md' | 'lg';
  style?: any;
  fullWidth?: boolean;
};

export function Button(props: Props) {
  const [local, rest] = splitProps(props, ['children']);

  console.log(props);

  return (
    <button
      {...rest}
      class={clsx(
        styles.base,
        styles[props.variant ?? 'filled'],
        styles[props.size ?? 'md'],
        props.fullWidth && styles.fullWidth,
      )}
    >
      {local.children}
    </button>
  );
}
