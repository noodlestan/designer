import {
    createDecisionLoader,
    loadConfig,
    produceDecisions,
    formatDecisionStatus,
} from '@noodlestan/designer-functions';

const config = await loadConfig();
const loader = createDecisionLoader(config.loader);

const loadDecisions = async () => {
    const store = await loader();

    if (store.hasErrors()) {
        store.storeErrors().forEach(({ msg, error }) => console.error(msg, error));
        throw new Error(`Store has errors.`);
    }

    const records = store.records();
    const produced = produceDecisions(store);
    produced.decisions().forEach(status => console.info(formatDecisionStatus(status)));

    console.info(`🐘 ${records.length} records`);
};

loadDecisions();
