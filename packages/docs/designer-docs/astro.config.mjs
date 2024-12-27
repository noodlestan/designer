import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { staticSidebar } from './sidebar.static.mjs';

const decisionModels = {
    label: 'Decision Models',
    items: [{ label: 'Index', link: 'decision-models' }],
};

export default defineConfig({
    integrations: [
        starlight({
            title: 'Designer Decisions',
            logo: {
                dark: './src/assets/DD-logo-dark.png',
                light: './src/assets/DD-logo-light.png',
                replacesTitle: true,
            },
            customCss: [
                './src/styles/starlight.css',
                './src/styles/starlight.custom.css',
                './src/styles/decisions.css',
                './src/styles/scrollbars.css',
            ],
            social: {
                github: 'https://github.com/noodlestan',
                discord: 'https://discord.gg/b8DkbJSF9z',
            },
            sidebar: staticSidebar({ decisionModels }),
        }),
    ],
});
