import { Card } from '@components/Card';
import { Link } from 'inertia-solid';

export function Page() {
  return (
    <div style={{ transform: 'skew(-3deg, -3deg)' }}>
      <h1>Home</h1>
      <div
        style={{
          display: 'flex',
          gap: '2rem',
        }}
      >
        <Link href="/game/create">
          <Card
            color="red"
            hover={{ x: '-12px', y: '-12px' }}
            press={{ x: 0, y: 0 }}
            transition={{ duration: 0.15, easing: 'ease-in-out' }}
            style={{ display: 'grid', 'place-items': 'center' }}
          >
            <Card.Content>
              <h1>Create</h1>
            </Card.Content>
          </Card>
        </Link>
        <Link href="/game/join">
          <Card
            color="yellow"
            hover={{ x: '-12px', y: '-12px' }}
            press={{ x: 0, y: 0 }}
            transition={{ duration: 0.15, easing: 'ease-in-out' }}
            style={{ display: 'grid', 'place-items': 'center' }}
          >
            <Card.Content>
              <h1>Join</h1>
            </Card.Content>
          </Card>
        </Link>
      </div>
    </div>
  );
}
