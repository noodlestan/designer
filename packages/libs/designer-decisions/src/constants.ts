import { SchemaGeneratorConfig } from './types';

const PATH_PRIMITIVES = './src/types/decision-inputs/primitives';
const PATH_DECISION_TYPES = './src/types/decision-inputs/models';

export const DESIGNER_DECISIONS_SCHEMA_CONFIG: SchemaGeneratorConfig = {
    urnBase: 'urn:designer',
    source: {
        type: 'package',
        package: '@noodlestan/designer-decisions',
    },
    types: {
        primitives: [PATH_PRIMITIVES],
        decisionTypes: [PATH_DECISION_TYPES],
    },
};
