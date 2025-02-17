import {
    createStoreContext,
    formatDecisionStatus,
    formatError,
    loadConfig,
    produceDecisions,
    staticStoreBuilder,
} from '@noodlestan/designer-functions';

const config = await loadConfig();
const context = createStoreContext(config.store);
const builder = staticStoreBuilder(context);

const loadDecisions = async () => {
    const store = await builder();
    context.errors().forEach(error => console.error(formatError(error)));

    const produced = produceDecisions(store);
    produced.decisions().forEach(status => console.info(formatDecisionStatus(status)));

    console.info(`🐘 ${produced.summary()}`);

    if (context.hasErrors()) {
        throw new Error(`Store has errors.`);
    }
};

loadDecisions();
