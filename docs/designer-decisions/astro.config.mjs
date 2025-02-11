import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import designerDecisionsIntegration from '@noodlestan/designer-integration-astro';

import { processLinks } from './src/mdx';
import { createSidebar } from './src/navigation/sidebar.ts';

const remarkPlugins = [];
const rehypePlugins = [processLinks];

const site = process.env.ASTRO_SITE_URL || 'https://designer-decisions.noodlestan.org/';
const base = process.env.ASTRO_BASE_PATH || '/';

const sidebar = createSidebar();

export default defineConfig({
    site,
    base,
    markdown: { remarkPlugins, rehypePlugins },
    integrations: [
        starlight({
            title: 'Designer Decisions',
            logo: {
                dark: './src/assets/DD-logomark.svg',
                light: './src/assets/DD-logomark.svg',
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
            sidebar,
        }),
        designerDecisionsIntegration({ applyStarlightStyles: true }),
    ],
});
