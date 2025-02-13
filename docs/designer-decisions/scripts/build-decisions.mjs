import {
    formatStoreError,
    formatValidationError,
    createDecisionLoader,
    produceDecisions,
    formatDecisionStatus,
    loadConfig,
} from '@noodlestan/designer-functions';

const { loader } = await loadConfig();

const decisionLoader = createDecisionLoader(loader);

const load = async () => {
    const store = await decisionLoader();
    if (store.hasErrors()) {
        store.storeErrors()?.forEach(error => console.error(formatStoreError(error)));
        store.validationErrors()?.forEach(error => console.error(formatValidationError(error)));
    }

    const produced = produceDecisions(store);
    produced.decisions().forEach(status => console.info(formatDecisionStatus(status)));

    console.info('🐘', produced.summary());
    if (produced.hasErrors()) {
        throw new Error(`Errors (${produced.errors.count()}) encountered producing decisions.`);
    }
};

load().catch(err => {
    console.error(err);
    process.exit(1);
});
