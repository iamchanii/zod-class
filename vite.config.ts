import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      fileName(_format, entryName) {
        return `${entryName}.mjs`;
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['zod'],
    },
    emptyOutDir: true,
    outDir: 'dist',
    minify: true,
    sourcemap: true,
  },
});
