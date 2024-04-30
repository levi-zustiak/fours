export function Layout(props) {
  return (
    <div
      style={{
        display: 'flex',
        'flex-direction': 'column',
        'justify-content': 'center',
        'min-height': '100vh',
      }}
    >
      {props.children}
    </div>
  );
}
