import { z } from 'astro/zod';
import { defineIntegration } from 'astro-integration-kit';

import { DESIGNER_INTEGRATION_STYLES } from '../../private';

export const injectStylesOptionsSchema = z
    .object({
        /**
         * Whether to inject Designer Decisions default styles.
         *
         * @default `true`
         */
        applyBase: z.boolean().optional().default(true),
        /**
         * Whether to inject Astro/Starlight style overrides.
         *
         * @default `false`
         */
        applyStarlight: z.boolean().optional().default(false),
    })
    .optional()
    .default({});

export const injectStylesIntegration = defineIntegration({
    name: DESIGNER_INTEGRATION_STYLES,
    optionsSchema: injectStylesOptionsSchema,
    setup({ options }) {
        const { applyBase = true, applyStarlight = true } = options || {};

        return {
            hooks: {
                'astro:config:setup': async params => {
                    const { injectScript } = params;

                    if (applyBase) {
                        injectScript(
                            'page-ssr',
                            `import '@noodlestan/designer-shows/astro/styles/base.css';`,
                        );
                    }
                    if (applyStarlight) {
                        injectScript(
                            'page-ssr',
                            `import '@noodlestan/designer-integration-astro/styles/starlight/style.css';`,
                        );
                    }
                },
            },
        };
    },
});
