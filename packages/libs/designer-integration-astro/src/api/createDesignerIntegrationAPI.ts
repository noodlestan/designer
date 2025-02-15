import { createDecisionLoader, loadConfig } from '@noodlestan/designer-functions';

import type { DesignerAstroIntegrationAPI } from './types';

async function createDesignerIntegrationAPI(): Promise<DesignerAstroIntegrationAPI> {
    const config = await loadConfig();
    const loader = createDecisionLoader(config.loader);

    return {
        config,
        loader,
    };
}

export const integrationAPI = await createDesignerIntegrationAPI();
