import { injectCollections } from '@inox-tools/content-utils';
import { z } from 'astro/zod';
import { defineIntegration } from 'astro-integration-kit';

import { integrationAPI } from '../api';
import { DESIGNER_INTEGRATION } from '../private';
import { remarkInjectStore } from '../remark';

import {
    injectStylesIntegration,
    injectStylesOptionsSchema,
    validateIntegrationsConfig,
} from './private';

const optionsSchema = z
    .object({
        styles: injectStylesOptionsSchema,
    })
    .optional()
    .default({});

export const designerDecisionsIntegration = defineIntegration({
    name: DESIGNER_INTEGRATION,
    optionsSchema,
    setup({ options }) {
        const { config: designerConfig } = integrationAPI;
        const { styles } = options || {};

        return {
            hooks: {
                'astro:config:setup': async params => {
                    const { command, addWatchFile, logger, config } = params;

                    validateIntegrationsConfig(config.integrations);
                    addWatchFile('./dd.config.mjs');

                    logger.debug('config: ' + JSON.stringify(designerConfig, undefined, 2));
                    logger.info('options: ' + JSON.stringify(options, undefined, 2));

                    config.integrations = config.integrations || [];
                    config.integrations.push(injectStylesIntegration(styles));

                    config.markdown = config.markdown || {};
                    config.markdown.remarkPlugins = config.markdown.remarkPlugins || [];
                    config.markdown.remarkPlugins.push(remarkInjectStore);
                    // config.markdown.remarkPlugins.push(remarkCollectPermalinks);

                    if (command === 'dev') {
                        injectCollections(params, {
                            entrypoint: '@noodlestan/designer-integration-astro/collections',
                        });
                    }
                },
            },
        };
    },
});
