import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://iqea.me/',
  plugins: [react()],
  css: {
    preprocessorOptions: {
        scss: {
            additionalData: '@import "./src/styles/mixins";',
        },
    },
},
})
