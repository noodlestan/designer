import { createStoreContext, loadConfig, staticStoreBuilder } from '@noodlestan/designer-functions';

import type { DesignerAstroIntegrationAPI } from './types';

async function createDesignerIntegrationAPI(): Promise<DesignerAstroIntegrationAPI> {
    const config = await loadConfig();
    const context = createStoreContext(config.store);
    const build = staticStoreBuilder(context);

    return {
        config,
        build,
    };
}

export const integrationAPI = await createDesignerIntegrationAPI();
