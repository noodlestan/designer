import { defineConfig } from '@noodlestan/designer-functions';

import { DECISION_SCHEMAS } from '@noodlestan/designer-schemas';
import { DEMO_DATA, SAMPLE_DATA } from '@noodlestan/designer-decisions';

const LOCAL_DATA = './data';
export default defineConfig({
    loader: {
        decisions: [SAMPLE_DATA, DEMO_DATA, LOCAL_DATA],
        schemas: [DECISION_SCHEMAS],
    },
});
