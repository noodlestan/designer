import path from 'path';

import { SAMPLE_DATA } from '@noodlestan/designer-decisions';
import {
    createDecisionLoader,
    formatDecision,
    formatValidationError,
    getDecisionStatus,
} from '@noodlestan/designer-functions';
import { DECISION_SCHEMAS } from '@noodlestan/designer-schemas';

const DATA_PATH = path.resolve('./data/decisions');

const loader = createDecisionLoader(
    [DECISION_SCHEMAS],
    [SAMPLE_DATA, DATA_PATH],
    async moduleName => `../../../node_modules/${moduleName}`,
);

const loadDecisions = async () => {
    const store = await loader();
    if (store.hasErrors()) {
        store.storeErrors().forEach(({ msg, error }) => console.error(msg, error));
        store.validationErrors().forEach(error => console.error(formatValidationError(error)));
    }
    const records = store.records();
    const errors = store.storeErrors().length;
    const validationErrors = store.validationErrors().length;
    console.info(`🐘 ${records.length} records, ${errors} errors, ${validationErrors} warnings`);

    records.forEach(record => {
        const status = getDecisionStatus(store, record);
        console.info(formatDecision(status));
    });
};

loadDecisions();
