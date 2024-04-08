import clsx from 'clsx';
import styles from './style.module.css';
import { Send } from 'lucide-solid';
import { createSignal } from 'solid-js';
import { useGame } from '@contexts/GameContext';

export function TextField() {
  const [value, setValue] = createSignal('');
  const { sendChat } = useGame();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendChat(value());

    setValue('');
  };

  const handleChange = (e) => {
    e.preventDefault();

    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value()}
        class={clsx(styles.input)}
        placeholder="Send a message"
        onChange={handleChange}
      />
      <button type="submit">
        <Send size={20} />
      </button>
    </form>
  );
}
