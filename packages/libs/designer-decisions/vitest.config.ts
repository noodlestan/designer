import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        conditions: ['development', 'browser'],
    },
    test: {
        coverage: {
            exclude: ['**/meta/*', '**/index.ts'],
        },
    },
});
