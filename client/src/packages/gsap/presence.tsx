import {
  createSignal,
  Accessor,
  createContext,
  useContext,
  batch,
  JSXElement,
} from 'solid-js';
import { createSwitchTransition } from '@solid-primitives/transition-group';
import { resolveFirst } from '@solid-primitives/refs';

export type PresenceContextState = {
  initial: boolean;
  mount: Accessor<boolean>;
};

export const PresenceContext = createContext<PresenceContextState>();

export function Presence(props) {
  const [mount, setMount] = createSignal(true);

  const state = { initial: props.initial ?? true, mount };

  const render = (
    <PresenceContext.Provider value={state}>
      {
        createSwitchTransition(
          resolveFirst(() => props.children),
          {
            appear: state.initial,
            mode: props.exitBeforeEnter ? 'out-in' : 'parallel',
            onEnter(_, done) {
              batch(() => {
                setMount(true);
                done();
              });
            },
            onExit(el, done) {
              batch(() => {
                setMount(false);
                el.addEventListener('motioncomplete', done);
              });
            },
          },
        ) as any as JSXElement
      }
    </PresenceContext.Provider>
  );

  state.initial = true;
  return render;
}

export function usePresence() {
  const context = useContext(PresenceContext);

  return context;
}