import {
  JSXElement,
  createEffect,
  onCleanup,
  onMount,
  splitProps,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { gsap } from 'gsap';
import { usePresence } from './presence';

type AnimationKeys = 'from' | 'to' | 'fromTo' | 'exit';
type AnimationConfig = any;

const TWEEN_KEYS = ['from', 'to', 'fromTo'] as const;
const GESTURE_KEYS = ['hover', 'press'] as const;

const LOCAL_KEYS = ['tag', 'exit', 'timeline', 'position'] as const;

type GSAPComponentProps = any;

function GSAPComponent(props: GSAPComponentProps) {
  const [tweens, gestures, local, attrs] = splitProps(
    props,
    TWEEN_KEYS,
    GESTURE_KEYS,
    LOCAL_KEYS,
  );

  const completeEvent = new Event('motioncomplete');

  const presence = usePresence();

  let ref!: Element;
  let events = {
    hover: null,
    press: null,
  };

  const animate = (fn: AnimationKeys, config: AnimationConfig) => {
    if (!ref) return;

    local.timeline
      ? local.timeline[fn](ref, config, config?.at)
      : gsap[fn](ref, config);
  };

  const enter = () => {
    if (Object.keys(tweens).length === 0) return;

    const [fn, config] = Object.entries(tweens)[0];

    animate(fn, config);
  };

  const exit = () => {
    const complete = () => {
      ref.dispatchEvent(completeEvent);
    };

    if (presence && local.exit) {
      Array.isArray(local.exit)
        ? (local.exit[0].onComplete = complete)
        : (local.exit.onComplete = complete);

      animate('to', local.exit);
    }
  };

  const registerGestures = () => {
    Object.keys(gestures).forEach((key) => {
      events[key] = gsap.to(ref, { ...gestures[key], paused: true });
    });
  };

  const gestureEvent = (key: 'hover' | 'press', fn: 'play' | 'reverse') => {
    if (!events[key]) return;

    events[key][fn]();
  };

  createEffect(() => {
    console.log('mount', presence?.mount());
    if (presence && !presence.mount()) return;

    createEffect(() => enter());

    onCleanup(() => exit());
  });

  onMount(() => {
    registerGestures();
  });

  return (
    <Dynamic
      {...attrs}
      ref={(el: Element) => {
        ref = el;
        props.ref?.(el);
      }}
      onMouseEnter={() => gestureEvent('hover', 'play')}
      onMouseLeave={() => gestureEvent('hover', 'reverse')}
      onMouseDown={() => gestureEvent('press', 'play')}
      onMouseUp={() => gestureEvent('press', 'reverse')}
      component={local.tag || 'div'}
    />
  );
}

type GSAPProxyComponent<T> = (props: T & any) => JSXElement;

export const GSAP = new Proxy(GSAPComponent, {
  get:
    (_, tag: string): GSAPProxyComponent<any> =>
    (props) => <GSAPComponent {...props} tag={tag} />,
});
