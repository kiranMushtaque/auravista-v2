import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': import.meta.dirname ? path.resolve(import.meta.dirname, '.') : path.resolve('.'),
      },
    },
    optimizeDeps: {
      exclude: ['maplibre-gl'],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/api/tiles/satellite': {
          target: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/tiles\/satellite/, ''),
        },
      },
    },
  };
});
