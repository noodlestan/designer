import { createStoreContext, loadConfig, staticStoreBuilder } from '@noodlestan/designer-functions';

import type { DesignerAstroIntegrationAPI } from './types';

async function createDesignerIntegrationAPI(): Promise<DesignerAstroIntegrationAPI> {
    const config = await loadConfig();
    const options = {
        ...config.store,
        schemas: config.store.schemas || [],
    };
    const context = createStoreContext(options);
    const build = staticStoreBuilder(context);

    return {
        config,
        build,
    };
}

export const integrationAPI = await createDesignerIntegrationAPI();
