import { ParentProps, Setter, createContext, createSignal } from 'solid-js';
import { ModalContext, ModalContextValue } from './modal-context';
import { createPresence } from '@components/primitives';

function createRegisterId(setter: Setter<string | undefined>) {
  return (id: string) => {
    setter(id);
    return () => setter(undefined);
  };
}

interface RootModalOptions {
  open: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

interface RootModalProps extends ParentProps<RootModalOptions> {}

//TODO: Add animation and presence functionality
export function ModalRoot(props: RootModalProps) {
  const [isOpen, setIsOpen] = createSignal(props.open);

  const [contentId, setContentId] = createSignal<string>();

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => setIsOpen(!prev));

  const overlayPresence = createPresence(isOpen);
  const contentPresence = createPresence(isOpen);

  const context: ModalContextValue = {
    isOpen,
    close,
    toggle,
    contentId,
    overlayPresence,
    contentPresence,
    registerContentId: createRegisterId(setContentId),
  };

  return (
    <ModalContext.Provider value={context}>
      {props.children}
    </ModalContext.Provider>
  );
}
