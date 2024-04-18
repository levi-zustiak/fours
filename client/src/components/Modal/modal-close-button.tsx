import { splitProps } from 'solid-js';
import { OverrideComponentProps } from './modal-content';
import { useModalContext } from './modal-context';

interface ModalCloseButtonOptions {}

interface ModalCloseButtonProps
  extends OverrideComponentProps<'button', ModalCloseButtonOptions> {}

export function ModalCloseButton(props: ModalCloseButtonProps) {
  const ctx = useModalContext();

  const [local, others] = splitProps(props, ['aria-label', 'onClick']);

  const onClick = (e) => {
    ctx.close();
  };

  return <button onClick={onClick} {...others} />;
}
