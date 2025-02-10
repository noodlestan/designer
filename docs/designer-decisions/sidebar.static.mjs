export const staticSidebar = ({ models }) => [
    {
        label: 'Guides',
        collapsed: true,
        autogenerate: { directory: 'guides' },
    },
    {
        label: 'Examples',
        autogenerate: { directory: 'examples' },
    },
    {
        label: 'Integrations',
        collapsed: true,
        autogenerate: { directory: 'integrations' },
    },
    {
        label: 'Models',
        collapsed: true,
        items: models,
    },
    {
        label: 'API',
        collapsed: true,
        autogenerate: { directory: 'api', collapsed: true },
    },
];
