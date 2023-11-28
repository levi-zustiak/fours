import { Application } from 'pixi.js';
import { ParentContext } from '@pixi/contexts/ParentContext';
import { JSXElement, splitProps } from 'solid-js';

type Props = {
  width?: number;
  height?: number;
  backgroundAlpha?: number;
  children: JSXElement;
};

export function Stage(props: Props) {
  const [localProps, pixiProps] = splitProps(props, ['children']);
  const { view, stage } = new Application(pixiProps);

  return (
    <>
      {view}
      <ParentContext.Provider
        value={{
          parent: stage,
          add: (child) => stage.addChild(child),
          remove: (child) => stage.removeChild(child),
        }}
      >
        {localProps.children}
      </ParentContext.Provider>
    </>
  );
}
