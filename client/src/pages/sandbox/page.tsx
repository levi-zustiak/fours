import { Button } from '@components/Button';
import { Modal } from '@components/Modal';
import { TextField } from '@components/TextField';
import { X } from 'lucide-solid';

const noop = () => undefined;

export function Page() {
  const btnTxt = 'Click Me';

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'grid',
        'place-items': 'center',
        border: '3px solid orange',
      }}
    >
      {/* Buttons */}
      <div
        style={{
          display: 'grid',
          'grid-template-columns': '1fr 1fr 1fr',
          'grid-template-rows': '1fr 1fr 1fr',
          'justify-items': 'center',
          'align-items': 'center',
          gap: '1rem',
        }}
      >
        <Button onClick={noop} variant="filled" size="sm">
          {btnTxt}
        </Button>
        <Button onClick={noop} variant="outlined" size="sm">
          {btnTxt}
        </Button>
        <Button onClick={noop} variant="text" size="sm">
          {btnTxt}
        </Button>

        <Button onClick={noop} variant="filled" size="md">
          {btnTxt}
        </Button>
        <Button onClick={noop} variant="outlined" size="md">
          {btnTxt}
        </Button>
        <Button onClick={noop} variant="text" size="md">
          {btnTxt}
        </Button>

        <Button onClick={noop} variant="filled" size="lg">
          {btnTxt}
        </Button>
        <Button onClick={noop} variant="outlined" size="lg">
          {btnTxt}
        </Button>
        <Button onClick={noop} variant="text" size="lg">
          {btnTxt}
        </Button>
      </div>

      {/* Inputs */}
      <div style={{ display: 'flex', 'flex-direction': 'column', gap: '1rem' }}>
        <TextField name="text-field" label="empty" value="" onInput={noop} />
        <TextField
          name="text-field"
          label="placeholder"
          value=""
          placeholder="Placeholder"
          onInput={noop}
        />
        <TextField
          name="text-field"
          label="filled"
          value="text value"
          onInput={noop}
        />
        <TextField
          name="text-field"
          label="error"
          value="text value"
          onInput={noop}
          error="This field has an error"
        />
        <TextField
          name="text-field"
          label="success"
          value="text value"
          onInput={noop}
          success
        />
        <TextField
          name="text-field"
          label="password"
          value="secret-password-123"
          onInput={noop}
          type="password"
        />
      </div>
      <Modal.Root open>
        <Modal.Portal>
          <Modal.Content>
            <Modal.CloseButton>
              <X />
            </Modal.CloseButton>
            <h2>Modal component</h2>
            <div>
              <Button onClick={() => undefined} fullWidth>
                Button
              </Button>
              <Button onClick={() => undefined} fullWidth variant="outlined">
                Button
              </Button>
            </div>
          </Modal.Content>
        </Modal.Portal>
      </Modal.Root>
    </div>
  );
}
