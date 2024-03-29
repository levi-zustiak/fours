import {
  createSignal,
  Accessor,
  createContext,
  useContext,
  batch,
  JSXElement,
} from 'solid-js';
import {
  createSwitchTransition,
  createListTransition,
} from '@solid-primitives/transition-group';
import { resolveFirst, resolveElements } from '@solid-primitives/refs';

export type PresenceContextState = {
  initial: boolean;
  mount: Accessor<boolean>;
};

export const PresenceContext = createContext<PresenceContextState>();

export function Presence(props) {
  const [mount, setMount] = createSignal(true);

  const state = { initial: props.initial ?? true, mount };

  const c = resolveFirst(() => props.children);

  console.log(c);

  const render = (
    <PresenceContext.Provider value={state}>{}</PresenceContext.Provider>
  );

  state.initial = true;
  return render;
}

export function PresenceList(props) {
  const [mount, setMount] = createSignal(true);

  const state = { initial: props.initial ?? true, mount };

  return (
    <PresenceContext.Provider value={state}>
      {
        createListTransition(resolveElements(() => props.children).toArray, {
          appear: state.initial,
          onChange({ list, added, removed, unchanged, finishRemoved }) {
            console.log(list, added, removed);
            batch(() => {
              removed.forEach((el) => {
                setMount(false);
                el.addEventListener('motioncomplete', () => {
                  console.log('finsihed');
                  finishRemoved([el]);
                });
                console.log(el);
              });
            });
          },
        }) as any as JSXElement
      }
    </PresenceContext.Provider>
  );
}

export function usePresence() {
  const context = useContext(PresenceContext);

  return context;
}
