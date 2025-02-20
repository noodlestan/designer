import { defineConfig } from '@noodlestan/designer-functions';

import { DEMO_DATA, SAMPLE_DATA } from '@noodlestan/designer-decisions';

const LOCAL_DATA = './data';
export default defineConfig({
    store: {
        decisions: [SAMPLE_DATA, DEMO_DATA, LOCAL_DATA],
    },
});
