import { Accessor, createSignal } from 'solid-js';

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R,
) => any
  ? R
  : never;

type Machine<S> = { [k: string]: { [k: string]: S } };
type MachineState<T> = keyof T;
type MachineEvent<T> = keyof UnionToIntersection<T[keyof T]>;

function createStateMachine<M>(
  initialState: MachineState<M>,
  machine: M & Machine<MachineState<M>>,
): [Accessor<MachineState<M>>, (event: MachineEvent<M>) => void] {
  const reduce = (state: MachineState<M>, event: MachineEvent<M>) => {
    const nextState = (machine[state] as any)[event];
    return nextState ?? state;
  };

  const [state, setState] = createSignal(initialState);

  const send = (event: MachineEvent<M>) =>
    setState((prev) => reduce(prev, event));

  return [state, send];
}

export interface Presence {
  isPresent: Accessor<boolean>;
  setRef: (el: HTMLElement) => void;
}

export function createPresence(present: Accessor<boolean>): Presence {
  const [node, setNode] = createSignal<HTMLElement>();

  const [state, send] = createStateMachine(
    present() ? 'mounted' : 'unmounted',
    {
      mounted: {
        UNMOUNT: 'unmounted',
        ANIMATION_OUT: 'unmountSuspended',
      },
      unmountSuspended: {
        MOUNT: 'mounted',
        ANIMATION_END: 'unmounted',
      },
      unmounted: {
        MOUNT: 'mounted',
      },
    },
  );

  return {
    isPresent: () => ['mounted', 'unmountSuspended'].includes(state()),
    setRef: (el: HTMLElement) => {
      setNode(el);
    },
  };
}
