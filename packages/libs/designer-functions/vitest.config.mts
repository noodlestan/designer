import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        conditions: ['development', 'node'],
    },
    test: {
        coverage: {
            exclude: [
                '**/meta/*',
                '**/index.ts',
                '**/mocks/*',
                '**/types/*',
                ...coverageConfigDefaults.exclude,
            ],
        },
    },
});
