import path from 'node:path';

import { DEMO_DATA, SAMPLE_DATA } from '@noodlestan/designer-decisions';
import {
    createDecisionLoader,
    formatStoreError,
    formatValidationError,
} from '@noodlestan/designer-functions';
import { DECISION_SCHEMAS } from '@noodlestan/designer-schemas';

const DECISION_DATA_PATH = path.resolve('./data/decisions');

export const decisionLoader = createDecisionLoader(
    [DECISION_SCHEMAS],
    [SAMPLE_DATA, DEMO_DATA, DECISION_DATA_PATH],
    async (moduleName: string) => `../../node_modules/${moduleName}`,
);

const loadDecisions = async () => {
    const store = await decisionLoader();
    if (store.hasErrors()) {
        store.storeErrors()?.forEach(error => console.error(formatStoreError(error)));
        store.validationErrors()?.forEach(error => console.error(formatValidationError(error)));
    }
    const records = store.records().length;
    const errors = store.storeErrors().length;
    const validationErrors = store.validationErrors().length;
    console.info(`🐘 ${records} records, ${errors} errors, ${validationErrors} warnings`);
};

loadDecisions();
