import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      port: 8080,
      allowedHosts: ['vast-sharing-flamingo.ngrok-free.app', 'https://00-vue-login-ddp.fly.dev/']
  }
})
