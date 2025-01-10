import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { staticSidebar } from './sidebar.static.mjs';
import { processLinks } from './src/mdx/rehype/processLinks.ts';

const remarkPlugins = [];
const rehypePlugins = [processLinks];

const decisionModels = {
    label: 'Decision Models',
    items: [{ label: 'Index', link: 'decision-models' }],
};

export default defineConfig({
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
                './src/styles/decisions.css',
                './src/styles/scrollbars.css',
                './src/styles/starlight.css',
                './src/styles/starlight.custom.css',
            ],
            components: {
                Footer: './src/components/Starlight/Footer.astro',
            },
            sidebar: staticSidebar({ decisionModels }),
        }),
    ],
});
