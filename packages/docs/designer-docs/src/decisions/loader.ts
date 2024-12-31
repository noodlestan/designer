import path from 'node:path';

import {
    createDecisionLoader,
    formatStoreError,
    formatValidationError,
} from '@noodlestan/designer-functions';
import { DECISION_SCHEMAS } from '@noodlestan/designer-schemas';

const DECISION_DATA = path.resolve('./data/decisions');

export const decisionLoader = createDecisionLoader(
    [DECISION_DATA],
    [DECISION_SCHEMAS],
    async (moduleName: string) => `../../../node_modules/${moduleName}`,
);

const loadDecisions = async () => {
    const store = await decisionLoader();
    if (store.hasErrors()) {
        store.storeErrors()?.forEach(error => console.error(formatStoreError(error)));
        store.validationErrors()?.forEach(error => console.error(formatValidationError(error)));
    }
    const decisions = store.records().length;
    const errors = store.storeErrors().length;
    const validationErrors = store.validationErrors().length;
    console.info(`🐘 ${decisions} decisions, ${errors} errors, ${validationErrors} warnings`);
};

loadDecisions();
