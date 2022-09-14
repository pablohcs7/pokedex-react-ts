import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://pablohcs7.github.io/pokedex-react-ts/',
  plugins: [react()]
})
