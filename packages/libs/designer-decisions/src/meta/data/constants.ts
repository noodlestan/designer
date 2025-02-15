import type { DecisionSource } from '../../types';

const SAMPLE_DATA: DecisionSource = {
    name: 'Designer Decisions Sample Data',
    source: {
        type: 'package',
        package: '@noodlestan/designer-decisions',
        path: 'resources/data/samples',
    },
};

const DEMO_DATA: DecisionSource = {
    name: 'Designer Decisions Demo Data',
    source: {
        type: 'package',
        package: '@noodlestan/designer-decisions',
        path: 'resources/data/demo',
    },
};

export { SAMPLE_DATA, DEMO_DATA };
