import type { DecisionSource } from '../../record';
import { DECISION_SCHEMAS } from '../schemas';

const SAMPLE_DATA: DecisionSource = {
    name: 'Designer Decisions Sample Data',
    source: {
        type: 'package',
        package: '@noodlestan/designer-decisions',
        path: 'resources/data/samples',
    },
    schemas: [DECISION_SCHEMAS],
};

const DEMO_DATA: DecisionSource = {
    name: 'Designer Decisions Demo Data',
    source: {
        type: 'package',
        package: '@noodlestan/designer-decisions',
        path: 'resources/data/demo',
    },
    schemas: [DECISION_SCHEMAS],
};

export { SAMPLE_DATA, DEMO_DATA };
