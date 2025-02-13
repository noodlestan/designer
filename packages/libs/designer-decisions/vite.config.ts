import { readFileSync } from 'fs';
import { resolve } from 'path';

import { defineConfig } from 'vite';

const NAME = JSON.parse(readFileSync('package.json', 'utf8')).name;

export default defineConfig({
    plugins: [],
    build: {
        outDir: 'dist/esm/',
        emptyOutDir: true,
        target: 'esnext',
        lib: {
            entry: resolve('src/index.ts'),
            name: NAME,
            fileName: 'index',
        },
    },
});
