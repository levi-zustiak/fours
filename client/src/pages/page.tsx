import { Card } from '@components/Card';
import { Link } from 'inertia-solid';
import { OptionCard } from './OptionCard';
import { Token } from './game/play/components/History/Entry/Entry';
import { Option } from './components/Option';

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
      <div style={{ display: 'grid', 'place-items': 'center' }}>
        <h1
          style={{
            'font-family': 'Rubik Mono One',
            'font-size': '128px',
            // 'font-size': 'clamp(16px, 20vw, 50vw)',
            'line-height': 'clamp(16px, 20vw, 50vw)',
          }}
        >
          fours
        </h1>
      </div>
      <div
        style={{
          display: 'flex',
          height: '250px',
          gap: '32px',
        }}
      >
        {/* <OptionCard text="Create" color="primary" />
        <OptionCard text="Join" color="secondary" /> */}

        <Link href="/game/create">
          <Option>Create</Option>
        </Link>
        <Link href="/game/join">
          <Option>Join</Option>
        </Link>
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
