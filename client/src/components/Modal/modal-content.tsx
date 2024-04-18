import { ComponentProps, Show, ValidComponent } from 'solid-js';
import { useModalContext } from './modal-context';

type OverrideProps<Source = {}, Override = {}> = Omit<Source, keyof Override> &
  Override;
export type OverrideComponentProps<T extends ValidComponent, P> = OverrideProps<
  ComponentProps<T>,
  P
>;

interface ModalContentOptions {}

interface ModalContentProps
  extends OverrideComponentProps<'div', ModalContentOptions> {}

export function ModalContent(props: ModalContentProps) {
  let ref: HTMLElement | undefined;

  const context = useModalContext();

  return (
    <Show when={context.contentPresence.isPresent}>
      <div>{props.children}</div>
    </Show>
  );
}
