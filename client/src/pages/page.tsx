import { Card } from '@components/Card';
import { Link } from 'inertia-solid';

export function Page(page) {
  console.log(page);
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
            style={{ display: 'grid', 'place-items': 'center' }}
          >
            <Card.Content
              hover={{
                x: -12,
                y: -12,
                duration: 0.15,
                easing: 'power1.inOut',
              }}
              press={{ x: 0, y: 0, duration: 0.5 }}
            >
              <h1>Create</h1>
            </Card.Content>
          </Card>
        </Link>
        <Link href="/game/join">
          <Card
            color="yellow"
            style={{ display: 'grid', 'place-items': 'center' }}
          >
            <Card.Content
              hover={{
                x: -12,
                y: -12,
                duration: 0.15,
                easing: 'power1.inOut',
              }}
              press={{ x: 0, y: 0, duration: 0.5 }}
            >
              <h1>Join</h1>
            </Card.Content>
          </Card>
        </Link>
      </div>
    </div>
  );
}
