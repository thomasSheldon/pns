import { defineConfig } from 'vite'; 
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 5174,
    proxy: {
      '/api': 'http://localhost:8888',
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/.netlify\/functions/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      external: [
        // 'react', 
        // 'react-dom', 
        // 'react/jsx-runtime', 
        // 'react-dom/client', 
        'react-router-dom', // Externalize react-router-dom
        'axios', // Externalize axios
        // 'prop-types'
      ],
    },
      target: 'esnext',
      minify: true,
      assetsInlineLimit: 4096,
      chunkSizeWarningLimit: 1000, // Increase the limit if needed
  },
});
