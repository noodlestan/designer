import type { SchemaGeneratorConfig } from '../types';

const PATH_PRIMITIVES = './types/decision-inputs/primitives';
const PATH_DECISION_TYPES = './types/decision-inputs/models';

const DESIGNER_DECISIONS_SCHEMA_GENERATOR_CONFIG: SchemaGeneratorConfig = {
    urnBase: 'urn:designer',
    source: {
        type: 'package',
        package: '@noodlestan/designer-decisions',
        path: './src',
    },
    types: {
        primitives: [PATH_PRIMITIVES],
        decisionModels: [PATH_DECISION_TYPES],
    },
};

export { DESIGNER_DECISIONS_SCHEMA_GENERATOR_CONFIG };
