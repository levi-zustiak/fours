import { PageAnimation } from '@components/PageAnimation';

export default function Profile(props) {
  return (
    <PageAnimation>
      <h1>Profile</h1>
      <pre>{JSON.stringify(props.user, null, 4)}</pre>
    </PageAnimation>
  );
}
