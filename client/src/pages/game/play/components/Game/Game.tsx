import { Board } from '../Board';
import { Chat } from '../Chat';
import { History } from '../History';
import { Info } from '../Info';
import styles from './style.module.css';

export function Game() {
  return (
    <div class={styles.container}>
      <History />
      <Board />
      <Chat />
      <Info />
    </div>
  );
}
