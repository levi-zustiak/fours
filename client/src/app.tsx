import {
  InertiaComponent,
  SetupOptions,
  createInertiaApp,
} from 'inertia-solid';
import { render } from 'solid-js/web';

createInertiaApp({
  resolve: async (name: string) => {
    const pages = await import.meta.glob<InertiaComponent>('./Pages/**/*.tsx', {
      import: 'default',
    });

    const page = pages[`./Pages/${name}.tsx`];

    return page;
  },
  setup: ({ el, App, props }: SetupOptions) =>
    render(() => <App {...props} />, el),
});
