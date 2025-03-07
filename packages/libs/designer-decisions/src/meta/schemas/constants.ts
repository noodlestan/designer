import type { SchemaSource } from '../../record';
import type { SchemaGeneratorConfig } from '../types';

const PATH_PRIMITIVES = './inputs/types/primitives';
const PATH_DECISION_TYPES = './inputs/types/models';

export const DESIGNER_DECISIONS_SCHEMA_GENERATOR_CONFIG: SchemaGeneratorConfig = {
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

export const DECISION_SCHEMAS: SchemaSource = {
    urnBase: 'urn:designer',
    source: {
        type: 'package',
        package: '@noodlestan/designer-schemas',
        path: 'schemas/',
    },
};
