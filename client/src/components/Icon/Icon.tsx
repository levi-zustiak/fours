import { icons } from 'lucide-solid';
import { Dynamic } from 'solid-js/web';
import styles from './style.module.css';

export type IconProps = {
  name: keyof typeof icons;
  key?: string | number;
  color?: 'primary' | 'secondary';
  size?: string | number;
  strokeWidth?: string | number;
  class?: string;
  absoluteStokeWidth?: boolean;
};

export function Icon(props: IconProps) {
  return (
    <Dynamic
      component={icons[props.name]}
      class={styles[props.color]}
      {...props}
    />
  );
}
