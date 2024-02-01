import styles from './style.module.css';

export function Container(props) {
  return (
    <div class={styles.container} style={props.style}>
      <div class={styles.header}>
        <h3>{props.title}</h3>
      </div>
      {props.children}
    </div>
  );
}
