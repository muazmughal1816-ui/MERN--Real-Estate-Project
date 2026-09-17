import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
 server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Matches your backend server port
        changeOrigin: true,             // 🛠️ FIXED: Forces Chrome/Edge to send cookies cross-origin
        secure: false,
      },
    },
    // 🛠️ FIXED: Removed the conflicting Access-Control-Allow-Origin header block completely
  },
  plugins: [react(), tailwindcss()],
})
