import { JSXElement, ParentProps } from 'solid-js';

type EventHandlers = any;
type Options = {
  to: any;
  from: any;
  exit: any;
  tag: string;
  timeline?: GSAPTimeline;
};

export type GSAPComponentProps = ParentProps<EventHandlers & Options>;

export type MotionProxyComponent<T> = (
  props: T & GSAPComponentProps,
) => JSXElement;
