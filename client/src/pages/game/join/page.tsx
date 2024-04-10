import { router } from 'inertia-solid';
import { JSX, createSignal } from 'solid-js';
import { Button } from '@components/Button';
import { TextField } from '@components/TextField';

export function Page({ gameId }: { gameId: string | undefined }) {
  const [value, setValue] = createSignal<string | undefined>(gameId);

  const handleChange: JSX.EventHandler<HTMLInputElement, InputEvent> = ({
    currentTarget,
  }) => {
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
    <>
      <h1>Join</h1>
      <form onSubmit={submit}>
        <TextField
          label="Lobby id"
          name="lobby_id"
          value={value()}
          onInput={handleChange}
        />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
