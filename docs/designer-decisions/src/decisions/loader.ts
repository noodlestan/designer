import path from 'node:path';

import { DEMO_DATA, SAMPLE_DATA } from '@noodlestan/designer-decisions';
import {
    createDecisionLoader,
    formatDecisionStatus,
    produceDecisions,
} from '@noodlestan/designer-functions';
import { DECISION_SCHEMAS } from '@noodlestan/designer-schemas';

const LOCAL_DATA = path.resolve('./data/decisions');

export const decisionLoader = createDecisionLoader({
    schemas: [DECISION_SCHEMAS],
    decisions: [SAMPLE_DATA, DEMO_DATA, LOCAL_DATA],
});

const loadDecisions = async () => {
    const store = await decisionLoader();
    if (store.hasErrors()) {
        store.storeErrors().forEach(({ msg, error }) => console.error(msg, error));
        throw new Error(`Validation errors.`);
    }

    const produced = produceDecisions(store);
    produced.decisions().forEach(status => console.info(formatDecisionStatus(status)));

    console.info('🐘', produced.summary());
};

loadDecisions();
