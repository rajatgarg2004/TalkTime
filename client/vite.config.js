// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://talktime-erub.onrender.com',
        changeOrigin: true,
        secure: false, // Set to true if you have a valid SSL certificate
        // cookieDomainRewrite: 'localhost', // Uncomment if necessary
      },
    },
  },
});
