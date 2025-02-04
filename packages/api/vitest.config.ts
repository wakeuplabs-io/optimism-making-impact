import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    globals: true,
    environment: 'node',
  },
});
