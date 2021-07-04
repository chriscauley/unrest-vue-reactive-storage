import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";


export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: '@unrest/vue-storage',
    },
    rollupOptions: {
      external: ['vue', 'querystring'],
      output: {
        globals: {
          vue: 'Vue',
          querystring: 'querystring',
        },
        exports: 'named',
      }
    }
  },
  plugins: [vue()]
})