import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: '.',                      // read index.html from project root
  build: {
    outDir: 'dist',               // build folder
    rollupOptions: {
      input: './index.html'       // entry point for build
    }
  }
})
