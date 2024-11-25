import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import tailwindcss from 'tailwindcss';
import svgr from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';



export default defineConfig({
  base: '',
  plugins: [react(), viteTsconfigPaths(), svgr()],
  test:{
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage'
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],

    },
    preprocessorOptions: {
      scss: {
        api: 'modern', // Ensure modern compiler is used
      },
    },
  },
  server: {
    open: true,
    port: 4200,
  },
  define: {
    global: 'globalThis',
  },
  build: {
    target: browserslistToEsbuild(['>0.2%', 'not dead', 'not op_mini all']),
    outDir: './build',
    emptyOutDir: true,
  },

});
