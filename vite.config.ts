import * as path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { config } from 'dotenv'

config({
  path: path.resolve(__dirname, '.env')
})

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['vuetify']
      }
    }
  },
  build: {
    cssCodeSplit: false,
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
