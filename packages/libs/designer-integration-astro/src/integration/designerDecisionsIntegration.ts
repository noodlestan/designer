import { injectCollections } from '@inox-tools/content-utils';
import { z } from 'astro/zod';
import { defineIntegration } from 'astro-integration-kit';

const optionsSchema = z
    .object({
        /**
         * Whether to inject Designer Decisions default styles.
         *
         * @default `true`
         */
        applyBaseStyles: z.boolean().optional().default(true),
        /**
         * Whether to inject Astro/Starlight style overrides.
         *
         * @default `false`
         */
        applyStarlightStyles: z.boolean().optional().default(false),
    })
    .optional()
    .default({});

export const designerDecisionsIntegration = defineIntegration({
    name: '@noodlestan/designer-integrations-astro',
    optionsSchema,
    setup({ options }) {
        const { applyBaseStyles = true, applyStarlightStyles = false } = options || {};
        return {
            hooks: {
                'astro:config:setup': async params => {
                    const { injectScript, addWatchFile, logger } = params;

                    logger.info(JSON.stringify(options, undefined, 2));

                    if (applyBaseStyles) {
                        injectScript(
                            'page-ssr',
                            `import '@noodlestan/designer-shows/astro/styles/base.css';`,
                        );
                    }

                    if (applyStarlightStyles) {
                        injectScript(
                            'page-ssr',
                            `import '@noodlestan/designer-integration-astro/styles/starlight/style.css';`,
                        );
                    }

                    injectCollections(params, {
                        entrypoint: '@noodlestan/designer-integration-astro/collections',
                    });

                    addWatchFile('./dd.config.ts');
                },
            },
        };
    },
});
