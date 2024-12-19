import type { SchemaConfig } from '@noodlestan/designer-decisions';

export const DECISION_SCHEMAS: SchemaConfig = {
    urnBase: 'urn:designer',
    source: {
        type: 'package',
        package: '@noodlestan/designer-schemas',
        path: 'schemas/',
    },
};
