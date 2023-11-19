import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      host: '0.0.0.0',
      hmr: {
        clientPort: env.CLIENT_PORT || 5173,
      },
      port: env.CLIENT_PORT || 5173,
      watch: {
        usePolling: true,
      },
    },
    build: {
      outDir: 'server/public/build',
      rollupOptions: {
        input: resolve(__dirname, 'client/src/app.tsx'),
      },
    },
    plugins: [solid()],
  };
});
