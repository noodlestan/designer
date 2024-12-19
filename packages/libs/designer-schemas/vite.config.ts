import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            formats: ['es', 'cjs'],
            fileName: format => (format === 'es' ? 'esm/index.js' : 'cjs/index.js'),
        },
        rollupOptions: {
            external: [], // Ensure all external dependencies aren't bundled
        },
    },
});
