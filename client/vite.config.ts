/// <reference types="vitest" />

import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  plugins: [
    VitePWA({
      injectRegister: 'auto',
      // devOptions: {
      //   enabled: true,
      // },
      manifest: {
        name: 'Chronicle - Konomi.ai',
        background_color: '#ffffff',
        categories: [
          'personal-care',
          'software-as-a-service',
          'practice-tracking',
        ],
        description: 'Personal care practice tracking, simplified.',
        display: 'standalone',
        icons: [
          {
            src: 'icons/128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/196.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            src: 'icons/128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            src: 'icons/196.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            src: 'icons/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        short_name: 'Chronicle',
        theme_color: '#ffffff',
      },
    }),
  ],
});
