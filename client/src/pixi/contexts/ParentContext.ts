import { Container } from 'pixi.js';
import { ParentContextError } from '@pixi/errors/ParentContextError';
import { createContext, useContext } from 'solid-js';

type ParentContext = {
  parent: Container;
  add: (child: any) => Container['addChild'];
  remove: (child: any) => Container['removeChild'];
};

export const ParentContext = createContext<ParentContext | undefined>(
  undefined,
);

export function useParent() {
  const context = useContext(ParentContext);

  if (context === undefined) {
    throw new ParentContextError('Component does not have a valid parent.');
  }

  return context;
}
