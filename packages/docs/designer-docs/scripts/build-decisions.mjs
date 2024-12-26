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
        store.allErrors().forEach(error => console.error(formatValidationError(error)));
    }
    console.info(`🐘 ${store.records().length} decisions, ${store.allErrors().length} errors`);
    if (store.hasErrors()) {
        process.exit(1);
    }
};

loadDecisions();
