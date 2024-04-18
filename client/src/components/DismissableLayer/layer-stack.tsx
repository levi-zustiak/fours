export interface LayerModel {
  node: HTMLElement;
  isPointerBlocking?: boolean;
  dismiss?: VoidFunction;
}

function getDocument(node?: Node | null): Document {
  return node ? node.ownerDocument || (node as Document) : document;
}

export const DATA_TOP_LAYER_ATTR = 'data-kb-top-layer';

let originalBodyPointerEvents: string;
let hasDisabledBodyPointerEvents = false;

const layers: Array<LayerModel> = [];

function indexOf(node: HTMLElement | undefined) {
  return layers.findIndex((layer) => layer.node === node);
}

function find(node: HTMLElement | undefined) {
  return layers[indexOf(node)];
}

function isTopMostLayer(node: HTMLElement | undefined) {
  return layers[layers.length - 1].node === node;
}

function getPointerBlockingLayers() {
  return layers.filter((layer) => layer.isPointerBlocking);
}

function getTopMostPointerBlockingLayer() {
  return [...getPointerBlockingLayers()].at(-1);
}

function hasPointerBlockingLayer() {
  return getPointerBlockingLayers().length > 0;
}

function isBelowPointerBlockingLayer(node: HTMLElement) {
  const highestBlockingIndex = indexOf(getTopMostPointerBlockingLayer()?.node);
  return indexOf(node) < highestBlockingIndex;
}

function addLayer(layer: LayerModel) {
  layers.push(layer);
}

function removeLayer(node: HTMLElement) {
  const index = indexOf(node);

  if (index < 0) return;

  layers.splice(index, 1);
}

function assignPointerEventToLayers() {
  for (const { node } of layers) {
    node.style.pointerEvents = isBelowPointerBlockingLayer(node)
      ? 'none'
      : 'auto';
  }
}

function disableBodyPointerEvents(node: HTMLElement) {
  if (hasPointerBlockingLayer() && !hasDisabledBodyPointerEvents) {
    const ownerDocument = getDocument(node);

    originalBodyPointerEvents = document.body.style.pointerEvents;
    ownerDocument.body.style.pointerEvents = 'none';

    hasDisabledBodyPointerEvents = true;
  }
}

function restoreBodyPointerEvents(node: HTMLElement) {
  if (hasPointerBlockingLayer()) return;

  const ownerDocument = getDocument(node);

  ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;

  if (ownerDocument.body.style.length === 0) {
    ownerDocument.body.removeAttribute('style');
  }

  hasDisabledBodyPointerEvents = false;
}

export const layerStack = {
  layers,
  isTopMostLayer,
  hasPointerBlockingLayer,
  isBelowPointerBlockingLayer,
  addLayer,
  removeLayer,
  indexOf,
  find,
  assignPointerEventToLayers,
  disableBodyPointerEvents,
  restoreBodyPointerEvents,
};
