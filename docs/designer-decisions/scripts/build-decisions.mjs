import {
    createStoreContext,
    formatDecisionStatus,
    formatError,
    loadConfig,
    staticStoreBuilder,
    produceDecisions,
} from '@noodlestan/designer-functions';

const config = await loadConfig();
const context = createStoreContext(config.store);
const build = staticStoreBuilder(context);

const loadDecisions = async () => {
    const store = await build();

    const produced = produceDecisions(store);
    produced.decisions().forEach(status => console.info(formatDecisionStatus(status)));
    console.info('🐘', produced.summary());

    context.errors().forEach(error => console.error(formatError(error)));
    if (produced.hasErrors()) {
        throw new Error(`Errors encountered producing decisions.`);
    }
};

loadDecisions().catch(err => {
    console.error(err);
    process.exit(1);
});
