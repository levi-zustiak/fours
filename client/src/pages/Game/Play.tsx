import { Board } from '@components/game/Board';
import { useGame } from '@contexts/GameContext';
import { onMount } from 'solid-js';

export default function Play({ game }) {
  const { state, init } = useGame();

  onMount(() => init(game));

  return <Board />;
}
