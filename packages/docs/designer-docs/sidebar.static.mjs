export const sidebar = [
    {
        label: 'Guides',
        autogenerate: { directory: 'guides' },
    },
    {
        label: 'Examples',
        autogenerate: { directory: 'examples' },
    },
    {
        label: 'Components',
        collapsed: true,
        autogenerate: { directory: 'reference/components', collapsed: true },
    },
    {
        label: 'Schemas',
        autogenerate: { directory: 'reference/schemas' },
    },
];
