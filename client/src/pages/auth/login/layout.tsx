export function Layout(props) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        'flex-direction': 'column',
        border: '4px solid pink',
      }}
    >
      {props.children}
    </div>
  );
}
