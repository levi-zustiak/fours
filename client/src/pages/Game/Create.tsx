// import { Lobby } from '@/types/lobby.types';
import { Link } from 'inertia-solid';
import { onCleanup, onMount } from 'solid-js';
// import { useLobby } from '@contexts/LobbyContext';
import { AnimatedContainer } from '@components/AnimatedContainer';
import { animate, stagger } from 'motion';
import { Button } from '@components/Button';
import { useGame } from '@/contexts/GameContext';

type Props = {
  lobby: any;
};

export default function Create({ game }: Props) {
  const { wait, unwait } = useGame();

  const copyLink = () =>
    navigator.clipboard.writeText(
      // `${import.meta.env.VITE_APP_URL || ""}/lobby/join/${lobby.id}`,
      game.id,
    );

  onMount(() => {
    wait();

    animate(
      '.token',
      {
        transform: ['translateY(0)', 'translateY(-16px)', 'translateY(0)'],
      },
      {
        duration: 1,
        delay: stagger(0.1),
        repeat: Infinity,
      },
    );
  });

  onCleanup(() => unwait());

  return (
    <AnimatedContainer>
      <div
        style={{
          border: '3px solid var(--secondary-main)',
          padding: '2rem',
          'border-radius': '12px',
          'box-shadow': '-6px 6px 0 var(--secondary-main)',
          width: '350px',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
          }}
        >
          <h2>Waiting</h2>
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              gap: '2px',
              right: 0,
              bottom: 0,
              transform: 'translate(100%, -100%)',
            }}
          >
            <svg
              class="token"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="8" fill="#F76D76" />
              <circle
                cx="8"
                cy="8"
                r="5.23077"
                stroke="#F55761"
                stroke-width="1.53846"
              />
            </svg>
            <svg
              class="token"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="8" fill="#FFDC97" />
              <circle
                cx="8"
                cy="8"
                r="5.23077"
                stroke="#FFD179"
                stroke-width="1.53846"
              />
            </svg>
            <svg
              class="token"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="8" fill="#F76D76" />
              <circle
                cx="8"
                cy="8"
                r="5.23077"
                stroke="#F55761"
                stroke-width="1.53846"
              />
            </svg>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', 'margin-top': '2rem' }}>
          <Link
            href={`/lobby/delete/${game.id}`}
            method="delete"
            style={{ width: '100%' }}
          >
            <Button variant="outlined" style={{ width: '100%' }}>
              Cancel
            </Button>
          </Link>
          <Button onClick={copyLink} style={{ width: '100%' }}>
            Copy invite
          </Button>
        </div>
      </div>
    </AnimatedContainer>
  );
}
