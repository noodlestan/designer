import {
    formatStoreError,
    formatValidationError,
    createDecisionLoader,
    produceDecisions,
    formatDecisionStatus,
} from '@noodlestan/designer-functions';
import path from 'path';

import { SAMPLE_DATA, DEMO_DATA } from '@noodlestan/designer-decisions';
import { DECISION_SCHEMAS } from '@noodlestan/designer-schemas';

const DECISION_DATA_PATH = path.resolve('./data/decisions');

const decisionLoader = createDecisionLoader(
    [DECISION_SCHEMAS],
    [SAMPLE_DATA, DEMO_DATA, DECISION_DATA_PATH],
);

const load = async () => {
    const store = await decisionLoader();
    if (store.hasErrors()) {
        store.storeErrors()?.forEach(error => console.error(formatStoreError(error)));
        store.validationErrors()?.forEach(error => console.error(formatValidationError(error)));
    }

    const produced = produceDecisions(store);
    produced
        .decisions()
        // .filter(status => status.hasErrors)
        .forEach(status => console.info(formatDecisionStatus(status)));

    console.info('🐘', produced.summary());
    if (produced.hasErrors()) {
        throw new Error(`Errors (${produced.errors.count()}) encountered producing decisions.`);
    }
};

load().catch(err => {
    console.error(err);
    process.exit(1);
});
