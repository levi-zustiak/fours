import gsap from 'gsap';
import { timeline } from 'motion';
import {
  createContext,
  createEffect,
  createSignal,
  useContext,
} from 'solid-js';

const AnimationContext = createContext();

function AnimationProvider(props) {
  const master = gsap.timeline({ autoRemoveChildren: true });

  return (
    <AnimationContext.Provider value={{ master }}>
      {props.children}
    </AnimationContext.Provider>
  );
}

function useAnimation() {
  const context = useContext(AnimationContext);

  if (context === undefined) {
    throw new Error("AnimationContext was used outside of it's provider");
  }

  return context;
}

export { AnimationContext, AnimationProvider, useAnimation };
