export const staticSidebar = ({ decisionModels }) => [
    {
        label: 'Guides',
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
        label: 'Schemas',
        collapsed: true,
        autogenerate: { directory: 'schemas', collapsed: true },
    },
    decisionModels,
    {
        label: 'API',
        collapsed: true,
        autogenerate: { directory: 'api', collapsed: true },
    },
];
