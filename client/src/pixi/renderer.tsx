import { createRenderEffect, onCleanup, splitProps } from 'solid-js';
import { EVENTS } from './constants/events';
import { ParentContext, useParent } from './contexts/ParentContext';
import * as PIXI from 'pixi.js';

export const makePixiComponent = (component: any) => (props: any) => {
  const [localProps, eventProps, spriteProps] = splitProps(
    props,
    ['children', 'ref'],
    EVENTS,
  );

  const { parent, add, remove } = useParent();

  createRenderEffect(() => {
    if (localProps.ref instanceof Function) {
      localProps.ref(component);
    }

    Object.entries(spriteProps).forEach(([prop, value]) => {
      console.log(prop, typeof component[prop]);
      if (typeof component[prop] === 'function') {
        if (Array.isArray(value)) {
          component[prop](...value);
        } else {
          component[prop](value);
        }
      } else {
        component[prop] = value;
      }
    });

    Object.entries(eventProps).forEach(([prop, value]) => {
      component.on(prop, value);
    });

    add(component);

    onCleanup(() => {
      remove(component);
    });
  });

  return (
    <ParentContext.Provider
      value={{
        parent: component,
        add: (child) => component.addChild(child),
        remove: (child) => component.removeChild(child),
      }}
    >
      {localProps.children}
    </ParentContext.Provider>
  );
};

export const P: any = new Proxy(
  {},
  {
    get: (_, component) => makePixiComponent(new PIXI[component]()),
  },
);
