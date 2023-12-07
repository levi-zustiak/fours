import { router } from 'inertia-solid';
import { createSignal } from 'solid-js';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { AnimatedContainer } from '@components/AnimatedContainer';

export function Page({ gameId }: { gameId: string | undefined }) {
  const [value, setValue] = createSignal<string | undefined>(gameId);

  const handleChange = ({ currentTarget }) => {
    const { value } = currentTarget;

    setValue(value);
  };

  const submit = (e) => {
    e.preventDefault();

    if (!!value()) {
      router.post(`/game/join/${value()}`);
    }
  };

  return (
    <AnimatedContainer>
      <h1>Join</h1>
      <form onSubmit={submit}>
        <Input name="lobby_id" value={value()} onChange={handleChange} />
        <Button type="submit">Submit</Button>
      </form>
    </AnimatedContainer>
  );
}
