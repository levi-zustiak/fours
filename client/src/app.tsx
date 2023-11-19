import {
  InertiaComponent,
  SetupOptions,
  createInertiaApp,
} from 'inertia-solid';
import { render } from 'solid-js/web';

createInertiaApp({
  resolve: async (name: string) => {
    const pages = import.meta.glob<InertiaComponent>('./Pages/**/*.tsx', {
      import: 'default',
      eager: true,
    });

    const page = pages[`./Pages/${name}.tsx`];

    return page;
  },
  setup: ({ el, App, props }: SetupOptions) =>
    render(() => <App {...props} />, el),
});
