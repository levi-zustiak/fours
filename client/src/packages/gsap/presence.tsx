import {
  createSignal,
  Accessor,
  createContext,
  useContext,
  batch,
  FlowComponent,
} from 'solid-js';
import { createSwitchTransition } from '@solid-primitives/transition-group';
import { resolveFirst } from '@solid-primitives/refs';

export type PresenceContextState = {
  initial: boolean;
  mount: Accessor<boolean>;
};

export const PresenceContext = createContext<PresenceContextState>();

type PresenceProps = any;

export function Presence(props: PresenceProps) {
  const [mount, setMount] = createSignal(true);

  const state = { initial: props.initial ?? true, mount };

  const resolver = resolveFirst(() => props.children);

  const render = (
    <PresenceContext.Provider value={state}>
      {createSwitchTransition(resolver, {
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
      })}
    </PresenceContext.Provider>
  );

  state.initial = true;
  return render;
}

export function usePresence() {
  const context = useContext(PresenceContext);

  return context;
}
