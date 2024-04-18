import { ComponentProps, onMount, splitProps } from 'solid-js';
import { useOptionalDismissableLayerContext } from './dismissable-layer-context';
import { layerStack } from './layer-stack';
import { OverrideComponentProps } from '@components/Modal/modal-content';

type PointerDownOutsideEvent = any;

interface DismissableLayerOptions {
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  onPointerDownOutside?: (event: PointerDownOutsideEvent) => void;
  disableOutsidePointerEvents?: boolean;
  onDismiss?: () => void;
}

interface DismissableLayerProps
  extends OverrideComponentProps<'div', DismissableLayerOptions> {}

export function DismissableLayer(props: DismissableLayerProps) {
  let ref: HTMLElement | undefined;

  const parentContext = useOptionalDismissableLayerContext();

  const [local, others] = splitProps(props, [
    'ref',
    'onEscapeKeyDown',
    'disableOutsidePointerEvents',
    'onPointerDownOutside',
    'onDismiss',
  ]);

  const nestedLayers = new Set<Element>([]);

  const registerNestedLayer = (element: Element) => {
    nestedLayers.add(element);

    const parentUnregister = parentContext?.registerNestedLayer(element);

    return () => {
      nestedLayers.delete(element);
      parentUnregister?.();
    };
  };

  const onPointerDownOutside = (e: PointerDownOutsideEvent) => {};

  function createEscapeKeyDown() {}

  onMount(() => {
    if (!ref) return;

    layerStack.addLayer({
      node: ref,
      isPointerBlocking: local.disableOutsidePointerEvents,
      dismiss: local.onDismiss,
    });
  });
}
