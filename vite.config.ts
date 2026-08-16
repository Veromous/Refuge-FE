import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173, // always this port (matches the Google OAuth origin)
    strictPort: true, // fail loudly instead of silently jumping to 5174/5175
    open: true, // auto-open the browser on `npm run dev`
    // The app lives on a single address: http://localhost:5173.
    // Any request to /api is quietly forwarded to the backend on port 5000,
    // so the browser only ever talks to one localhost.
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
