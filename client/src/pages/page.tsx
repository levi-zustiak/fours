import { Card } from '@components/Card';
import { Link } from 'inertia-solid';
import { OptionCard } from './OptionCard';

function Proto(props) {
  return;
  <div></div>;
}

export function Page(page) {
  console.log(page);
  return (
    // <div style={{ transform: 'skew(-3deg, -3deg)' }}>
    <div
      style={{
        height: '100%',
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'align-items': 'center',
      }}
    >
      <div style={{ flex: 1, display: 'grid', 'place-items': 'center' }}>
        <h1
          style={{
            'font-family': 'Rubik Mono One',
            'font-size': 'clamp(16px, 20vw, 50vw)',
            'line-height': 'clamp(16px, 20vw, 50vw)',
          }}
        >
          fours
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '250px',
        }}
      >
        <OptionCard text="Create" color="primary" />
        <OptionCard text="Join" color="secondary" />
        {/* <div
          style={{ 'background-color': 'black', height: '100%', width: '100%' }}
        ></div> */}
        {/* <div
          style={{
            'background-color': 'black',
            height: '100%',
            width: '100%',
          }}
        ></div> */}
      </div>
      {/* <Link href="/game/create">
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
        </Link> */}
    </div>
  );
}
