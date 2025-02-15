import type { AstroConfig } from 'astro';

import { E_INTREGRATION_ORDER, E_MISSING_STARLIGHT, throwIntegrationError } from '../../errors';
import { DESIGNER_INTEGRATION, STARLIGHT_INTEGRATION_NAME } from '../../private';

export function validateIntegrationsConfig(integrations: AstroConfig['integrations']): void {
    const indexThis = integrations.findIndex(i => i.name === DESIGNER_INTEGRATION);
    const indexStarlight = integrations.findIndex(i => i.name === STARLIGHT_INTEGRATION_NAME);

    if (indexStarlight === -1) {
        throwIntegrationError(E_MISSING_STARLIGHT);
    }

    if (indexThis < indexStarlight) {
        throwIntegrationError(E_INTREGRATION_ORDER);
    }
}
