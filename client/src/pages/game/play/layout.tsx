export function Layout(props) {
  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        height: '100%',
        // transform: 'skew(-2deg, -2deg)',
      }}
    >
      {props.children}
    </div>
  );
}
