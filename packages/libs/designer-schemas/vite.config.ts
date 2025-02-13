import { readFileSync } from 'fs';

import { defineConfig } from 'vite';

const NAME = JSON.parse(readFileSync('package.json', 'utf8')).name;

export default defineConfig({
    build: {
        lib: {
            entry: 'src/index.ts',
            name: NAME,
            formats: ['es', 'cjs'],
            fileName: format => (format === 'es' ? 'esm/index.js' : 'cjs/index.js'),
        },
        rollupOptions: {
            external: ['fs', 'fs/promises', 'path', 'os'],
        },
    },
});
