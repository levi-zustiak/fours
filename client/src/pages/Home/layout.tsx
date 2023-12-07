export function Layout(props) {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        'flex-direction': 'column',
      }}
    >
      {props.children}
    </div>
  );
}
