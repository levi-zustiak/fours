import { JSXElement } from 'solid-js';
import styles from './style.module.css';

export function PageContainer({ children }: { children: JSXElement }) {
  return <div class={styles.container}>{children}</div>;
}
