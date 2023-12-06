import { Motion } from '@motionone/solid';

export default function Home() {
  return (
    <>
      <Motion.div
        style={{
          display: 'flex',
          flex: 1,
          height: '50vh',
          width: '100%',
          'background-color': 'var(--yellow-main)',
        }}
        animate={{
          transform: ['translateY(-100%)', 0],
        }}
        transition={{ duration: 1, easing: [0.25, 1, 0.5, 1] }}
        hover={{ flexGrow: 1.5 }}
      />
      <Motion.div
        class="home-divider"
        style={{
          display: 'flex',
          flex: 1,
          height: '50vh',
          width: '100%',
          'background-color': 'var(--red-main)',
        }}
        animate={{
          transform: ['translateY(100%)', 0],
        }}
        transition={{ duration: 1, easing: [0.25, 1, 0.5, 1] }}
        hover={{ flexGrow: 1.5 }}
      />
    </>
  );
}
