import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import fullReload from 'vite-plugin-full-reload';
import sortCss from 'postcss-sort-media-queries';

export default defineConfig(() => ({
  base: '/goit-advancedjs-hw-01-/',

  root: 'src',
  publicDir: 'src/public',

  define: {
    global: 'window', 
  },

  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      input: glob.sync('./src/*.html'),
      manualChunks(id) {
        if (id.includes('node_modules')) return 'vendor';
      },
      output: {
        entryFileNames: chunk =>
          chunk.name === 'commonHelpers' ? 'commonHelpers.js' : '[name].js',
        assetFileNames: asset => {
          if (asset.name && asset.name.endsWith('.html')) return '[name].[ext]';
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },

  plugins: [
    injectHTML(),
    fullReload(['./src/**/*.html']),
  ],

  css: {
    postcss: {
      plugins: [sortCss({ sort: 'mobile-first' })],
    },
  },
}));
