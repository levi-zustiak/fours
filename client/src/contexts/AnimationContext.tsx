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
  const [sequence, setSequence] = createSignal([]);
  const [options, setOptions] = createSignal({});
  const master = gsap.timeline();

  const addToTimeline = (tl, offset) => {
    console.log(tl, offset);

    if (offset) {
      master.add(tl(), offset);
    } else {
      master.add(tl());
    }
  };

  return (
    <AnimationContext.Provider value={{ master, addToTimeline }}>
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
