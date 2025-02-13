import path from 'path';
import { defineConfig } from '@noodlestan/designer-functions';

import { DECISION_SCHEMAS } from '@noodlestan/designer-schemas';
import { DEMO_DATA, SAMPLE_DATA } from '@noodlestan/designer-decisions';

const LOCAL_DATA = path.resolve('./data/decisions');
export default defineConfig({
    loader: {
        schemas: [DECISION_SCHEMAS],
        decisions: [SAMPLE_DATA, DEMO_DATA, LOCAL_DATA],
    },
});
