import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],resolve: {
    alias: {
      src: "/src",
    },
  },
  server: {
    port: 5183,  // Change the port to 5183 (default is 5173)
  },
})
