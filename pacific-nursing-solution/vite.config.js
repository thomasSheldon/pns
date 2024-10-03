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
    outDir: 'dist',
    rollupOptions: {
      output: {
        format: 'es', // Keep ES modules for modern browsers
      },
      external: [
        // Externalize dependencies here if you use CDN (e.g., 'react', 'react-dom', etc.)
      ],
    },
    commonjsOptions: {
      include: [/node_modules/], // Ensures that CommonJS dependencies are bundled correctly.
    },
    target: 'es2015', // Broader browser compatibility compared to 'esnext'
    minify: true, // Default Vite minification
    assetsInlineLimit: 8192, // Increased inline limit to 8kb for small assets like icons.
    chunkSizeWarningLimit: 1500, // Increased chunk size warning limit to 1500kb
  },
});
