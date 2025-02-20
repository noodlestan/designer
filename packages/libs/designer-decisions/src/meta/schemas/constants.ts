import type { SchemaSource } from '../types';

export const DECISION_SCHEMAS: SchemaSource = {
    urnBase: 'urn:designer',
    source: {
        type: 'package',
        package: '@noodlestan/designer-schemas',
        path: 'schemas/',
    },
};
