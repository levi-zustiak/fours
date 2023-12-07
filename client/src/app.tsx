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
  resolve: async (path: string) => {
    const pages = import.meta.glob<InertiaComponent>('./pages/**/*/page.tsx', {
      import: 'Page',
      eager: true,
    });

    const layouts = import.meta.glob('./pages/**/*/layout.tsx', {
      import: 'Layout',
      eager: true,
    });

    console.log(layouts);

    const Page = pages[`./pages/${path}/page.tsx`];
    const Layout = layouts[`./pages/${path}/layout.tsx`];

    Page.layout = [DefaultLayout, Layout];

    return Page;
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
