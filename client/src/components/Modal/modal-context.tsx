import { Presence } from '@components/primitives';
import { Accessor, createContext, useContext } from 'solid-js';

export interface ModalContextValue {
  isOpen: Accessor<boolean>;
  close: () => void;
  toggle: () => void;
  overlayPresence: Presence;
  contentPresence: Presence;
  contentId: Accessor<string | undefined>;
  registerContentId: (id: string) => () => void;
}

export const ModalContext = createContext<ModalContextValue>();

export function useModalContext() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error("DialogContext was used outside it's provider");
  }

  return context;
}
