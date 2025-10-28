import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 3000,

    proxy: {
      "/api": {
        target: "http://localhost:8001", // backend portunu yaz
        changeOrigin: true,
        secure: false,
      },
      '/uploads': { target: 'http://localhost:8001', changeOrigin: true },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
