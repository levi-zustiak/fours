import styles from './style.module.css';

type Props = {
  label: string;
  name: string;
  value: any;
  onChange: any;
};

export function TextField(props: Props) {
  return (
    <div class={styles.container}>
      <label class={styles.label}>{props.label}</label>
      <input {...props} class={styles.input} />
    </div>
  );
}
