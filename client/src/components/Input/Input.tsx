import styles from './style.module.css';

type Props = any;

export function Input(props: Props) {
  return <input {...props} class={styles.input} />;
}
