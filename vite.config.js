/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: '/src/components'
      },
      {
        find: '@styles',
        replacement: '/src/styles'
      },
      {
        find: '@utils',
        replacement: '/src/utils'
      }
    ]
  }
});
