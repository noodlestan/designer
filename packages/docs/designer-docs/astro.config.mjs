import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { sidebar } from './sidebar.static.mjs';

export default defineConfig({
    experimental: { contentLayer: true },
    integrations: [
        starlight({
            title: '🎨 Designer Decisions',
            social: {
                github: 'https://github.com/noodlestan',
                discord: 'https://discord.gg/b8DkbJSF9z',
            },
            sidebar: [
                ...sidebar,
                {
                    label: 'Decision Types',
                    link: 'decision-types',
                },
            ],
        }),
    ],
});
