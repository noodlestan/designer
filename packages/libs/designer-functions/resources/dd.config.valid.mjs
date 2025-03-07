import { defineConfig, formatError } from '@noodlestan/designer-functions';

const { options, errors } = await defineConfig({
    store: {
        decisions: [],
        schemas: [],
        moduleResolver: () => 'foo',
    },
});

console.info(options);
errors.forEach(error => console.error('🟥', formatError(error)));
