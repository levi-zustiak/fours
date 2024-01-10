import { JSXElement, createEffect, onCleanup, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { gsap } from 'gsap';
import { usePresence } from './presence';

const TWEEN_KEYS = ['from', 'to'] as const;
const GESTURES = ['hover', 'press'] as const;

const ATTR_KEYS = ['tag'] as const;

type GSAPComponentProps = any;

function GSAPComponent(props: GSAPComponentProps) {
  const [tweens, , attrs] = splitProps(props, TWEEN_KEYS, ATTR_KEYS);

  const presence = usePresence();

  let ref!: Element;

  const animate = () => {
    const parent = props.timeline ?? gsap;

    if (tweens.from && tweens.to) {
      parent.fromTo(ref, tweens.from, tweens.to);
    } else {
      const [fn, config] = Object.entries(tweens)[0];

      parent[fn](ref, config);
    }
  };

  const exit = () => {
    if (presence && props.exit) {
      gsap.to(ref, {
        ...props.exit,
        onComplete: () => ref.dispatchEvent(new Event('motioncomplete')),
      });
    }
  };

  createEffect(() => {
    if (presence && !presence.mount()) return;

    animate();

    onCleanup(() => exit());
  });

  return (
    <Dynamic
      {...attrs}
      ref={(el: Element) => {
        ref = el;
        props.ref?.(el);
      }}
      component={props.tag || 'div'}
    />
  );
}

type GSAPProxyComponent<T> = (props: T & any) => JSXElement;

export const GSAP = new Proxy(GSAPComponent, {
  get:
    (_, tag: string): GSAPProxyComponent<any> =>
    (props) => <GSAPComponent {...props} tag={tag} />,
});
