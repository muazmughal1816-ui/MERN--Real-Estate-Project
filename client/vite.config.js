import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
    // ⚠️ YEH OBJECT ADD KAREIN JO BROWSER KA SECURITY BLOC KHALI KARTA HAI ⚠️
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [react(), tailwindcss()],
})
