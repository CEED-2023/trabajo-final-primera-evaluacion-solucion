import { defineConfig } from 'vite'
import obfuscator from 'rollup-plugin-obfuscator';

export default defineConfig({
  // root: './src',
  // publicDir: '../public',
  server: {
    port: 8080
  },
  build: {
    rollupOptions: {
      plugins: [
        obfuscator({})
      ]
    }
  }
})
