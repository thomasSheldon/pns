import { defineConfig } from 'vite'; 
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      react: 'react',
      'react-dom': 'react-dom',
    },
  },
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
        format: 'es',
      },
      external: [
        // 'react-router-dom',
        // 'prop-types',
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-router-dom',
        'axios',
        'prop-types',
      ],
    },
    target: 'esnext',
    minify: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1000,
  },
  "compilerOptions": {
    "jsx": "react-jsx"
  }
});
