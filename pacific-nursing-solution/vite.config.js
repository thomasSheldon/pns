import { defineConfig } from 'vite'; 
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    port: 5174,
    proxy: {
      // This proxy helps redirect API calls from the frontend to the backend
      '/api': 'http://localhost:8888',
      '/.netlify/functions': {
        target: 'http://localhost:8888', // Ensure this is your local server for functions
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/.netlify\/functions/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'], // Externalize both react and react-dom
    },
  },
});
