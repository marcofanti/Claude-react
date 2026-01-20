import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      port: 8080,
      allowedHosts: ['vast-sharing-flamingo.ngrok-free.app', 'https://claude-react-3kys2fzpba-ue.a.run.app/', 'https://claude-react-726369928566.us-east1.run.app']
  }
})
