import type { AstroIntegration } from 'astro';

export type DesignerDecisionsIntegrationOptions = {
    applyBaseStyles?: boolean;
};

export function designerDecisionsIntegration(
    options?: DesignerDecisionsIntegrationOptions,
): AstroIntegration {
    const { applyBaseStyles = true } = options || {};
    return {
        name: '@noodlestan/designer-decisions',
        hooks: {
            'astro:config:setup': async ({ injectScript }) => {
                if (applyBaseStyles) {
                    injectScript(
                        'page-ssr',
                        `import '@noodlestan/designer-shows/astro/styles/base.css';`,
                    );
                }
            },
        },
    };
}
