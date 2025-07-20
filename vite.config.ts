import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false, // Disable sourcemaps for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          three: ['three'],
          animations: ['framer-motion', 'gsap'],
          lucide: ['lucide-react'],
        },
      },
    },
    target: 'esnext', // Updated from es2015 for better compatibility
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size warning limit
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      'gsap',
      '@studio-freight/lenis',
      'framer-motion',
    ],
    exclude: [], // Removed lucide-react from exclude as it's now in manualChunks
  },
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      overlay: false,
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`, // Ensure React is available in all files
  },
});