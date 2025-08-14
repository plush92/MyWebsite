import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from 'tailwindcss'
// https://vitejs.dev/config/

export default defineConfig({
  base: '/MyWebsite/',
  plugins: [react()],
  build: {
    outDir: 'dist', 
    emptyOutDir: true
  }
});