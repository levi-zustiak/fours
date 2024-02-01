import styles from './style.module.css';
import { For } from 'solid-js';
import { useGame } from '@contexts/GameContext';
import { Message } from './Message';
import { TextField } from './TextField';

export function Chat() {
  const { chats } = useGame();

  return (
    <div class={styles.chat_container}>
      <div class={styles.header}>
        <h3>Chat</h3>
      </div>
      <div class={styles.messages}>
        <For each={chats()}>{(chat) => <Message {...chat} />}</For>
      </div>
      <TextField />
    </div>
  );
}
