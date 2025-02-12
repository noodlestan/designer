import type { SchemaSource } from '@noodlestan/designer-decisions';

const DECISION_SCHEMAS: SchemaSource = {
    urnBase: 'urn:designer',
    source: {
        type: 'package',
        package: '@noodlestan/designer-schemas',
        path: 'schemas/',
    },
};

export { DECISION_SCHEMAS };
