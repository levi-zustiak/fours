import {
  InertiaComponent,
  SetupOptions,
  createInertiaApp,
} from 'inertia-solid';
import { render } from 'solid-js/web';
import './app.css';
import { DefaultLayout } from './layouts/DefaultLayout';
import { GameProvider } from './contexts/GameContext';

createInertiaApp({
  resolve: async (name: string) => {
    const pages = import.meta.glob<InertiaComponent>('./pages/**/*.tsx', {
      import: 'default',
      eager: true,
    });

    const page = pages[`./pages/${name}.tsx`];

    page.layout = [DefaultLayout];

    return page;
  },
  setup: ({ el, App, props }: SetupOptions) =>
    render(
      () => (
        <GameProvider>
          <App {...props} />
        </GameProvider>
      ),
      el,
    ),
});
