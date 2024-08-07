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
      target: 'https://talktime-erub.onrender.com',
        changeOrigin: true,
        secure: false, // Set to true if you have a valid SSL certificate
        cookieDomainRewrite: 'localhost',
    },
  },

})
