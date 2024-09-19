// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import svgr from 'vite-plugin-svgr';

// export default defineConfig({
//   plugins: [react(), svgr()],
//   server: {
//     port: 5174,
//     proxy: {
//       '/.netlify/functions/apply-now': {
//         target: 'http://localhost:8888', // Your local server port
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/.netlify\/functions/, ''),
//       },
//     },
//   },
// });

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
    },
  },
});

