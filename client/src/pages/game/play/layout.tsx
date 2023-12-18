export function Layout(props) {
  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        // 'align-items': 'center',
        'justify-content': 'center',
        height: '100%',
        transform: 'skew(-3deg, -3deg)',
      }}
    >
      {props.children}
    </div>
  );
}
