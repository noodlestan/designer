import {
    createDecisionLoader,
    formatDecisionStatus,
    loadConfig,
    produceDecisions,
} from '@noodlestan/designer-functions';

const config = await loadConfig();

export const loader = createDecisionLoader(config.loader);

const loadDecisions = async () => {
    const store = await loader();
    if (store.hasErrors()) {
        store.storeErrors().forEach(({ msg, error }) => console.error(msg, error));
        throw new Error(`Validation errors.`);
    }

    const produced = produceDecisions(store);
    produced.decisions().forEach(status => console.info(formatDecisionStatus(status)));

    console.info('🐘', produced.summary());
};

loadDecisions();
