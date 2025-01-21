import {
    formatStoreError,
    formatValidationError,
    createDecisionLoader,
} from '@noodlestan/designer-functions';
import path from 'path';

import { SAMPLE_DATA } from '@noodlestan/designer-decisions';
import { DECISION_SCHEMAS } from '@noodlestan/designer-schemas';

const DATA_PATH = path.resolve('./data/decisions');

const decisionLoader = createDecisionLoader(
    [DECISION_SCHEMAS],
    [SAMPLE_DATA, DATA_PATH],
    async moduleName => `../../node_modules/${moduleName}`,
);

const load = async () => {
    const store = await decisionLoader();
    if (store.hasErrors()) {
        store.storeErrors()?.forEach(error => console.error(formatStoreError(error)));
        store.validationErrors()?.forEach(error => console.error(formatValidationError(error)));
    }
    const records = store.records().length;
    const errors = store.storeErrors().length;
    const validationErrors = store.validationErrors().length;
    console.info(`🐘 ${records} records, ${errors} errors, ${validationErrors} warnings`);
    if (store.hasErrors()) {
        throw new Error();
    }
};

load().catch(() => process.exit(1));
