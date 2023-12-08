import {
  InertiaComponent,
  SetupOptions,
  createInertiaApp,
} from 'inertia-solid';
import { render } from 'solid-js/web';
import './app.css';
import { GameProvider } from './contexts/GameContext';

createInertiaApp({
  resolve: async (path: string) => {
    const pages = import.meta.glob<InertiaComponent>('./pages/**/*page.tsx', {
      import: 'Page',
      eager: true,
    });

    const layouts = Object.entries(
      import.meta.glob('./pages/**/*layout.tsx', {
        import: 'Layout',
        eager: true,
      }),
    )
      .filter(([file]) => {
        const pattern = /\.\/pages|\/layout\.tsx/g;

        return path.includes(file.replace(pattern, ''));
      })
      .sort(([keyA], [keyB]) => keyA.length - keyB.length)
      .map(([file, layout]) => layout);

    console.log(layouts);

    const page = pages[`./pages${path}/page.tsx`];

    page.layout = layouts;

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
