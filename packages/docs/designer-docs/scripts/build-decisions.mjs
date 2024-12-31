import path from 'path';

import { createDecisionLoader, formatValidationError } from '@noodlestan/designer-functions';
import { DECISION_SCHEMAS } from '@noodlestan/designer-schemas';

const DATA_PATH = path.resolve('./data/decisions');

const loader = createDecisionLoader(
    [DATA_PATH],
    [DECISION_SCHEMAS],
    async moduleName => `../../../node_modules/${moduleName}`,
);

const loadDecisions = async () => {
    const store = await loader();
    if (store.hasErrors()) {
        store.storeErrors().forEach(({ msg, error }) => console.error(msg, error));
        store.validationErrors().forEach(error => console.error(formatValidationError(error)));
    }
    const decisions = store.records().length;
    const errors = store.storeErrors().length;
    const validationErrors = store.validationErrors().length;
    console.info(`🐘 ${decisions} decisions, ${errors} errors, ${validationErrors} warnings`);

    if (store.hasErrors()) {
        process.exit(1);
    }
};

loadDecisions();
