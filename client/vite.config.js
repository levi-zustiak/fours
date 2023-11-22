import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import solid from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

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
      outDir: resolve(__dirname, '..', 'server/public/build'),
      rollupOptions: {
        input: resolve(__dirname, 'src/app.tsx'),
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@components': resolve(__dirname, './src/components'),
      },
    },
    cacheDir: resolve(__dirname, '..', 'node_modules/.vite'),
    plugins: [solid(), tsconfigPaths()],
  };
});
