import { defineConfig } from '@noodlestan/designer-functions';

const { errors } = await defineConfig({
    integration: { applyStarlightStyles: true },
});

errors.forEach(error => console.error('🟥', error));
