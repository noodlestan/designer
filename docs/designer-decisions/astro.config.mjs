import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { staticSidebar } from './sidebar.static.mjs';
import { processLinks } from './src/mdx/rehype/processLinks.ts';
import designerDecisionsIntegration from '@noodlestan/designer-integrations-astro';

const remarkPlugins = [];
const rehypePlugins = [processLinks];

const decisionModels = {
    label: 'Decision Models',
    items: [{ label: 'Index', link: 'decision-models' }],
};

const site = process.env.ASTRO_SITE_URL || 'https://designer-decisions.noodlestan.org/';
const base = process.env.ASTRO_BASE_PATH || '/';

export default defineConfig({
    site,
    base,
    markdown: { remarkPlugins, rehypePlugins },
    integrations: [
        starlight({
            title: 'Designer Decisions',
            logo: {
                dark: './src/assets/DD-logo-dark.png',
                light: './src/assets/DD-logo-light.png',
                replacesTitle: true,
            },
            social: {
                github: 'https://github.com/noodlestan',
                discord: 'https://discord.gg/b8DkbJSF9z',
            },
            customCss: [
                './src/styles/scrollbars.css',
                './src/styles/starlight.css',
                './src/styles/starlight.custom.css',
            ],
            components: {
                Footer: './src/components/Starlight/Footer.astro',
            },
            sidebar: staticSidebar({ decisionModels }),
        }),
        designerDecisionsIntegration(),
    ],
});
