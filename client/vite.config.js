import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
    port : 3000,
  },
  // This is done so as to remove cors error
  proxy: {
    "/api": {
      target: "http://localhost:5000",
      changeOrigin: true,
      secure: false,
      cookieDomainRewrite: "localhost",
    },
  },

})
