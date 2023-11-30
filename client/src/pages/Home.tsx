import { Card } from '@components/Card';
import { router } from 'inertia-solid';
import { AnimatedContainer } from '@components/AnimatedContainer';
import { Motion } from '@motionone/solid';
import { Icon } from '@components/Icon';
import { io } from 'socket.io-client';

export default function Home() {
  return (
    <AnimatedContainer>
      <Motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          easing: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        Home
      </Motion.h1>
      <Motion.div
        style={{ display: 'flex', gap: '1rem' }}
        initial={{ opacity: 0, y: '20px' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.6,
          easing: [0.6, -0.05, 0.01, 0.99],
        }}
      >
        {/* <Card
          title="Play"
          message="Play a game with a friend"
          onClick={() => router.get('/play')}
          slots={{ icon: <Joystick /> }}
        />
        <Card
          title="Join"
          message="Join an existing game"
          onClick={() => router.get('/join')}
          slots={{ icon: <UserPlus /> }}
        /> */}
        <Card
          title="Create"
          message="Play a game with a friend"
          onClick={() => router.get('/game/create')}
          slots={{ icon: <Icon name="PlusSquare" /> }}
        />
        <Card
          title="Join"
          message="Join a existing game"
          onClick={() => router.get('/game/join')}
          slots={{ icon: <Icon name="UserPlus" /> }}
        />
      </Motion.div>
    </AnimatedContainer>
  );
}
