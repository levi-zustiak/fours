import { ComponentProps, Show } from 'solid-js';
import { useModalContext } from './modal-context';
import { Portal } from 'solid-js/web';

interface ModalPortalProps extends ComponentProps<typeof Portal> {}

export function ModalPortal(props: ModalPortalProps) {
  const context = useModalContext();

  return (
    <Show when={context.contentPresence.isPresent()}>
      <Portal {...props} />
    </Show>
  );
}
