import type { SchemaGeneratorConfig } from '../meta';

const PATH_PRIMITIVES = './inputs/types/primitives';
const PATH_DECISION_TYPES = './inputs/types/models';

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
