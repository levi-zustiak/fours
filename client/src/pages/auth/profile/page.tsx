export function Page(props) {
  return (
    <>
      <h1>Profile</h1>
      <pre>{JSON.stringify(props.user, null, 4)}</pre>
    </>
  );
}
