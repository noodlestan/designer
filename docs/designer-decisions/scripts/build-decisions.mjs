import {
    createStoreContext,
    formatDecisionStatus,
    loadConfig,
    staticStoreBuilder,
    produceDecisions,
} from '@noodlestan/designer-functions';

const config = await loadConfig();
const context = createStoreContext(config.store);
const build = staticStoreBuilder(context);

const loadDecisions = async () => {
    const store = await build();

    const records = store.records();
    const produced = produceDecisions(store);
    produced.decisions().forEach(status => console.info(formatDecisionStatus(status)));
    console.info(`🐘 ${records.length} records`);
    context.errors().forEach(error => console.error('🙈 ' + error.message()));
};

loadDecisions();
