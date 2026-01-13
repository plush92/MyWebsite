import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // This makes tests run in a browser-like environment
    environment: 'jsdom',

    // Setup files to run before each test
    setupFiles: ['./src/test/setup.ts'],

    // File patterns to include as tests
    include: ['**/__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    // Test coverage configuration
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },

    // Add globals for better compatibility
    globals: true,
  },
});
